import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', 
    globals: true,           
    setupFiles: './src/setupTests.js', 
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['text', 'json', 'html'],
      thresholds: {
        perFile: false,
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
});