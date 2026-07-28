import { test, expect } from "@playwright/test";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about-me" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
      width: 1280,
      height: 800,
    });

    await page.goto("/");
  });

  test("desktop navbar displays all navigation links", async ({
    page,
  }) => {
    const nav = page.getByTestId("navbar-desktop");

    for (const link of NAV_LINKS) {
      const navLink = nav.locator(`a[href="${link.href}"]`);

      await expect(navLink).toBeVisible();
      await expect(navLink).toHaveText(link.label);
    }
  });

  test("desktop navigation links point to the correct sections", async ({
    page,
  }) => {
    const nav = page.getByTestId("navbar-desktop");

    for (const link of NAV_LINKS) {
      await nav
        .locator(`a[href="${link.href}"]`)
        .click();

      await expect(page.locator(link.href)).toBeVisible();
    }
  });
});

test.describe("Mobile Drawer", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
      width: 375,
      height: 812,
    });

    await page.goto("/");

    const wrapper = page.getByTestId(
      "navbar-drawer-wrapper",
    );

    await wrapper
      .getByRole("button")
      .first()
      .click();
  });

  test("drawer displays all navigation links", async ({
    page,
  }) => {
    const drawer = page
      .getByTestId("navbar-drawer-wrapper")
      .locator("aside");

    for (const link of NAV_LINKS) {
      const navLink = drawer.locator(
        `a[href="${link.href}"]`,
      );

      await expect(navLink).toBeVisible();
      await expect(navLink).toHaveText(link.label);
    }
  });

  test("drawer navigation links point to the correct sections", async ({
    page,
  }) => {
    const wrapper = page.getByTestId(
      "navbar-drawer-wrapper",
    );

    const drawer = wrapper.locator("aside");

    for (
      let index = 0;
      index < NAV_LINKS.length;
      index++
    ) {
      const link = NAV_LINKS[index];

      if (index > 0) {
        await wrapper
          .getByRole("button")
          .first()
          .click();
      }

      await expect(drawer).toHaveCSS(
        "transform",
        "none",
      );

      await drawer
        .locator(`a[href="${link.href}"]`)
        .click();

      await expect(
        page.locator(link.href),
      ).toBeVisible();
    }
  });

  test("close button closes the drawer", async ({
    page,
  }) => {
    const wrapper = page.getByTestId(
      "navbar-drawer-wrapper",
    );

    const overlay = page.locator(
      ".fixed.inset-0.z-40",
    );

    await expect(overlay).toBeVisible();

    await wrapper
      .getByRole("button")
      .nth(1)
      .click();

    await expect(overlay).toBeHidden();
  });

  test("clicking the overlay closes the drawer", async ({
    page,
  }) => {
    const overlay = page.locator(
      ".fixed.inset-0.z-40",
    );

    await expect(overlay).toBeVisible();

    await overlay.click({
      position: {
        x: 320,
        y: 400,
      },
    });

    await expect(overlay).toBeHidden();
  });
});

test.describe("Home Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contains all home components", async ({
    page,
  }) => {
    const home = page.locator("#home");

    await expect(home).toBeVisible();

    await expect(
      home.getByRole("heading", {
        name: "Dashboard",
      }),
    ).toBeVisible();

    await expect(
      home.getByRole("heading", {
        level: 1,
      }),
    ).toContainText(/Hello, I'm/i);

    const profileImage = home.locator("img");

    await expect(profileImage).toBeVisible();

    await expect(profileImage).toHaveAttribute(
      "src",
      "/portid.png",
    );

    await expect(
      home.getByRole("button", {
        name: "Request CV",
      }),
    ).toBeVisible();
  });

  test("opens the request CV modal", async ({
    page,
  }) => {
    await page
      .getByRole("button", {
        name: "Request CV",
      })
      .click();

    const modal = page.getByRole("dialog");

    await expect(modal).toBeVisible();

    await expect(
      modal.getByRole("heading", {
        name: "Request My CV",
      }),
    ).toBeVisible();

    await expect(
      modal.getByText(
        /fill out this form to receive my latest CV through email/i,
      ),
    ).toBeVisible();

    await expect(
      modal.getByLabel("Name"),
    ).toBeVisible();

    await expect(
      modal.getByLabel("Email"),
    ).toBeVisible();

    await expect(
      modal.getByLabel("Reason"),
    ).toBeVisible();

    await expect(
      modal.getByRole("button", {
        name: "Submit",
      }),
    ).toBeVisible();

    await expect(
      modal.getByRole("button", {
        name: "Cancel",
      }),
    ).toBeVisible();
  });

  test("allows the user to fill out the CV request form", async ({
    page,
  }) => {
    await page
      .getByRole("button", {
        name: "Request CV",
      })
      .click();

    const modal = page.getByRole("dialog");

    const nameInput = modal.getByLabel("Name");
    const emailInput = modal.getByLabel("Email");
    const reasonInput = modal.getByLabel("Reason");

    await nameInput.fill("Test Requester");

    await emailInput.fill(
      "requester@example.com",
    );

    await reasonInput.fill(
      "I would like to review your experience.",
    );

    await expect(nameInput).toHaveValue(
      "Test Requester",
    );

    await expect(emailInput).toHaveValue(
      "requester@example.com",
    );

    await expect(reasonInput).toHaveValue(
      "I would like to review your experience.",
    );
  });

  test("shows validation errors for an empty CV request form", async ({
    page,
  }) => {
    await page
      .getByRole("button", {
        name: "Request CV",
      })
      .click();

    const modal = page.getByRole("dialog");

    await modal
      .getByRole("button", {
        name: "Submit",
      })
      .click();

    await expect(
      modal.getByText(
        "Please correct the highlighted fields.",
      ),
    ).toBeVisible();

    await expect(
      modal.getByText(
        "Name must contain at least 2 characters.",
      ),
    ).toBeVisible();

    await expect(
      modal.getByText("Email is required."),
    ).toBeVisible();

    await expect(
      modal.getByText(
        "Please provide a short reason.",
      ),
    ).toBeVisible();
  });

  test("shows an error for an invalid email address", async ({
    page,
  }) => {
    await page
      .getByRole("button", {
        name: "Request CV",
      })
      .click();

    const modal = page.getByRole("dialog");

    await modal
      .getByLabel("Name")
      .fill("Test User");

    await modal
      .getByLabel("Email")
      .fill("invalid-email");

    await modal
      .getByLabel("Reason")
      .fill("Recruitment inquiry");

    await modal
      .getByRole("button", {
        name: "Submit",
      })
      .click();

    await expect(
      modal.getByText(
        "Enter a valid email address.",
      ),
    ).toBeVisible();
  });

  test("cancel button closes the CV request modal", async ({
    page,
  }) => {
    await page
      .getByRole("button", {
        name: "Request CV",
      })
      .click();

    const modal = page.getByRole("dialog");

    await expect(modal).toBeVisible();

    await modal
      .getByRole("button", {
        name: "Cancel",
      })
      .click();

    await expect(modal).toBeHidden();
  });

  test("modal close button closes the CV request modal", async ({
    page,
  }) => {
    await page
      .getByRole("button", {
        name: "Request CV",
      })
      .click();

    const modal = page.getByRole("dialog");

    await expect(modal).toBeVisible();

    await modal
      .getByRole("button", {
        name: "Close modal",
      })
      .click();

    await expect(modal).toBeHidden();
  });
});

test.describe("About Me Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contains all cards", async ({
    page,
  }) => {
    const about = page.locator("#about-me");

    await expect(about).toBeVisible();

    await expect(
      about.getByRole("heading", {
        name: "About Me",
      }),
    ).toBeVisible();

    await expect(
      about.getByRole("heading", {
        name: "Education",
      }),
    ).toBeVisible();

    await expect(
      about.getByRole("heading", {
        name: "What I Do",
      }),
    ).toBeVisible();

    await expect(
      about.getByRole("heading", {
        name: "Interests",
      }),
    ).toBeVisible();
  });

  test("shows education information", async ({
    page,
  }) => {
    const about = page.locator("#about-me");

    const educationHeading = about.getByRole(
      "heading",
      {
        name: "Education",
      },
    );

    const educationText =
      educationHeading.locator(
        "xpath=following::p[1]",
      );

    await expect(educationText).toBeVisible();
    await expect(educationText).not.toBeEmpty();
  });

  test("shows what I do description", async ({
    page,
  }) => {
    const about = page.locator("#about-me");

    const whatIDoHeading = about.getByRole(
      "heading",
      {
        name: "What I Do",
      },
    );

    const whatIDoText = whatIDoHeading.locator(
      "xpath=following::p[1]",
    );

    await expect(whatIDoText).toBeVisible();
    await expect(whatIDoText).not.toBeEmpty();
  });

  test("shows interests description", async ({
    page,
  }) => {
    const about = page.locator("#about-me");

    await expect(
      about.getByText(/Interested in/i),
    ).toBeVisible();
  });
});

test.describe("Projects Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contains project cards", async ({
    page,
  }) => {
    const projects = page.locator("#projects");

    await expect(projects).toBeVisible();

    await expect(
      projects.getByRole("heading", {
        name: "Projects",
      }),
    ).toBeVisible();

    const projectHeadings = projects
      .getByRole("heading")
      .filter({
        hasNotText: /^Projects$/,
      });

    await expect(
      projectHeadings.first(),
    ).toBeVisible();

    expect(
      await projectHeadings.count(),
    ).toBeGreaterThan(0);
  });

  test("project action buttons are usable when available", async ({
    page,
  }) => {
    const projects = page.locator("#projects");

    const repoButtons = projects.getByRole(
      "button",
      {
        name: "Repo",
      },
    );

    const liveButtons = projects.getByRole(
      "button",
      {
        name: "Live Site",
      },
    );

    const repoCount = await repoButtons.count();
    const liveCount = await liveButtons.count();

    expect(
      repoCount + liveCount,
    ).toBeGreaterThan(0);

    for (
      let index = 0;
      index < repoCount;
      index++
    ) {
      await expect(
        repoButtons.nth(index),
      ).toBeVisible();

      await expect(
        repoButtons.nth(index),
      ).toBeEnabled();
    }

    for (
      let index = 0;
      index < liveCount;
      index++
    ) {
      await expect(
        liveButtons.nth(index),
      ).toBeVisible();

      await expect(
        liveButtons.nth(index),
      ).toBeEnabled();
    }
  });

  test("opens live site when available", async ({
    page,
  }) => {
    const projects = page.locator("#projects");

    const liveButtons = projects.getByRole(
      "button",
      {
        name: "Live Site",
      },
    );

    test.skip(
      (await liveButtons.count()) === 0,
      "No project currently has a live-site link.",
    );

    const popupPromise =
      page.waitForEvent("popup");

    await liveButtons.first().click();

    const popup = await popupPromise;

    await popup.waitForLoadState();

    await expect(popup).toHaveURL(
      /^https?:\/\//,
    );
  });

  test("opens repository when available", async ({
    page,
  }) => {
    const projects = page.locator("#projects");

    const repoButtons = projects.getByRole(
      "button",
      {
        name: "Repo",
      },
    );

    test.skip(
      (await repoButtons.count()) === 0,
      "No project currently has a repository link.",
    );

    const popupPromise =
      page.waitForEvent("popup");

    await repoButtons.first().click();

    const popup = await popupPromise;

    await popup.waitForLoadState();

    await expect(popup).toHaveURL(
      /github\.com/i,
    );
  });
});

test.describe("Skills Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contains hard skills", async ({
    page,
  }) => {
    const skills = page.locator("#skills");

    await expect(skills).toBeVisible();

    await expect(
      skills.getByRole("heading", {
        name: "Hard Skills",
      }),
    ).toBeVisible();

    await expect(
      skills.getByText("Next.js", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      skills.getByText("React.js", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      skills.getByText("TypeScript", {
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      skills.getByText("Mysql", {
        exact: true,
      }),
    ).toBeVisible();
  });

  test("contains soft skills", async ({
    page,
  }) => {
    const skills = page.locator("#skills");

    await expect(
      skills.getByRole("heading", {
        name: "Soft Skills",
      }),
    ).toBeVisible();

    const softSkills = [
      "Problem Solving",
      "Communication",
      "Leadership",
      "Adaptability",
      "Time Management",
    ];

    for (const skill of softSkills) {
      await expect(
        skills.getByText(skill, {
          exact: true,
        }),
      ).toBeVisible();
    }
  });
});

test.describe("Contact Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contains all form components", async ({
    page,
  }) => {
    const contact = page.locator("#contact");

    await expect(contact).toBeVisible();

    await expect(
      contact.getByRole("heading", {
        name: "Contact Me",
      }),
    ).toBeVisible();

    await expect(
      contact.getByRole("textbox", {
        name: "Name",
      }),
    ).toBeVisible();

    await expect(
      contact.getByRole("textbox", {
        name: "Email",
      }),
    ).toBeVisible();

    await expect(
      contact.getByRole("combobox"),
    ).toBeVisible();

    await expect(
      contact.getByRole("checkbox", {
        name: "Accept Terms & Conditions",
      }),
    ).toBeVisible();

    await expect(
      contact.getByRole("button", {
        name: "Submit",
      }),
    ).toBeVisible();

    await expect(
      contact.getByRole("button", {
        name: "Cancel",
      }),
    ).toBeVisible();
  });

  test("allows the user to fill out the form", async ({
    page,
  }) => {
    const contact = page.locator("#contact");

    const name = contact.getByRole(
      "textbox",
      {
        name: "Name",
      },
    );

    const email = contact.getByRole(
      "textbox",
      {
        name: "Email",
      },
    );

    const reason =
      contact.getByRole("combobox");

    const checkbox = contact.getByRole(
      "checkbox",
      {
        name: "Accept Terms & Conditions",
      },
    );

    await name.fill("Test User");

    await email.fill(
      "test@example.com",
    );

    await reason.selectOption({
      label: "Inquiry",
    });

    await checkbox.check();

    await expect(name).toHaveValue(
      "Test User",
    );

    await expect(email).toHaveValue(
      "test@example.com",
    );

    await expect(reason).toHaveValue(
      "option1",
    );

    await expect(checkbox).toBeChecked();
  });

  test("cancel button is visible", async ({
    page,
  }) => {
    const contact = page.locator("#contact");

    await expect(
      contact.getByRole("button", {
        name: "Cancel",
      }),
    ).toBeVisible();
  });
});