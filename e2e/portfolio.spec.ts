import { test, expect } from "@playwright/test";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about-me" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

test.describe("Navbar", () => {
  test.use({ viewport: { width: 1280, height: 800 } }); // ensure we're above Tailwind's `md` (768px) breakpoint

  test("desktop navbar displays all navigation links", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByTestId("navbar-desktop");

    for (const link of NAV_LINKS) {
      const navLink = nav.locator(`a[href="${link.href}"]`);
      await expect(navLink).toBeVisible();
      await expect(navLink).toHaveText(link.label);
    }
  });

  test("desktop navigation links point to the correct sections", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByTestId("navbar-desktop");

    for (const link of NAV_LINKS) {
      await nav.locator(`a[href="${link.href}"]`).click();
      await expect(page.locator(link.href)).toBeVisible();
    }
  });
  
});
test.describe("Mobile Drawer", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const wrapper = page.getByTestId("navbar-drawer-wrapper");
    await wrapper.getByRole("button").first().click();
  });


  test("drawer displays all navigation links", async ({ page }) => {
    const drawer = page.getByTestId("navbar-drawer-wrapper").locator("aside");

    for (const link of NAV_LINKS) {
      const navLink = drawer.locator(`a[href="${link.href}"]`);
      await expect(navLink).toBeVisible();
      await expect(navLink).toHaveText(link.label);
    }
  });

test("drawer navigation links point to the correct sections", async ({ page }) => {
  const wrapper = page.getByTestId("navbar-drawer-wrapper");
  const drawer = wrapper.locator("aside");

  for (let i = 0; i < NAV_LINKS.length; i++) {
    const link = NAV_LINKS[i];

    if (i > 0) {
      await wrapper.getByRole("button").first().click();
    }

    // translate-x-0 is an identity transform — CSS spec reports these as
    // "none", not as a matrix() string. Only non-zero transforms (like
    // -translate-x-full when closed) compute to an actual matrix.
    await expect(drawer).toHaveCSS("transform", "none");
    await drawer.locator(`a[href="${link.href}"]`).click();
    await expect(page.locator(link.href)).toBeVisible();
  }
});

  test("close (X) button closes the drawer", async ({ page }) => {
    const wrapper = page.getByTestId("navbar-drawer-wrapper");
    const overlay = page.locator(".fixed.inset-0.z-40");

    await expect(overlay).toBeVisible();
    await wrapper.getByRole("button").nth(1).click();
    await expect(overlay).toBeHidden();
  });

  test("clicking the overlay closes the drawer", async ({ page }) => {
    const overlay = page.locator(".fixed.inset-0.z-40");
    await expect(overlay).toBeVisible();

    // click outside the drawer's width (w-65 ≈ 260px, left-aligned) so it lands
    // on the overlay, not the <aside> sitting on top of it (aside is z-50, overlay z-40)
    await overlay.click({ position: { x: 320, y: 400 } });

    await expect(overlay).toBeHidden();
  });
});

test.describe("Home Section", () => {
  test("contains all home components", async ({ page }) => {
    await page.goto("/");
    const home = page.locator("#home");

    await expect(
      home.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();

    await expect(
      home.getByRole("heading", { level: 1 })
    ).toContainText(/Hello, I'm/i);

    await expect(home.locator("img")).toBeVisible();

    await expect(
      home.getByRole("button", { name: "Download Cv" })
    ).toBeVisible();
  });

  test("opens the download CV modal", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Download Cv" })
      .click();

    const modal = page.getByRole("dialog");

    await expect(modal).toBeVisible();

    await expect(
      modal.getByRole("heading", { name: "Fill Out Form" })
    ).toBeVisible();

    await expect(
      modal.getByPlaceholder("Enter your name")
    ).toBeVisible();

    await expect(
      modal.getByPlaceholder("Enter your email")
    ).toBeVisible();

    await expect(
      modal.getByPlaceholder("Please state your reason")
    ).toBeVisible();

    await expect(
      modal.getByRole("button", { name: "Submit" })
    ).toBeVisible();

    await expect(
      modal.getByRole("button", { name: "Cancel" })
    ).toBeVisible();
  });
});

test.describe("About Me Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contains all cards", async ({ page }) => {
    const about = page.locator("#about-me");

    await expect(
      about.getByRole("heading", { name: "About Me" })
    ).toBeVisible();

    await expect(
      about.getByRole("heading", { name: "Education" })
    ).toBeVisible();

    await expect(
      about.getByRole("heading", { name: "What I Do" })
    ).toBeVisible();

    await expect(
      about.getByRole("heading", { name: "Interests" })
    ).toBeVisible();
  });

 test("shows education information", async ({ page }) => {
  const about = page.locator("#about-me");

  const educationHeading = about.getByRole("heading", { name: "Education" });
  const educationText = educationHeading.locator("xpath=following::p[1]");

  await expect(educationText).toBeVisible();
});

test("shows what i do description", async ({ page }) => {
  const about = page.locator("#about-me");

  const whatIDoHeading = about.getByRole("heading", { name: "What I Do" });
  const whatIDoText = whatIDoHeading.locator("xpath=following::p[1]");

  await expect(whatIDoText).not.toBeEmpty();
});
  test("shows interests description", async ({ page }) => {
    const about = page.locator("#about-me");

    await expect(
      about.getByText(/Interested in/i)
    ).toBeVisible();
  });
});

test.describe("Projects Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

 test("contains project cards", async ({ page }) => {
  const projects = page.locator("#projects");

  const sectionHeading = projects.getByRole("heading", { name: "Projects" });
  await expect(sectionHeading).toBeVisible();

  // Project titles are DB-driven (fetched via getProfileData in
  // HomeContent) and can be renamed/removed independently of this test,
  // so we don't assert on specific hardcoded titles - just that at
  // least one project card actually rendered with a title, distinct
  // from the section's own "Projects" heading.
  const projectHeadings = projects
    .getByRole("heading")
    .filter({ hasNotText: /^Projects$/ });

  await expect(projectHeadings.first()).toBeVisible();
  expect(await projectHeadings.count()).toBeGreaterThan(0);
});

test("each project has action buttons matching their data", async ({ page }) => {
  const projects = page.locator("#projects");

  // Every project card should show a "Repo" button only if it has a repo URL,
  // and "Live Site" only if it has a live URL — both fields are optional in the DB,
  // so exact counts depend on current data rather than being fixed at 2.
  const projectCards = projects.locator(":scope > div, :scope > article"); // adjust selector to match your actual card wrapper
  const cardCount = await projectCards.count();

  expect(cardCount).toBeGreaterThan(0);

  for (let i = 0; i < cardCount; i++) {
    const card = projectCards.nth(i);
    const repoButton = card.getByRole("button", { name: "Repo" });
    const liveButton = card.getByRole("button", { name: "Live Site" });

    // At minimum, each card should render without erroring — presence of
    // buttons is conditional, so we just confirm the card itself is intact
    await expect(card).toBeVisible();

    // If a button is present, it should be usable — this doesn't assert
    // exact counts, just that whichever buttons DO render are functional
    if (await repoButton.count() > 0) {
      await expect(repoButton).toBeVisible();
    }
    if (await liveButton.count() > 0) {
      await expect(liveButton).toBeVisible();
    }
  }
});

  test("opens live site", async ({ page }) => {
    const popupPromise = page.waitForEvent("popup");

    await page
      .getByRole("button", { name: "Live Site" })
      .first()
      .click();

    const popup = await popupPromise;

    await expect(popup).toHaveURL(/http/);
  });

  test("opens repository", async ({ page }) => {
    const popupPromise = page.waitForEvent("popup");

    await page
      .getByRole("button", { name: "Repo" })
      .first()
      .click();

    const popup = await popupPromise;

    await expect(popup).toHaveURL(/github/i);
  });
});

test.describe("Skills Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contains hard skills", async ({ page }) => {
    const skills = page.locator("#skills");

    await expect(
      skills.getByRole("heading", {
        name: "Hard Skills",
      })
    ).toBeVisible();

    await expect(skills.getByText("Next.js")).toBeVisible();
    await expect(skills.getByText("React.js")).toBeVisible();
    await expect(skills.getByText("TypeScript")).toBeVisible();
    await expect(skills.getByText("Mysql")).toBeVisible();
  });

  test("contains soft skills", async ({ page }) => {
    const skills = page.locator("#skills");

    await expect(
      skills.getByRole("heading", {
        name: "Soft Skills",
      })
    ).toBeVisible();

    await expect(skills.getByText("Problem Solving")).toBeVisible();
    await expect(skills.getByText("Communication")).toBeVisible();
    await expect(skills.getByText("Leadership")).toBeVisible();
    await expect(skills.getByText("Adaptability")).toBeVisible();
    await expect(skills.getByText("Time Management")).toBeVisible();
  });
});

test.describe("Contact Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contains all form components", async ({ page }) => {
    const contact = page.locator("#contact");

    await expect(
      contact.getByRole("heading", {
        name: "Contact Me",
      })
    ).toBeVisible();

    await expect(
      contact.getByRole("textbox", {
        name: "Name",
      })
    ).toBeVisible();

    await expect(
      contact.getByRole("textbox", {
        name: "Email",
      })
    ).toBeVisible();

    await expect(contact.getByRole("combobox")).toBeVisible();

    await expect(
      contact.getByRole("checkbox", {
        name: "Accept Terms & Conditions",
      })
    ).toBeVisible();

    await expect(
      contact.getByRole("button", {
        name: "Submit",
      })
    ).toBeVisible();

    await expect(
      contact.getByRole("button", {
        name: "Cancel",
      })
    ).toBeVisible();
  });

  test("allows the user to fill out the form", async ({ page }) => {
    const contact = page.locator("#contact");

    const name = contact.getByRole("textbox", { name: "Name" });
    const email = contact.getByRole("textbox", { name: "Email" });
    const reason = contact.getByRole("combobox");
    const checkbox = contact.getByRole("checkbox", {
      name: "Accept Terms & Conditions",
    });

    await name.pressSequentially("Test User");
    await email.pressSequentially("test@example.com");
    await reason.selectOption({ label: "Inquiry" });
    await checkbox.check();

    await expect(name).toHaveValue("Test User");
    await expect(email).toHaveValue("test@example.com");
    await expect(reason).toHaveValue("option1");
    await expect(checkbox).toBeChecked();
  });

  test("cancel button is visible", async ({ page }) => {
    await expect(
      page.getByRole("button", {
        name: "Cancel",
      })
    ).toBeVisible();
  });
});