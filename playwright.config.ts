import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  projects: [
    {
      name: 'API Tests',
      testDir: './tests/api', // Directorio de pruebas API
    },
    {
      name: 'Web Tests',
      testDir: './tests/web', // Directorio de pruebas Web
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
});
