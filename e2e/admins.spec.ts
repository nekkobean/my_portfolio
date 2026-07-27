import { test, expect, type Page } from "@playwright/test";
const ADMIN_TOKEN = process.env.TOKEN;

if (!ADMIN_TOKEN) {
  throw new Error(
    "TOKEN is not set. Add it to your .env file (see .env.example)."
  );
}

const BASE_ADMIN_URL = `/admin/${ADMIN_TOKEN}`;

/**
 * These tests check REAL outcomes, not just that a click happened:
 * - Add    -> table row count goes UP by 1, and the new value is visible
 * - Update -> the specific cell's text CHANGES to the new value
 * - Delete -> table row count goes DOWN by 1, and the old value is GONE
 *
 * Each test creates its own uniquely-named record (via Date.now()) so
 * tests don't depend on each other and can run in any order / in parallel.
 *
 * Cleanup: every test that creates or renames a row tracks its current
 * identifying name; afterEach deletes that row via the UI so no test
 * data survives the run. Delete tests already remove their own row
 * mid-test, so their afterEach is a no-op (name is cleared beforehand).
 */

async function gotoTab(page: Page, tabName: string) {
  await page.goto(BASE_ADMIN_URL);
  // Bumped from 10s - Next.js dev mode (Turbopack) compiles each route
  // on first hit, which can take longer than 10s. A cold compile here
  // was causing this check to time out, which cascaded into afterEach
  // cleanup failing too (deleteRowIfExists calls gotoTab internally),
  // leaving orphan rows behind in Skills/Projects even with try/catch.
  await expect(page.getByRole("heading", { name: "Admin Panel" })).toBeVisible({
    timeout: 30000,
  });
  await page.waitForLoadState("networkidle");

  if (tabName === "Personal Details") {
    await expect(page.getByRole("textbox", { name: "First Name" })).toBeVisible();
    return;
  }

  await page.getByRole("button", { name: tabName }).click();
  // Bumped from 10s for the same cold-compile reason as above - switching
  // to a tab for the first time in a run can trigger its own compile.
  await expect(page.locator("table")).toBeVisible({ timeout: 20000 });
  // Wait for the tab's row data to finish fetching after the switch -
  // without this, a fresh table can render before its rows have loaded,
  // causing row-existence checks (e.g. in cleanup) to false-negative.
  await page.waitForLoadState("networkidle");
}

async function rowCount(page: Page) {
  return page.locator("table tbody tr").count();
}

// Deletes a row by its visible name, if it still exists. Used in afterEach
// so leftover test rows never survive a test run, without erroring if the
// row was already removed (e.g. by the test's own Delete flow).
async function deleteRowIfExists(page: Page, tabName: string, name: string) {
  await gotoTab(page, tabName);
  const row = page.getByRole("row", { name: new RegExp(escapeRegExp(name)) });

  // Give the row a bounded chance to render before concluding it's absent -
  // avoids a false "already gone" read if the tab's data is still loading.
  const appeared = await row
    .first()
    .waitFor({ state: "visible", timeout: 5000 })
    .then(() => true)
    .catch(() => false);

  if (!appeared) return;

  await row.getByRole("button", { name: "Delete" }).click();
  const confirmDialog = page.getByRole("dialog");
  await expect(confirmDialog).toBeVisible();
  await confirmDialog.getByRole("button", { name: "Delete" }).click();
  // Bumped from the 5s default - dialog close is gated on a server
  // mutation finishing, which can be slow under dev-server load.
  await expect(confirmDialog).toBeHidden({ timeout: 15000 });
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test.describe("Admin Panel - CRUD state verification", () => {
  // ------------------------------------------------------------------
  // Personal Details (single record - verify persistence via reload)
  // ------------------------------------------------------------------
  test.describe("Personal Details", () => {
    // Serial mode is scoped to this block only, not the whole file.
    // Full-file serial mode was tried, but it meant one genuine failure
    // anywhere (e.g. a slow dialog-close in Skills) skip-cascaded every
    // later test on that project - including Projects' own Add/Delete
    // tests, which self-clean and had nothing to do with the failure.
    // This block still needs serial mode on its own: it does a
    // read-modify-restore cycle on one shared singleton record, so its
    // own tests must never interleave with each other.
    test.describe.configure({ mode: "serial" });

    let originalWhatIDo: string | null = null;

    test.beforeEach(async ({ page }, testInfo) => {
      test.skip(
        testInfo.project.name === "Mobile Chrome",
        "Singleton record — only verified once, on chromium, to avoid cross-project races"
      );
      await gotoTab(page, "Personal Details");
      originalWhatIDo = await page
        .getByRole("textbox", { name: "What I Do" })
        .inputValue();
    });

    test.afterEach(async ({ page }, testInfo) => {
      if (testInfo.project.name === "Mobile Chrome" || originalWhatIDo === null) return;

      await gotoTab(page, "Personal Details");
      const whatIDoField = page.getByRole("textbox", { name: "What I Do" });
      await whatIDoField.fill(originalWhatIDo);
      await page.getByRole("button", { name: /Update|Create/ }).click();
      await expect(page.getByRole("button", { name: "Saving..." })).toBeHidden({
        timeout: 15000,
      });
    });

    test("update persists after reload", async ({ page }) => {
      await gotoTab(page, "Personal Details");

      const uniqueWhatIDo = `Digital solutions builder ${Date.now()}`;

      const whatIDoField = page.getByRole("textbox", { name: "What I Do" });
      await whatIDoField.click();
      await whatIDoField.fill(uniqueWhatIDo);

      await page.getByRole("button", { name: /Update|Create/ }).click();

      await expect(page.getByRole("button", { name: "Saving..." })).toBeHidden({
        timeout: 15000,
      });
      await expect(page.getByRole("button", { name: "Update" })).toBeVisible();

      await page.reload();
      await expect(
        page.getByRole("heading", { name: "Admin Panel" }),
      ).toBeVisible({ timeout: 10000 });

      await expect(page.getByRole("textbox", { name: "What I Do" })).toHaveValue(
        uniqueWhatIDo,
      );
    });
  });

  // ------------------------------------------------------------------
  // Education
  // ------------------------------------------------------------------
  test.describe("Education", () => {
    let createdName: string | null = null;

    test.afterEach(async ({ page }) => {
      if (createdName) {
        try {
          await deleteRowIfExists(page, "Education", createdName);
        } catch (err) {
          console.error(`Cleanup failed for "${createdName}" in Education:`, err);
        }
        createdName = null;
      }
    });

    test("adding an entry increases row count and shows the new school", async ({
      page,
    }) => {
      await gotoTab(page, "Education");
      const before = await rowCount(page);

      const schoolName = `Test School ${Date.now()}`;
      createdName = schoolName;

      await page.getByRole("button", { name: "Add Education" }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      await dialog.getByRole("combobox").selectOption("tertiary");
      await page.getByRole("textbox", { name: "School Name" }).fill(schoolName);
      await page
        .getByRole("textbox", { name: "School Address" })
        .fill("Test Address");
      await page
        .getByRole("textbox", { name: "Year Attended" })
        .fill("2022-06-01");

      await dialog.getByRole("button", { name: "Add Education" }).click();
      await expect(dialog).toBeHidden({ timeout: 15000 });

      const after = await rowCount(page);
      expect(after).toBe(before + 1);
      await expect(page.getByRole("cell", { name: schoolName })).toBeVisible();
    });

    test("updating an entry changes its cell content", async ({ page }) => {
      await gotoTab(page, "Education");

      const schoolName = `Update Target School ${Date.now()}`;
      createdName = schoolName; // school name never changes here, only description

      await page.getByRole("button", { name: "Add Education" }).click();
      const addDialog = page.getByRole("dialog");
      await addDialog.getByRole("combobox").selectOption("tertiary");
      await page.getByRole("textbox", { name: "School Name" }).fill(schoolName);
      await page
        .getByRole("textbox", { name: "School Address" })
        .fill("Original Address");
      await page
        .getByRole("textbox", { name: "Year Attended" })
        .fill("2022-06-01");
      await addDialog.getByRole("button", { name: "Add Education" }).click();
      await expect(addDialog).toBeHidden({ timeout: 15000 });

      const row = page.getByRole("row", { name: new RegExp(schoolName) });
      await row.getByRole("button", { name: "Update" }).click();

      const newDescription = `Updated description ${Date.now()}`;
      await row.getByRole("textbox", { name: "Description" }).fill(newDescription);
      await row.getByRole("button", { name: "Save" }).click();

      await expect(row.getByRole("cell", { name: newDescription })).toBeVisible();
    });

    test("deleting an entry decreases row count and removes the school", async ({
      page,
    }) => {
      await gotoTab(page, "Education");

      const schoolName = `Delete Target School ${Date.now()}`;
      await page.getByRole("button", { name: "Add Education" }).click();
      const addDialog = page.getByRole("dialog");
      await addDialog.getByRole("combobox").selectOption("tertiary");
      await page.getByRole("textbox", { name: "School Name" }).fill(schoolName);
      await page
        .getByRole("textbox", { name: "School Address" })
        .fill("Address");
      await page
        .getByRole("textbox", { name: "Year Attended" })
        .fill("2022-06-01");
      await addDialog.getByRole("button", { name: "Add Education" }).click();
      await expect(addDialog).toBeHidden({ timeout: 15000 });

      const before = await rowCount(page);

      const row = page.getByRole("row", { name: new RegExp(schoolName) });
      await row.getByRole("button", { name: "Delete" }).click();

      const confirmDialog = page.getByRole("dialog");
      await expect(confirmDialog).toBeVisible();
      await confirmDialog.getByRole("button", { name: "Delete" }).click();
      await expect(confirmDialog).toBeHidden({ timeout: 15000 });

      const after = await rowCount(page);
      expect(after).toBe(before - 1);
      await expect(page.getByRole("cell", { name: schoolName })).toHaveCount(0);
      // already deleted — nothing for afterEach to clean up
    });
  });

  // ------------------------------------------------------------------
  // Skills
  // ------------------------------------------------------------------
  test.describe("Skills", () => {
    let createdName: string | null = null;

    test.afterEach(async ({ page }) => {
      if (createdName) {
        try {
          await deleteRowIfExists(page, "Skills", createdName);
        } catch (err) {
          console.error(`Cleanup failed for "${createdName}" in Skills:`, err);
        }
        createdName = null;
      }
    });

    test("adding a skill increases row count and shows the new skill", async ({
      page,
    }) => {
      await gotoTab(page, "Skills");
      const before = await rowCount(page);

      const skillName = `Test Skill ${Date.now()}`;
      createdName = skillName;

      await page.getByRole("button", { name: "Add Skill" }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      await page.getByRole("textbox", { name: "Skill Name" }).fill(skillName);
      await dialog.getByRole("combobox").selectOption("soft");

      await dialog.getByRole("button", { name: "Add Skill" }).click();
      await expect(dialog).toBeHidden({ timeout: 15000 });

      const after = await rowCount(page);
      expect(after).toBe(before + 1);
      // The <img alt={skill_name}> in the first column shares the same
      // accessible name as the text cell, so exclude it to avoid a
      // strict-mode collision between the two matching cells.
      await expect(
        page
          .getByRole("cell", { name: skillName })
          .filter({ hasNot: page.locator("img") }),
      ).toBeVisible();
    });

    test("updating a skill changes its name in the table", async ({ page }) => {
      await gotoTab(page, "Skills");

      const skillName = `Update Target Skill ${Date.now()}`;

      await page.getByRole("button", { name: "Add Skill" }).click();
      const addDialog = page.getByRole("dialog");
      await page.getByRole("textbox", { name: "Skill Name" }).fill(skillName);
      await addDialog.getByRole("combobox").selectOption("soft");
      await addDialog.getByRole("button", { name: "Add Skill" }).click();
      await expect(addDialog).toBeHidden({ timeout: 15000 });

      const row = page.getByRole("row", { name: new RegExp(skillName) });
      await row.getByRole("button", { name: "Update" }).click();

      const updatedName = `${skillName} (updated)`;
      createdName = updatedName; // name changed — clean up under the NEW name

      const nameField = row.getByRole("textbox", { name: "Skill Name" });
      await nameField.fill(updatedName);
      await row.getByRole("button", { name: "Save" }).click();

      await expect(page.getByRole("cell", { name: updatedName })).toBeVisible();
      await expect(page.getByRole("cell", { name: skillName, exact: true })).toHaveCount(
        0,
      );
    });

    test("deleting a skill decreases row count and removes it", async ({
      page,
    }) => {
      await gotoTab(page, "Skills");

      const skillName = `Delete Target Skill ${Date.now()}`;
      await page.getByRole("button", { name: "Add Skill" }).click();
      const addDialog = page.getByRole("dialog");
      await page.getByRole("textbox", { name: "Skill Name" }).fill(skillName);
      await addDialog.getByRole("combobox").selectOption("soft");
      await addDialog.getByRole("button", { name: "Add Skill" }).click();
      await expect(addDialog).toBeHidden({ timeout: 15000 });

      const before = await rowCount(page);

      const row = page.getByRole("row", { name: new RegExp(skillName) });
      await row.getByRole("button", { name: "Delete" }).click();

      const confirmDialog = page.getByRole("dialog");
      await expect(confirmDialog).toBeVisible();
      await confirmDialog.getByRole("button", { name: "Delete" }).click();
      await expect(confirmDialog).toBeHidden({ timeout: 15000 });

      const after = await rowCount(page);
      expect(after).toBe(before - 1);
      await expect(page.getByRole("cell", { name: skillName })).toHaveCount(0);
    });
  });

  // ------------------------------------------------------------------
  // Projects
  // ------------------------------------------------------------------
  test.describe("Projects", () => {
    let createdName: string | null = null;

    test.afterEach(async ({ page }) => {
      if (createdName) {
        try {
          await deleteRowIfExists(page, "Projects", createdName);
        } catch (err) {
          console.error(`Cleanup failed for "${createdName}" in Projects:`, err);
        }
        createdName = null;
      }
    });

    test("adding a project increases row count and shows the new title", async ({
      page,
    }) => {
      await gotoTab(page, "Projects");
      const before = await rowCount(page);

      const projectTitle = `Test Project ${Date.now()}`;
      createdName = projectTitle;

      await page.getByRole("button", { name: "Add Project" }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();

      await page.getByRole("textbox", { name: "Project Title" }).fill(projectTitle);
      await page
        .getByRole("textbox", { name: "Project Description" })
        .fill("A test project description");
      await page
        .getByRole("textbox", { name: "Technologies Used" })
        .fill("Next.js, Playwright");
      await page.getByRole("textbox", { name: "Start Date" }).fill("2024-01-01");

      await dialog.getByRole("button", { name: "Add Project" }).click();
      await expect(dialog).toBeHidden({ timeout: 15000 });

      const after = await rowCount(page);
      expect(after).toBe(before + 1);
      // The <img alt={project_title}> in the first column shares the same
      // accessible name as the text cell, so exclude it to avoid a
      // strict-mode collision between the two matching cells.
      await expect(
        page
          .getByRole("cell", { name: projectTitle })
          .filter({ hasNot: page.locator("img") }),
      ).toBeVisible();
    });

    test("updating a project changes its title in the table", async ({
      page,
    }) => {
      await gotoTab(page, "Projects");

      const projectTitle = `Update Target Project ${Date.now()}`;

      await page.getByRole("button", { name: "Add Project" }).click();
      const addDialog = page.getByRole("dialog");
      await page.getByRole("textbox", { name: "Project Title" }).fill(projectTitle);
      await page
        .getByRole("textbox", { name: "Project Description" })
        .fill("Description");
      await page
        .getByRole("textbox", { name: "Technologies Used" })
        .fill("Next.js");
      await page.getByRole("textbox", { name: "Start Date" }).fill("2024-01-01");
      await addDialog.getByRole("button", { name: "Add Project" }).click();
      await expect(addDialog).toBeHidden({ timeout: 15000 });

      const row = page.getByRole("row", { name: new RegExp(projectTitle) });
      await row.getByRole("button", { name: "Update" }).click();

      const updatedTitle = `${projectTitle} (updated)`;
      createdName = updatedTitle; // title changed — clean up under the NEW title

      await row.getByRole("textbox", { name: "Title" }).fill(updatedTitle);
      await row.getByRole("button", { name: "Save" }).click();

       // The <img alt={project_title}> in the first column shares the same
  // accessible name as the text cell, so exclude it to avoid a
  // strict-mode collision between the two matching cells.
  await expect(
    page
      .getByRole("cell", { name: updatedTitle })
      .filter({ hasNot: page.locator("img") }),
  ).toBeVisible();
});

    test("deleting a project decreases row count and removes it", async ({
      page,
    }) => {
      await gotoTab(page, "Projects");

      const projectTitle = `Delete Target Project ${Date.now()}`;
      await page.getByRole("button", { name: "Add Project" }).click();
      const addDialog = page.getByRole("dialog");
      await page.getByRole("textbox", { name: "Project Title" }).fill(projectTitle);
      await page
        .getByRole("textbox", { name: "Project Description" })
        .fill("Description");
      await page
        .getByRole("textbox", { name: "Technologies Used" })
        .fill("Next.js");
      await page.getByRole("textbox", { name: "Start Date" }).fill("2024-01-01");
      await addDialog.getByRole("button", { name: "Add Project" }).click();
      await expect(addDialog).toBeHidden({ timeout: 15000 });

      const before = await rowCount(page);

      const row = page.getByRole("row", { name: new RegExp(projectTitle) });
      await row.getByRole("button", { name: "Delete" }).click();

      const confirmDialog = page.getByRole("dialog");
      await expect(confirmDialog).toBeVisible();
      await confirmDialog.getByRole("button", { name: "Delete" }).click();
      await expect(confirmDialog).toBeHidden({ timeout: 15000 });

      const after = await rowCount(page);
      expect(after).toBe(before - 1);
      await expect(page.getByRole("cell", { name: projectTitle })).toHaveCount(0);
    });
  });
});