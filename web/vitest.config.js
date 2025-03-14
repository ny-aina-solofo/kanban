import { defineConfig } from 'vitest/config.js';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['/setup_test.js'] 
  },
});
