import { defineConfig, devices } from '@playwright/test';

const fullCrossBrowser = !!process.env.CI || process.env.PW_FULL_CROSS_BROWSER === '1';

const defaultProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
];

const extendedProjects = [
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] },
  },
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:8000',
    trace: 'on-first-retry',
  },

  projects: fullCrossBrowser ? [...defaultProjects, ...extendedProjects] : defaultProjects,

  webServer: {
    command: 'npm start',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
  },
});
