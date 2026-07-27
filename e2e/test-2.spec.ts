import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/admin/01072004");
  await page.getByText("Admin PanelPersonal").click();
  await page.getByRole("main").click();
  await page.getByRole("heading", { name: "Admin Panel" }).click();
  await page.getByRole("button", { name: "Personal Details" }).click();
  await page.getByText("First NameMiddle NameLast").click();
  await page.getByText("First Name").click();
  await page.getByRole("textbox", { name: "First Name" }).click();
  await page.getByText("Middle Name").click();
  await page.getByRole("textbox", { name: "Middle Name" }).click();
  await page.getByText("Last Name").click();
  await page.getByRole("textbox", { name: "Last Name" }).click();
  await page.getByText("Languages").click();
  await page.getByRole("textbox", { name: "Languages" }).click();
  await page.getByText("Email").click();
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByText("Phone Number").click();
  await page.getByRole("textbox", { name: "Phone Number" }).click();
  await page.getByText("What I Do").click();
  await page.getByRole("textbox", { name: "What I Do" }).click();
  await page.getByRole("textbox", { name: "First Name" }).click();
  await page.getByRole("textbox", { name: "First Name" }).fill("Eloisa Mari");
  await page.getByRole("textbox", { name: "Middle Name" }).click();
  await page.getByRole("textbox", { name: "Middle Name" }).fill("Pasio");
  await page.getByRole("textbox", { name: "Last Name" }).click();
  await page.getByRole("textbox", { name: "Last Name" }).fill("Llen");
  await page.getByRole("textbox", { name: "Languages" }).click();
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowLeft");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowLeft");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowLeft");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowLeft");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowLeft");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page
    .getByRole("textbox", { name: "Languages" })
    .fill("English, Filipin");
  await page.getByRole("textbox", { name: "Phone Number" }).click();
  await page.getByRole("textbox", { name: "Phone Number" }).fill("0");
  await page.getByRole("textbox", { name: "What I Do" }).click();
  await page.getByRole("textbox", { name: "What I Do" }).click();
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page
    .getByRole("textbox", { name: "What I Do" })
    .fill(
      "Transforming ideas into functional and user-centered digital solutions",
    );
  await page.getByRole("button", { name: "Update" }).click();
  await page.getByRole("textbox", { name: "Phone Number" }).click();
  await page.getByRole("textbox", { name: "Phone Number" }).fill("");
  await page.getByRole("textbox", { name: "What I Do" }).click();
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "What I Do" }).press("ArrowRight");
  await page
    .getByRole("textbox", { name: "What I Do" })
    .fill(
      "Transforming ideas into functional and user-centered digital solutions.",
    );
  await page.getByRole("textbox", { name: "Languages" }).click();
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page.getByRole("textbox", { name: "Languages" }).press("ArrowRight");
  await page
    .getByRole("textbox", { name: "Languages" })
    .fill("English, Filipino");
  await page.getByRole("textbox", { name: "Last Name" }).click();
  await page.getByRole("textbox", { name: "Last Name" }).fill("Llena");
  await page.getByRole("textbox", { name: "Middle Name" }).click();
  await page.getByRole("textbox", { name: "Middle Name" }).fill("Pasion");
  await page.getByRole("textbox", { name: "First Name" }).click();
  await page.getByRole("textbox", { name: "First Name" }).fill("Eloisa Marie");
  await page.getByRole("button", { name: "Update" }).click();
  await page.getByRole("button", { name: "Education" }).click();
  await page.getByRole("main").click();
  await page.getByRole("heading", { name: "Education" }).click();
  await page.getByRole("columnheader", { name: "Level" }).click();
  await page.getByRole("columnheader", { name: "School Name" }).click();
  await page.getByRole("columnheader", { name: "School Address" }).click();
  await page.getByRole("columnheader", { name: "Year Attended" }).click();
  await page.getByRole("columnheader", { name: "Year Graduated" }).click();
  await page.getByRole("columnheader", { name: "Course" }).click();
  await page.getByRole("columnheader", { name: "Description" }).click();
  await page.getByRole("columnheader", { name: "Actions" }).click();
  await page.getByRole("columnheader", { name: "Level" }).click();
  await page.getByText("secondary").click();
  await page.getByRole("cell", { name: "secondary" }).click();
  await page.getByRole("columnheader", { name: "School Name" }).click();
  await page
    .getByRole("cell", {
      name: "General Mariano Alvarez Technical High School",
    })
    .click();
  await page.getByRole("columnheader", { name: "School Address" }).click();
  await page.getByRole("cell", { name: "General Mariano Alvarez," }).click();
  await page.getByRole("columnheader", { name: "Year Attended" }).click();
  await page.getByRole("cell", { name: "/1/2016" }).click();
  await page.getByRole("columnheader", { name: "Year Graduated" }).click();
  await page.getByRole("cell", { name: "/1/2022" }).click();
  await page.getByRole("columnheader", { name: "Course" }).click();
  await page.getByRole("cell", { name: "-" }).first().click();
  await page.getByRole("cell", { name: "-" }).nth(1).click();
  await page.getByRole("columnheader", { name: "Description" }).click();
  await page.getByRole("columnheader", { name: "Actions" }).click();
  await page.getByRole("button", { name: "Update" }).click();
  await page.getByRole("textbox", { name: "Description" }).click();
  await page.getByRole("textbox", { name: "Course" }).click();
  await page.getByRole("textbox", { name: "Year Graduated" }).click();
  await page.getByRole("textbox", { name: "Year Attended" }).click();
  await page.getByRole("textbox", { name: "School Address" }).click();
  await page.getByRole("textbox", { name: "School Name" }).click();
  await page.getByRole("combobox").selectOption("primary");
  await page.getByRole("combobox").selectOption("secondary");
  await page.getByRole("combobox").selectOption("tertiary");
  await page.getByRole("combobox").selectOption("masteral");
  await page.getByRole("combobox").selectOption("doctorate");
  await page.getByRole("combobox").selectOption("secondary");
  await page.getByRole("textbox", { name: "School Name" }).click();
  await page
    .getByRole("textbox", { name: "School Name" })
    .press("ControlOrMeta+a");
  await page.getByRole("textbox", { name: "School Name" }).fill("");
  await page.getByRole("textbox", { name: "School Address" }).click();
  await page
    .getByRole("textbox", { name: "School Address" })
    .press("ControlOrMeta+a");
  await page.getByRole("textbox", { name: "School Address" }).fill("");
  await page.getByRole("textbox", { name: "Year Attended" }).click();
  await page
    .getByRole("textbox", { name: "Year Attended" })
    .press("ControlOrMeta+a");
  await page.getByRole("textbox", { name: "Year Attended" }).fill("");
  await page.getByRole("textbox", { name: "Year Graduated" }).click();
  await page
    .getByRole("textbox", { name: "Year Graduated" })
    .press("ControlOrMeta+a");
  await page.getByRole("textbox", { name: "Year Graduated" }).fill("");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Update" }).click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Delete" })
    .click();
  await page.getByRole("button", { name: "Add Education" }).click();
  await page.getByRole("combobox").selectOption("secondary");
  await page.getByRole("combobox").selectOption("masteral");
  await page.getByRole("combobox").selectOption("tertiary");
  await page.getByRole("combobox").selectOption("doctorate");
  await page.getByRole("combobox").selectOption("primary");
  await page.getByRole("combobox").selectOption("masteral");
  await page
    .getByText(
      "Level PrimarySecondaryTertiaryMasteralDoctorateSchool NameSchool AddressYear",
    )
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Add Education$/ })
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: "Add EducationLevel" })
    .nth(2)
    .click();
  await page.getByRole("combobox").selectOption("tertiary");
  await page.getByRole("textbox", { name: "School Name" }).click();
  await page.getByRole("textbox", { name: "School Name" }).fill("PUP");
  await page.getByRole("textbox", { name: "School Address" }).click();
  await page.getByRole("textbox", { name: "School Address" }).fill("Laguna");
  await page.getByRole("textbox", { name: "Year Attended" }).click();
  await page.getByRole("textbox", { name: "Year Attended" }).fill("2022");
  await page
    .getByRole("textbox", { name: "Year Graduated (optional)" })
    .click();
  await page
    .getByRole("textbox", { name: "Year Graduated (optional)" })
    .fill("2026");
  await page.getByRole("textbox", { name: "Course (optional)" }).click();
  await page.getByRole("textbox", { name: "Course (optional)" }).fill("BSIT");
  await page.getByRole("textbox", { name: "Description (optional)" }).click();
  await page
    .getByRole("textbox", { name: "Description (optional)" })
    .fill("n/a");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add Education" })
    .click();
  await page.getByRole("button", { name: "Update" }).click();
  await page.getByRole("textbox", { name: "Description" }).click();
  await page.getByRole("textbox", { name: "Description" }).fill("");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: "Add Education" }).click();
  await page.getByRole("combobox").selectOption("secondary");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add Education" })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add Education" })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add Education" })
    .click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByRole("button", { name: "Add Education" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add Education" })
    .click();
  await page.getByRole("button", { name: "Close modal" }).click();
  await page.getByRole("button", { name: "Skills" }).click();
  await page.getByRole("main").click();
  await page.getByRole("button", { name: "Add Skill" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add Skill" })
    .click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByRole("button", { name: "Add Skill" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Add Skill$/ })
    .nth(1)
    .click();
  await page.getByRole("heading", { name: "Add Skill" }).click();
  await page.getByRole("button", { name: "Close modal" }).click();
  await page.getByRole("button", { name: "Add Skill" }).click();
  await page.getByText("Image URL (optional)").click();
  await page.getByRole("textbox", { name: "Image URL (optional)" }).click();
  await page.getByRole("textbox", { name: "Skill Name" }).click();
  await page.getByRole("dialog").getByText("Skill Name").click();
  await page.getByRole("dialog").getByText("Skill Name").click();
  await page.getByRole("dialog").getByText("Category").click();
  await page.getByRole("combobox").selectOption("soft");
  await page.getByRole("combobox").selectOption("core");
  await page.getByRole("textbox", { name: "Description (optional)" }).click();
  await page.getByRole("textbox", { name: "Description (optional)" }).click();
  await page.getByText("Description (optional)").click();
  await page.getByText("Proficiency Level (0-10,").click();
  await page
    .getByRole("spinbutton", { name: "Proficiency Level (0-10," })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add Skill" })
    .click();
  await page.getByText("Skill name is required").click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByRole("heading", { name: "Skills" }).click();
  await page.getByRole("columnheader", { name: "Image" }).click();
  await page.getByRole("columnheader", { name: "Skill Name" }).click();
  await page.getByRole("columnheader", { name: "Category" }).click();
  await page.getByRole("columnheader", { name: "Proficiency" }).click();
  await page.getByRole("columnheader", { name: "Description" }).click();
  await page.getByRole("columnheader", { name: "Actions" }).click();
  await page.getByRole("img", { name: "Problem Solving" }).click();
  await page.getByText("Problem Solving").click();
  await page.getByRole("cell", { name: "soft" }).first().click();
  await page.getByRole("cell", { name: "/10" }).first().click();
  await page.getByRole("cell", { name: "-" }).first().click();
  await page.getByRole("button", { name: "Update" }).first().click();
  await page.getByRole("textbox", { name: "Image URL" }).click();
  await page.getByText("Image URL").click();
  await page
    .getByRole("cell", { name: "Skill Name Problem Solving" })
    .locator("label")
    .click();
  await page.getByRole("textbox", { name: "Skill Name" }).click();
  await page
    .getByRole("cell", { name: "Category Soft Skill" })
    .locator("label")
    .click();
  await page.getByRole("combobox").selectOption("hard");
  await page.getByRole("combobox").selectOption("soft");
  await page.getByRole("combobox").selectOption("core");
  await page.getByRole("combobox").selectOption("soft");
  await page.getByRole("spinbutton", { name: "Proficiency" }).click();
  await page.getByRole("textbox", { name: "Description" }).click();
  await page.getByRole("spinbutton", { name: "Proficiency" }).click();
  await page.getByRole("spinbutton", { name: "Proficiency" }).click();
  await page.getByRole("spinbutton", { name: "Proficiency" }).click();
  await page.getByRole("spinbutton", { name: "Proficiency" }).dblclick();
  await page.getByRole("spinbutton", { name: "Proficiency" }).click();
  await page.getByRole("spinbutton", { name: "Proficiency" }).click();
  await page.getByRole("spinbutton", { name: "Proficiency" }).click();
  await page.getByRole("spinbutton", { name: "Proficiency" }).press("ArrowUp");
  await page.getByRole("spinbutton", { name: "Proficiency" }).fill("5");
  await page
    .getByRole("spinbutton", { name: "Proficiency" })
    .press("ArrowDown");
  await page.getByRole("spinbutton", { name: "Proficiency" }).fill("4");
  await page.getByRole("spinbutton", { name: "Proficiency" }).press("ArrowUp");
  await page.getByRole("spinbutton", { name: "Proficiency" }).fill("5");
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("cell", { name: "Adaptability" }).first().click();
  await page.getByText("Adaptability").click();
  await page.getByRole("cell", { name: "soft" }).nth(1).click();
  await page.getByRole("cell", { name: "/10" }).nth(1).click();
  await page.getByRole("cell", { name: "-" }).nth(1).click();
  await page.getByRole("button", { name: "Projects" }).click();
  await page.getByRole("main").click();
  await page.getByRole("heading", { name: "Projects" }).click();
  await page.getByRole("button", { name: "Add Project" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Add Project$/ })
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Close modal" }).click();
  await page.getByRole("button", { name: "Add Project" }).click();
  await page.getByRole("heading", { name: "Add Project" }).click();
  await page
    .locator("div")
    .filter({ hasText: "Image URL (optional)Project" })
    .nth(4)
    .click();
  await page.getByText("Image URL (optional)").click();
  await page.getByRole("textbox", { name: "Image URL (optional)" }).click();
  await page.getByRole("textbox", { name: "Image URL (optional)" }).click();
  await page
    .getByRole("textbox", { name: "Image URL (optional)" })
    .fill("vdvdvd");
  await page.getByRole("textbox", { name: "Image URL (optional)" }).click();
  await page.getByText("Project Title").click();
  await page.getByRole("textbox", { name: "Project Title" }).click();
  await page.getByText("Project Description").click();
  await page.getByRole("textbox", { name: "Project Description" }).click();
  await page.getByText("Project Type (optional)").click();
  await page.getByRole("textbox", { name: "Project Type (optional)" }).click();
  await page.getByText("Role (optional)").click();
  await page.getByRole("textbox", { name: "Role (optional)" }).click();
  await page.getByText("Technologies Used").click();
  await page.getByRole("textbox", { name: "Technologies Used" }).click();
  await page.getByText("Project Link (optional)").click();
  await page.getByRole("textbox", { name: "Project Link (optional)" }).click();
  await page.getByText("Repository Link (optional)").click();
  await page
    .getByRole("textbox", { name: "Repository Link (optional)" })
    .click();
  await page.getByRole("dialog").getByText("Start Date").click();
  await page.getByRole("textbox", { name: "Start Date" }).click();
  await page.getByText("End Date (optional)").click();
  await page.getByText("End Date (optional)").click();
  await page.getByRole("textbox", { name: "End Date (optional)" }).click();
  await page.getByText("Project Status").click();
  await page.getByRole("combobox").selectOption("finished");
  await page.getByRole("combobox").selectOption("cancelled");
  await page.getByRole("checkbox", { name: "Currently Ongoing" }).check();
  await page.getByText("Currently Ongoing").click();
  await page.getByText("Check this if the project is").click();
  await page.getByText("Check this if the project is").click();
  await page.getByRole("checkbox", { name: "Currently Ongoing" }).check();
  await page.getByRole("checkbox", { name: "Currently Ongoing" }).uncheck();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add Project" })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Add Project" })
    .click();
  await page.getByRole("button", { name: "Cancel" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Live" }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Repo" }).click();
  const page2 = await page2Promise;
  await page.getByRole("cell", { name: "-" }).nth(2).click();
});

//cli report
// PS C:\Users\ACER\OneDrive\Documents\Portfolio> cd .\my_portfolio\
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> npx playwright test e2e/test-2.spec.ts --headed

// Running 1 test using 1 worker
//   1) [chromium] › e2e\test-2.spec.ts:3:1 › test ────────────────────────────────────────────────────

//     Test timeout of 30000ms exceeded.

//     Error: locator.click: Test timeout of 30000ms exceeded.
//     Call log:
//       - waiting for getByRole('cell', { name: 'secondary' })

//       152 |   await page.getByRole('columnheader', { name: 'Level' }).click();
//       153 |   // await page.getByText('secondary').click();
//     > 154 |   await page.getByRole('cell', { name: 'secondary' }).click();
//           |                                                       ^
//       155 |   await page.getByRole('columnheader', { name: 'School Name' }).click();
//       156 |   await page.getByRole('cell', { name: 'General Mariano Alvarez Technical High School' }).click();
//       157 |   await page.getByRole('columnheader', { name: 'School Address' }).click();
//         at C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio\e2e\test-2.spec.ts:154:55

//     Error Context: test-results\test-2-test-chromium\error-context.md

//   1 failed
//     [chromium] › e2e\test-2.spec.ts:3:1 › test ─────────────────────────────────────────────────────

//   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
// i stopped cause i know it will be a loop of errors Test timeout of 30000ms exceeded.
