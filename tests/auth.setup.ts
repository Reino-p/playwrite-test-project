import { test, expect } from '@playwright/test';

test('authenticate once and save state', async ({ page }) => {
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