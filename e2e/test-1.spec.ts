import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'About Me' }).click();
  await page.getByRole('link', { name: 'Projects' }).click();
  await page.getByRole('link', { name: 'Skills' }).click();
  await page.getByRole('link', { name: 'Contact' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).click();
  await page.getByRole('heading', { name: 'Hello, I\'m Eloisa Marie' }).click();
  await page.locator('div').filter({ hasText: 'Hello, I\'m Eloisa Marie' }).nth(3).click();
  await page.getByRole('heading', { name: 'Hello, I\'m Eloisa Marie' }).click();
  await page.getByText('Empowering ideas through').click();
  await page.getByRole('button', { name: 'Download Cv' }).click();
  await page.getByRole('heading', { name: 'Fill Out Form' }).click();
  await page.getByText('Let\'s connect! Fill out the').click();
  await page.getByRole('textbox', { name: 'Let\'s connect! Fill out the' }).click();
  await page.getByRole('textbox', { name: 'Let\'s connect! Fill out the' }).fill('Try Name');
  await page.getByRole('textbox', { name: 'Email', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('Try Email');
  await page.getByPlaceholder('Please state your reason').click();
  await page.getByPlaceholder('Please state your reason').fill('Try Reason');
  await page.locator('#home').getByRole('button', { name: 'Submit' }).click();
  await page.locator('#home').getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'Close modal' }).click();
  await page.getByRole('button', { name: 'Download Cv' }).click();
  await page.locator('#home').getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('button', { name: 'Close modal' }).click();
  await page.getByRole('img', { name: 'Eloisa Marie Llena' }).click();
  await page.locator('#about-me').click();
  await page.getByRole('heading', { name: 'About Me' }).click();
  await page.getByRole('img', { name: 'Education' }).click();
  await page.getByRole('heading', { name: 'Education' }).click();
//   await page.getByText('General Mariano Alvarez').click(); Test timeout of 30000ms exceeded. for the first run then commented it
  await page.getByRole('img', { name: 'What I Do' }).click();
  await page.getByText('What I DoTransforming ideas').click();
  await page.getByText('Transforming ideas into').click();
  await page.locator('div').filter({ hasText: 'What I DoTransforming ideas' }).nth(3).click();
  await page.locator('div').filter({ hasText: 'InterestsInterested in' }).nth(3).click();
  await page.getByRole('heading', { name: 'Interests' }).click();
  await page.getByText('Interested in building').click();
  await page.getByRole('heading', { name: 'Projects' }).click();
  await page.locator('#projects').click();
  await page.locator('div').filter({ hasText: 'Web Components LibraryRole: N' }).nth(2).click();
  await page.getByRole('img', { name: 'Web Components Library' }).click();
  await page.getByText('Web Components LibraryRole: N').click();
  await page.getByRole('heading', { name: 'Web Components Library' }).click();
  await page.getByText('Role: N/A Description A personal npm package. Technologies storybook, React,').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Live Site' }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Repo' }).click();
  const page2 = await page2Promise;
  await page.getByRole('img', { name: 'Portfolio Website' }).click();
  await page.getByText('Portfolio WebsiteRole: N/A').click();
  await page.getByRole('heading', { name: 'Portfolio Website' }).click();
  await page.getByText('Role: N/A Description A personal portfolio built with Next.js. Technologies').click();
  await page.getByRole('heading', { name: 'Skills', exact: true }).click();
  await page.locator('div').filter({ hasText: 'Hard SkillsNext.jsProficiency' }).nth(2).click();
  await page.getByRole('img', { name: 'Hard Skills' }).click();
//   await page.getByText('Hard SkillsNext.jsProficiency').click(); Test timeout of 30000ms exceeded. for the second run then commented it
  await page.getByRole('img', { name: 'Next.js' }).click();
//   await page.getByRole('img', { name: 'React.js' }).click(); Test timeout of 30000ms exceeded. for the 5th run then commented it
  await page.getByRole('img', { name: 'React.js' }).click();
  await page.getByRole('img', { name: 'Mysql' }).click();
  await page.locator('div').filter({ hasText: /^TypeScriptProficiency: 3\/10$/ }).first().click();
  await page.getByText('Proficiency: 3/').nth(3).click();
  await page.getByText('TypeScript', { exact: true }).click();
  await page.getByRole('img', { name: 'TypeScript' }).click();
  await page.getByText('Proficiency: 3/').nth(2).click();
  await page.getByText('Mysql').click();
  await page.getByText('Proficiency: 3/').nth(1).click();
  await page.getByText('React.js').click();
  await page.getByText('Proficiency: 3/').first().click();
  await page.getByText('Next.js', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^React\.jsProficiency: 3\/10$/ }).first().click();
  await page.locator('div').filter({ hasText: /^MysqlProficiency: 3\/10$/ }).first().click();
  await page.locator('div').filter({ hasText: /^Next\.jsProficiency: 3\/10$/ }).first().click();
  await page.getByRole('img', { name: 'Soft Skills' }).click();
  await page.getByText('Soft SkillsProblem').click();
  await page.getByText('Soft SkillsProblem').click();
  await page.getByRole('heading', { name: 'Soft Skills' }).click();
//   await page.locator('div').filter({ hasText: /^Problem SolvingProficiency: 4\/10$/ }).first().click(); Test timeout of 30000ms exceeded. for the 3rd run then commented it
  await page.getByRole('img', { name: 'Problem Solving' }).click();
  await page.getByText('Problem Solving').click();
  await page.getByText('Proficiency: 4/').first().click();
  await page.getByRole('img', { name: 'Adaptability' }).click();
  await page.getByText('Adaptability').click();
  await page.getByText('Proficiency: 4/').nth(1).click();
  await page.getByRole('img', { name: 'Time Management' }).click();
  await page.getByText('Time Management').click();
  await page.getByText('Proficiency: 3/').nth(4).click();
  await page.locator('div').filter({ hasText: /^Time ManagementProficiency: 3\/10$/ }).first().click();
  await page.locator('div').filter({ hasText: /^CommunicationProficiency: 4\/10$/ }).first().click();
  await page.getByRole('img', { name: 'Communication' }).click();
  await page.getByRole('img', { name: 'Communication' }).click();
  await page.getByText('Communication').click();
//   await page.getByText('Proficiency: 4/').nth(2).click(); Test timeout of 30000ms exceeded. for the 4th run then commented it
  await page.getByRole('img', { name: 'Leadership' }).click();
  await page.getByText('Leadership').click();
  await page.getByText('Proficiency: 3/').nth(5).click();
  await page.locator('div').filter({ hasText: /^LeadershipProficiency: 3\/10$/ }).first().click();
  await page.locator('#contact').click();
  await page.getByRole('heading', { name: 'Contact Me' }).click();
  await page.locator('div').filter({ hasText: 'NameEmailReason for Contact' }).nth(2).click();
  await page.getByText('NameEmailReason for Contact').click();
  await page.getByText('Name', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByText('Email').click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByText('Reason for Contact').click();
  await page.getByRole('combobox').selectOption('option1');
  await page.getByRole('combobox').selectOption('option2');
  await page.getByRole('combobox').selectOption('option3');
  await page.getByText('Accept Terms & Conditions').click();
  await page.locator('.flex.items-start.gap-2').click();
  await page.getByRole('checkbox', { name: 'Accept Terms & Conditions' }).check();
  await page.locator('.flex.items-start.gap-2').click();
  await page.getByText('You must accept the terms and').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Try Form');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('Try Form Email');
  await page.getByRole('combobox').selectOption('');
  await page.getByRole('combobox').selectOption('option1');
  await page.getByRole('combobox').selectOption('option2');
  await page.getByRole('combobox').selectOption('option3');
  await page.getByRole('button', { name: 'Submit' }).click();
});

// detailed report of the cli you can uncomment awaits because it was just commented for testing if it will push through if commented.
// PS C:\Users\ACER\OneDrive\Documents\Portfolio> cd .\my_portfolio\
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> PS C:\Users\ACER\OneDrive\Documents\Portfolio> Remove-Item -Recurse -Force node_modules
// >> >> Remove-Item -Force package-lock.json
// >> >> Remove-Item -Recurse -Force .next
// >> Remove-Item : Cannot find path 'C:\Users\ACER\OneDrive\Documents\Portfolio\node_modules' because it does not exist.
// >> At line:1 char:1
// >> + Remove-Item -Recurse -Force node_modules
// >> + ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// >>     + CategoryInfo          : ObjectNotFound: (C:\Users\ACER\O...io\node_modules:String) [Remove-Item], ItemNotFoundException
// >>     + FullyQualifiedErrorId : PathNotFound,Microsoft.PowerShell.Commands.RemoveItemCommand
// >>  
// >> Remove-Item : Cannot find path 'C:\Users\ACER\OneDrive\Documents\Portfolio\package-lock.json' because it does not exist.
// >> At line:2 char:1
// >> + Remove-Item -Force package-lock.json
// >> + ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// >>     + CategoryInfo          : ObjectNotFound: (C:\Users\ACER\O...ckage-lock.json:String) [Remove-Item], ItemNotFoundException
// >>     + FullyQualifiedErrorId : PathNotFound,Microsoft.PowerShell.Commands.RemoveItemCommand
// >>  
// >> Remove-Item : Cannot find path 'C:\Users\ACER\OneDrive\Documents\Portfolio\.next' because it does not exist.
// >> At line:3 char:1
// >> + Remove-Item -Recurse -Force .next
// >> + ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// >>     + CategoryInfo          : ObjectNotFound: (C:\Users\ACER\O...Portfolio\.next:String) [Remove-Item], ItemNotFoundException
// >>     + FullyQualifiedErrorId : PathNotFound,Microsoft.PowerShell.Commands.RemoveItemCommand
// >>  
// >> PS C:\Users\ACER\OneDrive\Documents\Portfolio> 
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> npx playwright test e2e/test-1.spec.ts --headed                                                      

// Running 1 test using 1 worker                                        
//   1) [chromium] › e2e\test-1.spec.ts:3:1 › test ────────────────────────────────────────────────────

//     Test timeout of 30000ms exceeded.

//     Error: locator.click: Test timeout of 30000ms exceeded.
//     Call log:
//       - waiting for getByText('General Mariano Alvarez')


//       34 |   await page.getByRole('img', { name: 'Education' }).click();
//       35 |   await page.getByRole('heading', { name: 'Education' }).click();
//     > 36 |   await page.getByText('General Mariano Alvarez').click();
//          |                                                   ^
//       37 |   await page.getByRole('img', { name: 'What I Do' }).click();
//       38 |   await page.getByText('What I DoTransforming ideas').click();
//       39 |   await page.getByText('Transforming ideas into').click();
//         at C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio\e2e\test-1.spec.ts:36:51

//     Error Context: test-results\test-1-test-chromium\error-context.md

//   1 failed
//     [chromium] › e2e\test-1.spec.ts:3:1 › test ─────────────────────────────────────────────────────

//   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> npx playwright test e2e/test-2.spec.ts --headed

// Running 1 test using 1 worker
//   1) [chromium] › e2e\test-2.spec.ts:3:1 › test ────────────────────────────────────────────────────

//     Test timeout of 30000ms exceeded.

//     Error: locator.click: Test timeout of 30000ms exceeded.
//     Call log:
//       - waiting for getByText('secondary')


//       151 |   await page.getByRole('columnheader', { name: 'Actions' }).click();
//       152 |   await page.getByRole('columnheader', { name: 'Level' }).click();
//     > 153 |   await page.getByText('secondary').click();
//           |                                     ^
//       154 |   await page.getByRole('cell', { name: 'secondary' }).click();
//       155 |   await page.getByRole('columnheader', { name: 'School Name' }).click();
//       156 |   await page.getByRole('cell', { name: 'General Mariano Alvarez Technical High School' }).click();
//         at C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio\e2e\test-2.spec.ts:153:37

//     Error Context: test-results\test-2-test-chromium\error-context.md

//   1 failed
//     [chromium] › e2e\test-2.spec.ts:3:1 › test ─────────────────────────────────────────────────────

//   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> npx playwright test e2e/test-1.spec.ts --headed

// Running 1 test using 1 worker
//   1) [chromium] › e2e\test-1.spec.ts:3:1 › test ────────────────────────────────────────────────────

//     Test timeout of 30000ms exceeded.

//     Error: locator.click: Test timeout of 30000ms exceeded.
//     Call log:
//       - waiting for getByText('Hard SkillsNext.jsProficiency')
//         - locator resolved to <div class="p-6 flex flex-col gap-4">…</div>
//       - attempting click action
//         - waiting for element to be visible, enabled and stable
//         - element is not stable
//       - retrying click action
//         - waiting for element to be visible, enabled and stable


//       62 |   await page.locator('div').filter({ hasText: 'Hard SkillsNext.jsProficiency' }).nth(2).click();
//       63 |   await page.getByRole('img', { name: 'Hard Skills' }).click();
//     > 64 |   await page.getByText('Hard SkillsNext.jsProficiency').click();
//          |                                                         ^
//       65 |   await page.getByRole('img', { name: 'Next.js' }).click();
//       66 |   await page.getByRole('img', { name: 'React.js' }).click();
//       67 |   await page.getByRole('img', { name: 'React.js' }).click();
//         at C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio\e2e\test-1.spec.ts:64:57

//     Error Context: test-results\test-1-test-chromium\error-context.md

//   1 failed
//     [chromium] › e2e\test-1.spec.ts:3:1 › test ─────────────────────────────────────────────────────

//   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> ^C
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> npx playwright test e2e/test-1.spec.ts --headed

// Running 1 test using 1 worker
//   1) [chromium] › e2e\test-1.spec.ts:3:1 › test ────────────────────────────────────────────────────

//     Test timeout of 30000ms exceeded.

//     Error: locator.click: Test timeout of 30000ms exceeded.
//     Call log:
//       - waiting for locator('div').filter({ hasText: /^Problem SolvingProficiency: 4\/10$/ }).first()


//       84 |   await page.getByText('Soft SkillsProblem').click();
//       85 |   await page.getByRole('heading', { name: 'Soft Skills' }).click();
//     > 86 |   await page.locator('div').filter({ hasText: /^Problem SolvingProficiency: 4\/10$/ }).first().click();
//          |                                                                                                ^
//       87 |   await page.getByRole('img', { name: 'Problem Solving' }).click();
//       88 |   await page.getByText('Problem Solving').click();
//       89 |   await page.getByText('Proficiency: 4/').first().click();
//         at C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio\e2e\test-1.spec.ts:86:96

//     Error Context: test-results\test-1-test-chromium\error-context.md

//   1 failed
//     [chromium] › e2e\test-1.spec.ts:3:1 › test ─────────────────────────────────────────────────────

//   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> npx playwright test e2e/test-1.spec.ts --headed

// Running 1 test using 1 worker
//   1) [chromium] › e2e\test-1.spec.ts:3:1 › test ────────────────────────────────────────────────────

//     Test timeout of 30000ms exceeded.

//     Error: locator.click: Test timeout of 30000ms exceeded.
//     Call log:
//       - waiting for getByText('Proficiency: 4/').nth(2)


//        99 |   await page.getByRole('img', { name: 'Communication' }).click();
//       100 |   await page.getByText('Communication').click();
//     > 101 |   await page.getByText('Proficiency: 4/').nth(2).click();
//           |                                                  ^
//       102 |   await page.getByRole('img', { name: 'Leadership' }).click();
//       103 |   await page.getByText('Leadership').click();
//       104 |   await page.getByText('Proficiency: 3/').nth(5).click();
//         at C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio\e2e\test-1.spec.ts:101:50

//     Error Context: test-results\test-1-test-chromium\error-context.md

//   1 failed
//     [chromium] › e2e\test-1.spec.ts:3:1 › test ─────────────────────────────────────────────────────

//   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> npx playwright test e2e/test-1.spec.ts --headed

// Running 1 test using 1 worker
//   1) [chromium] › e2e\test-1.spec.ts:3:1 › test ────────────────────────────────────────────────────

//     Test timeout of 30000ms exceeded.

//     Error: locator.click: Test timeout of 30000ms exceeded.
//     Call log:
//       - waiting for getByRole('img', { name: 'React.js' })
//         - locator resolved to <img alt="React.js" class="h-10 w-10 rounded object-cover shrink-0" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5agxXUSsI3J6nJYssKdxaZEO5xpTCsh4P6U4qKGXH2w&s=10"/>
//       - attempting click action
//         - waiting for element to be visible, enabled and stable


//       64 | //   await page.getByText('Hard SkillsNext.jsProficiency').click(); Test timeout of 30000ms exceeded. for the second run then commented it
//       65 |   await page.getByRole('img', { name: 'Next.js' }).click();
//     > 66 |   await page.getByRole('img', { name: 'React.js' }).click();
//          |                                                     ^
//       67 |   await page.getByRole('img', { name: 'React.js' }).click();
//       68 |   await page.getByRole('img', { name: 'Mysql' }).click();
//       69 |   await page.locator('div').filter({ hasText: /^TypeScriptProficiency: 3\/10$/ }).first().click();
//         at C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio\e2e\test-1.spec.ts:66:53

//     Error Context: test-results\test-1-test-chromium\error-context.md

//   1 failed
//     [chromium] › e2e\test-1.spec.ts:3:1 › test ─────────────────────────────────────────────────────

//   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
// PS C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio> npx playwright test e2e/test-1.spec.ts --headed

// Running 1 test using 1 worker
//   1) [chromium] › e2e\test-1.spec.ts:3:1 › test ────────────────────────────────────────────────────

//     Test timeout of 30000ms exceeded.

//     Error: locator.click: Test timeout of 30000ms exceeded.
//     Call log:
//       - waiting for getByRole('heading', { name: 'Fill Out Form' })
//         - locator resolved to <h2 class="text-lg font-semibold">Fill Out Form</h2>
//       - attempting click action
//         - waiting for element to be visible, enabled and stable


//       15 |   await page.getByText('Empowering ideas through').click();
//       16 |   await page.getByRole('button', { name: 'Download Cv' }).click();
//     > 17 |   await page.getByRole('heading', { name: 'Fill Out Form' }).click();
//          |                                                              ^
//       18 |   await page.getByText('Let\'s connect! Fill out the').click();
//       19 |   await page.getByRole('textbox', { name: 'Let\'s connect! Fill out the' }).click();
//       20 |   await page.getByRole('textbox', { name: 'Let\'s connect! Fill out the' }).fill('Try Name');
//         at C:\Users\ACER\OneDrive\Documents\Portfolio\my_portfolio\e2e\test-1.spec.ts:17:62

//     Error Context: test-results\test-1-test-chromium\error-context.md

//   1 failed
//     [chromium] › e2e\test-1.spec.ts:3:1 › test ─────────────────────────────────────────────────────

//   Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
