import { test, expect } from '@playwright/test';

/*
    For running these test run the following:
    1. npm run test:setup - (this will authenticate the user and save the state to a file)
    2. npm run test:sense / npm run test 
*/

//not yet authenticated test
// test('full login', async ({ page }) => {
//     //navigate to auth page and login with google
//     await page.goto('https://dev-app.senseflow.ai/');
//     await page.getByText('Enter your organization name *').click();
//     await page.getByRole('textbox', { name: 'Enter your organization name' }).fill('RetroRabbit');
//     await page.getByRole('button', { name: 'Continue' }).click();
//     await page.getByRole('button', { name: 'Continue with Google' }).click();
//     await page.getByRole('textbox', { name: 'Email or phone' }).fill('rpowell@retrorabbit.co.za');
//     await page.getByRole('button', { name: 'Next' }).click();
//     await page.getByRole('textbox', { name: 'Enter your password' }).fill('R3ino_Rabbit');
//     await page.getByRole('textbox', { name: 'Enter your password' }).press('Enter');

//     //route to the main page
//     await page.goto('https://dev-app.senseflow.ai/time');

//     //click the first slot on the calendar to create a new event
//     await page.locator('tr:nth-child(29) > .fc-timegrid-slot.fc-timegrid-slot-lane').first().click();
//     await page.locator('a').first().click();
//     await page.locator('tr:nth-child(29) > .fc-timegrid-slot.fc-timegrid-slot-lane').first().click();
// });

//already authenticated test
test('time page loads while already authenticated', async ({ page }) => {
    await page.goto('/time');
    await expect(page).toHaveURL(/\/time$/);
    await expect(page).toHaveTitle(/SenseFlow/i);
    await page.locator('tr:nth-child(44) > .fc-timegrid-slot.fc-timegrid-slot-lane').first().click();
    await page.pause();
});