import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { resolveBase } from './build/base.ts';

// Routes are plain paths (/features), so asset URLs must be absolute. The deploy workflow
// sets BASE_PATH to where GitHub Pages serves the site: /<repository> or empty on a custom domain.
export default defineConfig({
  base: resolveBase(process.env.BASE_PATH),
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/polyfills.ts', './src/test/setup.ts'],
    restoreMocks: true,
    unstubGlobals: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}', 'build/**/*.ts'],
      // main.tsx only mounts the app; everything else must be covered.
      exclude: ['src/main.tsx', 'src/test/**', 'src/**/*.test.{ts,tsx}', 'build/**/*.test.ts'],
      reporter: ['text', 'html'],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
});
