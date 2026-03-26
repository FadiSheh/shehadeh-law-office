import { test, expect } from '@playwright/test';

async function openNavIfNeeded(page) {
    const navToggle = page.locator('#navToggle');

    if (await navToggle.isVisible()) {
        const navMenu = page.locator('#navMenu');
        if (!(await navMenu.evaluate((element) => element.classList.contains('open')))) {
            await navToggle.click();
            await expect(navMenu).toHaveClass(/open/);
        }
    }
}

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8000');
    });

    test('should display navigation menu', async ({ page }) => {
        const navbar = page.locator('.navbar');
        await expect(navbar).toBeVisible();
    });

    test('should navigate to About page', async ({ page }) => {
        await openNavIfNeeded(page);
        await page.locator('#navMenu').locator('a[href="pages/about.html"]').click();
        await expect(page).toHaveURL(/about.html/);
        const heading = page.locator('h1');
        await expect(heading).toContainText('About');
    });

    test('should navigate to Services page', async ({ page }) => {
        await openNavIfNeeded(page);
        await page.locator('#navMenu').locator('a[href="pages/services.html"]').click();
        await expect(page).toHaveURL(/services.html/);
    });

    test('should navigate to Team page', async ({ page }) => {
        await openNavIfNeeded(page);
        await page.locator('#navMenu').locator('a[href="pages/team.html"]').click();
        await expect(page).toHaveURL(/team.html/);
    });

    test('should navigate to Contact page', async ({ page }) => {
        await openNavIfNeeded(page);
        await page.locator('#navMenu').locator('a[href="pages/contact.html"]').click();
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

test.describe('Language Switch', () => {
    test('should navigate to Arabic home page', async ({ page }) => {
        await page.goto('http://localhost:8000');

        await openNavIfNeeded(page);
        await page.locator('#navMenu').getByRole('link', { name: 'العربية' }).click();

        await expect(page).toHaveURL(/index-ar.html/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
        await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    });

    test('should expose bilingual alternate links on the English home page', async ({ page }) => {
        await page.goto('http://localhost:8000');

        await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
        await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(1);
    });
});

test.describe('Accessibility', () => {
    test('should have accessible buttons', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.setViewportSize({ width: 375, height: 667 });
        
        const navToggle = page.locator('#navToggle');
        
        // Should have aria-label
        const ariaLabel = await navToggle.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();

        await expect(navToggle).toBeVisible();
    });

    test('should have skip-to-main link', async ({ page }) => {
        await page.goto('http://localhost:8000');
        
        const skipLink = page.locator('.skip-to-main');
        await expect(skipLink).toHaveAttribute('href', '#main-content');
        await expect(skipLink).toHaveClass(/sr-only/);
        
        // Should become visible on focus
        await skipLink.focus();
        await expect(skipLink).toBeFocused();
        await expect(skipLink).toBeVisible();
    });
});

test.describe('Responsiveness', () => {
    test('should render correctly on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('http://localhost:8000');
        
        await expect(page.locator('main#main-content')).toBeVisible();
    });

    test('should render correctly on tablet', async ({ page }) => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('http://localhost:8000');
        
        await expect(page.locator('main#main-content')).toBeVisible();
    });

    test('should render correctly on desktop', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('http://localhost:8000');
        
        await expect(page.locator('main#main-content')).toBeVisible();
    });
});
