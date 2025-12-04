import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.test.json']
    })
  ],
  test: {
    environment: 'node',
    exclude: [...configDefaults.exclude],
    // include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    root: '.',
    sequence: {
      concurrent: false
    }
  }
});
