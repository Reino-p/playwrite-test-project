# 🎭 Playwright Cheat Sheet

A practical reference for common Playwright actions, selectors, and patterns.

---

# 🧭 1. Navigation & Page Control

### Go to a page
```ts
await page.goto('https://example.com');
```

### Reload page
```ts
await page.reload();
```

### Go back / forward
```ts
await page.goBack();
await page.goForward();
```

### Assert URL
```ts
await expect(page).toHaveURL(/dashboard/);
```

---

# 🖱️ 2. Clicking & Interactions

### Click
```ts
await page.getByRole('button', { name: 'Submit' }).click();
```

### Double click
```ts
await locator.dblclick();
```

### Right click
```ts
await locator.click({ button: 'right' });
```

### Hover
```ts
await locator.hover();
```

---

# ⌨️ 3. Input / Forms

### Fill input
```ts
await page.getByLabel('Email').fill('test@mail.com');
```

### Type (realistic typing)
```ts
await locator.type('Hello world');
```

### Clear input
```ts
await locator.clear();
```

### Press key
```ts
await page.keyboard.press('Enter');
```

---

# 📋 4. Selectors (Best Practice)

### Preferred selectors
```ts
page.getByRole('button', { name: 'Save' });
page.getByLabel('Email');
page.getByPlaceholder('Search...');
page.getByText('Welcome');
page.getByTestId('submit-btn');
```

### Avoid if possible
```ts
page.locator('.my-class');
page.locator('#id');
```

👉 Always prefer **user-facing selectors**

---

# 🎯 5. Assertions

### Visible
```ts
await expect(locator).toBeVisible();
```

### Hidden
```ts
await expect(locator).toBeHidden();
```

### Exact text
```ts
await expect(locator).toHaveText('Success');
```

### Contains text
```ts
await expect(locator).toContainText('Success');
```

### Input value
```ts
await expect(locator).toHaveValue('test@mail.com');
```

### Count elements
```ts
await expect(locator).toHaveCount(3);
```

---

# ⏳ 6. Waiting

### Wait for element
```ts
await locator.waitFor();
```

### Wait for selector
```ts
await page.waitForSelector('.loaded');
```

### Timeout (avoid if possible)
```ts
await page.waitForTimeout(2000);
```

👉 Prefer assertions instead of manual waits

---

# 📂 7. Locators (Reusable Elements)

```ts
const loginButton = page.getByRole('button', { name: 'Login' });

await loginButton.click();
await expect(loginButton).toBeVisible();
```

---

# 📸 8. Debugging & Inspection

### Pause test
```ts
await page.pause();
```

### Screenshot page
```ts
await page.screenshot({ path: 'screenshot.png' });
```

### Screenshot element
```ts
await locator.screenshot({ path: 'element.png' });
```

---

# 🌐 9. Multiple Pages / Tabs

### New tab
```ts
const newPage = await context.newPage();
```

### Handle popup
```ts
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('text=Open')
]);
```

---

# 📦 10. Browser Context (Sessions)

### New context (like incognito)
```ts
const context = await browser.newContext();
const page = await context.newPage();
```

---

# 🍪 11. Authentication / Storage

### Save session
```ts
await context.storageState({ path: 'auth.json' });
```

### Reuse session
```ts
test.use({ storageState: 'auth.json' });
```

---

# 📡 12. Network Interception

### Mock API response
```ts
await page.route('**/api/*', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ success: true })
  });
});
```

### Wait for API response
```ts
await page.waitForResponse('**/api/login');
```

---

# 🧪 13. Test Structure

### Basic test
```ts
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  await page.goto('https://example.com');
});
```

### Group tests
```ts
test.describe('Auth tests', () => {
  test('login works', async ({ page }) => {});
});
```

---

# 🧠 Mental Model

Every Playwright test follows this flow:

```ts
1. Go somewhere
2. Find something
3. Do something
4. Check something
```

### Example
```ts
await page.goto('/login');
await page.getByLabel('Email').fill('test@mail.com');
await page.getByLabel('Password').fill('Password123');
await page.getByRole('button', { name: 'Login' }).click();
await expect(page.getByText('Welcome')).toBeVisible();
```

---

# 🔥 Core Skills to Master First

- page.goto
- getByRole / getByLabel
- click()
- fill()
- expect().toBeVisible()
- expect().toHaveText()
- Locators
- Debugging (--ui / page.pause())

👉 This covers ~80% of real-world usage

---

# 🚀 Useful Commands

```bash
npm run test
npm run test:ui
npm run test:headed
npm run test:debug
npm run test:report
npm run codegen https://example.com
```

---

# 💡 Pro Tips

- Use **getByRole** whenever possible
- Avoid fragile CSS selectors
- Keep tests independent
- Reuse login sessions (storageState)
- Use UI mode for debugging

---

Happy testing 🎭🔥
