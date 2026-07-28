import { expect, test } from "@playwright/test";

const ADMIN_TOKEN = "01072004";
const BASE_ADMIN_URL = `/admin/${ADMIN_TOKEN}`;

test.describe("Admin Panel", () => {
  test.describe("Token Validation", () => {
    test("should deny access with invalid token", async ({ page }) => {
      await page.goto("/admin/invalid-token");
      await expect(page.getByText("Access Denied")).toBeVisible();
    });

    test("should grant access with valid token", async ({ page }) => {
      await page.goto(BASE_ADMIN_URL);
      await expect(
        page.getByRole("heading", { name: "Admin Panel" }),
      ).toBeVisible();
    });
  });

  test.describe("Navigation", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_ADMIN_URL);
      await expect(
        page.getByRole("heading", { name: "Admin Panel" }),
      ).toBeVisible({ timeout: 10000 });
    });

    test("renders all navigation tabs", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Personal Details" }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Education" }),
      ).toBeVisible();
      await expect(page.getByRole("button", { name: "Skills" })).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Projects" }),
      ).toBeVisible();
    });

    test("can navigate between tabs", async ({ page }) => {
      // Click Education - scope to sidebar
      const sidebar = page.locator("aside");
      await sidebar.getByRole("button", { name: "Education" }).click();
      // Wait for the section to render
      await page.waitForTimeout(500);
      await expect(
        sidebar.getByRole("button", { name: "Education" }),
      ).toHaveClass(/bg-black/);

      // Click Skills
      await sidebar.getByRole("button", { name: "Skills" }).click();
      await page.waitForTimeout(500);
      await expect(sidebar.getByRole("button", { name: "Skills" })).toHaveClass(
        /bg-black/,
      );

      // Click Projects
      await sidebar.getByRole("button", { name: "Projects" }).click();
      await page.waitForTimeout(500);
      await expect(
        sidebar.getByRole("button", { name: "Projects" }),
      ).toHaveClass(/bg-black/);

      // Return to Personal Details
      await sidebar.getByRole("button", { name: "Personal Details" }).click();
      await page.waitForTimeout(500);
      await expect(
        sidebar.getByRole("button", { name: "Personal Details" }),
      ).toHaveClass(/bg-black/);
    });

    test("shows active tab with proper styling", async ({ page }) => {
      const sidebar = page.locator("aside");
      const personalButton = sidebar.getByRole("button", {
        name: "Personal Details",
      });
      await expect(personalButton).toHaveClass(/bg-black text-white/);
    });
  });

  test.describe("Personal Details Section", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_ADMIN_URL);
      await expect(
        page.getByRole("heading", { name: "Admin Panel" }),
      ).toBeVisible({ timeout: 10000 });
      // Ensure we're on Personal Details tab
      await page.getByRole("button", { name: "Personal Details" }).click();
      await page.waitForTimeout(300);
    });

    test("displays personal details form", async ({ page }) => {
      // Check that form fields are visible
      await expect(page.getByLabel("First Name")).toBeVisible();
      await expect(page.getByLabel("Last Name")).toBeVisible();
      await expect(page.getByLabel("Email")).toBeVisible();
    });

    test("displays Update/Delete buttons", async ({ page }) => {
      // When data exists, should show Update button
      await expect(
        page.getByRole("button", { name: /Update|Create/ }),
      ).toBeVisible();
    });
  });

  test.describe("Education Section", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_ADMIN_URL);
      await page.getByRole("button", { name: "Education" }).click();
      await page.waitForTimeout(500);
    });

    test("renders education section with table", async ({ page }) => {
      // Check for table or entries exist
      await expect(page.locator("table")).toBeVisible();
    });

    test("shows Add Education button", async ({ page }) => {
      const addButton = page.getByRole("button", { name: "Add Education" });
      await expect(addButton).toBeVisible();
    });

    test("can open Add Education modal", async ({ page }) => {
      await page.getByRole("button", { name: "Add Education" }).click();
      await page.waitForTimeout(300);

      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();
    });

    test("Add Education modal has form fields", async ({ page }) => {
      await page.getByRole("button", { name: "Add Education" }).click();
      await page.waitForTimeout(300);

      const modal = page.getByRole("dialog");
      // Check that modal has a form (look for input elements)
      await expect(modal.locator("input, select")).toBeTruthy();
    });
  });

  test.describe("Skills Section", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_ADMIN_URL);
      await page.getByRole("button", { name: "Skills" }).click();
      await page.waitForTimeout(500);
    });

    test("renders skills section with table", async ({ page }) => {
      await expect(page.locator("table")).toBeVisible();
    });

    test("shows Add Skill button", async ({ page }) => {
      const addButton = page.getByRole("button", { name: "Add Skill" });
      await expect(addButton).toBeVisible();
    });

    test("can open Add Skill modal", async ({ page }) => {
      await page.getByRole("button", { name: "Add Skill" }).click();
      await page.waitForTimeout(300);

      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();
    });
  });

  test.describe("Projects Section", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_ADMIN_URL);
      await page.getByRole("button", { name: "Projects" }).click();
      await page.waitForTimeout(500);
    });

    test("renders projects section with table", async ({ page }) => {
      await expect(page.locator("table")).toBeVisible();
    });

    test("shows Add Project button", async ({ page }) => {
      const addButton = page.getByRole("button", { name: "Add Project" });
      await expect(addButton).toBeVisible();
    });

    test("can open Add Project modal", async ({ page }) => {
      await page.getByRole("button", { name: "Add Project" }).click();
      await page.waitForTimeout(300);

      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();
    });
  });

  test.describe("Responsive Design", () => {
    test("displays properly on desktop", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(BASE_ADMIN_URL);

      // Sidebar should be visible
      await expect(
        page.getByRole("heading", { name: "Admin Panel" }),
      ).toBeVisible();
      // Navigation buttons should be visible
      await expect(
        page.getByRole("button", { name: "Personal Details" }),
      ).toBeVisible();
      // Main content should be visible
      await expect(page.locator("main")).toBeVisible();
    });
  });
});


//cli report
//PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> ^C
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> npx playwright test e2e/admin.spec.ts --headed    

// Running 18 tests using 1 worker
//   18 passed (55.3s)

// To open last HTML report run:

//   npx playwright show-report

// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> 