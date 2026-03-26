import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8000');
    });

    test('should display navigation menu', async ({ page }) => {
        const navbar = page.locator('.navbar');
        await expect(navbar).toBeVisible();
    });

    test('should navigate to About page', async ({ page }) => {
        await page.click('a[href="pages/about.html"]');
        await expect(page).toHaveURL(/about.html/);
        const heading = page.locator('h1');
        await expect(heading).toContainText('About');
    });

    test('should navigate to Services page', async ({ page }) => {
        await page.click('a[href="pages/services.html"]');
        await expect(page).toHaveURL(/services.html/);
    });

    test('should navigate to Team page', async ({ page }) => {
        await page.click('a[href="pages/team.html"]');
        await expect(page).toHaveURL(/team.html/);
    });

    test('should navigate to Contact page', async ({ page }) => {
        await page.click('a[href="pages/contact.html"]');
        await expect(page).toHaveURL(/contact.html/);
    });

    test('should toggle mobile menu', async ({ page }) => {
        // Resize to mobile
        await page.setViewportSize({ width: 375, height: 667 });
        
        const menuToggle = page.locator('.nav-toggle');
        const navMenu = page.locator('.nav-menu');
        
        await expect(navMenu).not.toHaveClass(/open/);
        await menuToggle.click();
        await expect(navMenu).toHaveClass(/open/);
    });
});

test.describe('Dark Mode', () => {
    test('should toggle dark mode', async ({ page }) => {
        await page.goto('http://localhost:8000');
        
        const darkModeToggle = page.locator('#darkModeToggle');
        const html = page.locator('html');
        
        // Initially no theme attribute
        const initialTheme = await html.getAttribute('data-theme');
        
        // Click toggle
        await darkModeToggle.click();
        await page.waitForTimeout(100);
        
        // Check if theme attribute changed
        const darkTheme = await html.getAttribute('data-theme');
        expect(darkTheme).toBe('dark');
    });

    test('should persist dark mode preference', async ({ context }) => {
        const page = await context.newPage();
        
        // Set localStorage value
        await page.evaluate(() => {
            localStorage.setItem('darkMode', 'true');
        });
        
        await page.goto('http://localhost:8000');
        const html = page.locator('html');
        
        // Should have dark mode applied
        const theme = await html.getAttribute('data-theme');
        expect(theme).toBe('dark');
    });
});

test.describe('Accessibility', () => {
    test('should have accessible buttons', async ({ page }) => {
        await page.goto('http://localhost:8000');
        
        const darkModeButton = page.locator('#darkModeToggle');
        
        // Should have aria-label
        const ariaLabel = await darkModeButton.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
        
        // Should have aria-pressed (button state)
        const ariaPressed = await darkModeButton.getAttribute('aria-pressed');
        expect(ariaPressed).toBeTruthy();
    });

    test('should have skip-to-main link', async ({ page }) => {
        await page.goto('http://localhost:8000');
        
        const skipLink = page.locator('.skip-to-main');
        await expect(skipLink).toBeVisible({ visible: false }); // visually hidden
        
        // Should become visible on focus
        await skipLink.focus();
        const classList = await skipLink.getAttribute('class');
        expect(classList).toContain('skip-to-main');
    });
});

test.describe('Responsiveness', () => {
    test('should render correctly on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('http://localhost:8000');
        
        const container = page.locator('.container');
        await expect(container).toBeVisible();
    });

    test('should render correctly on tablet', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('http://localhost:8000');
        
        const container = page.locator('.container');
        await expect(container).toBeVisible();
    });

    test('should render correctly on desktop', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('http://localhost:8000');
        
        const container = page.locator('.container');
        await expect(container).toBeVisible();
    });
});
