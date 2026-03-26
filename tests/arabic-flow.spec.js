const { test, expect } = require('@playwright/test');

const supportedProjects = new Set(['chromium', 'Mobile Chrome']);

async function assertArabicPage(page, expectedPath) {
    await expect(page).toHaveURL(new RegExp(`${expectedPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('body')).toHaveClass(/rtl/);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(1);

    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(hasOverflow).toBe(false);
}

async function openArabicNavIfNeeded(page, isMobile) {
    if (!isMobile) {
        return;
    }

    await page.getByRole('button', { name: 'تبديل القائمة' }).click();
    await expect(page.locator('#navMenu')).toHaveClass(/open/);

    const menuBox = await page.locator('#navMenu').boundingBox();
    const viewport = page.viewportSize();
    expect(menuBox).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(menuBox.x + menuBox.width).toBeGreaterThan(viewport.width - 12);
}

async function navigateFromPrimaryNav(page, linkName, isMobile) {
    await openArabicNavIfNeeded(page, isMobile);
    await page.locator('#navMenu').getByRole('link', { name: linkName }).click();
}

test.describe('Arabic flow', () => {
    test('navigates through Arabic pages with RTL and bilingual alternates intact', async ({ page }, testInfo) => {
        test.skip(!supportedProjects.has(testInfo.project.name), 'Arabic regression coverage runs on Chromium desktop and Mobile Chrome.');

        const isMobile = testInfo.project.name === 'Mobile Chrome';

        await page.goto('/index-ar.html');
        await assertArabicPage(page, '/index-ar.html');

        await navigateFromPrimaryNav(page, 'من نحن', isMobile);
        await assertArabicPage(page, '/pages/about-ar.html');

        await navigateFromPrimaryNav(page, 'مجالات الممارسة', isMobile);
        await assertArabicPage(page, '/pages/services-ar.html');

        await navigateFromPrimaryNav(page, 'فريقنا', isMobile);
        await assertArabicPage(page, '/pages/team-ar.html');

        await navigateFromPrimaryNav(page, 'اتصل بنا', isMobile);
        await assertArabicPage(page, '/pages/contact-ar.html');

        await expect(page.locator('label[for="privacyConsent"] a')).toHaveAttribute('href', '../privacy-policy-ar.html');
        await page.getByRole('contentinfo').getByRole('link', { name: 'إشعار قانوني' }).click();
        await assertArabicPage(page, '/legal-notice-ar.html');

        await page.getByRole('contentinfo').getByRole('link', { name: 'سياسة الخصوصية' }).click();
        await assertArabicPage(page, '/privacy-policy-ar.html');
    });
});