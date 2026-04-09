import { test, expect } from '@playwright/test';

test.skip('authenticate once and save state', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/SenseFlow/i);

  await page.getByRole('textbox', { name: /enter your organization name/i }).fill('RetroRabbit');
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('button', { name: /continue with google/i }).click();

  await page.getByRole('textbox', { name: /email or phone/i }).fill(process.env.E2E_EMAIL!);
  await page.getByRole('button', { name: /^next$/i }).click();

  await page.getByRole('textbox', { name: /enter your password/i }).fill(process.env.E2E_PASSWORD!);
  await page.getByRole('textbox', { name: /enter your password/i }).press('Enter');

  await page.waitForURL('**/time');
  await expect(page).toHaveURL(/\/time$/);

  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});

test('manual authenticate and save state', async ({ page }) => {
    await page.goto('/');
  
    await expect(page).toHaveTitle(/SenseFlow/i);
  
    // Let the user do everything manually:
    // - enter org name
    // - continue
    // - choose Google
    // - enter email/password
    // - finish login
    //
    // This pauses the test and opens Playwright Inspector.
    await page.pause();
  
    // After you complete login manually and the app redirects,
    // resume the test from the inspector.
  
    await page.waitForURL('**/time');
    await expect(page).toHaveURL(/\/time$/);
  
    await page.context().storageState({
      path: 'playwright/.auth/user.json',
      indexedDB: true,
    });
  });