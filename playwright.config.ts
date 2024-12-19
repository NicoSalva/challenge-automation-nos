import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    browserName: 'chromium',
    baseURL: 'http://localhost:3100',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
});
