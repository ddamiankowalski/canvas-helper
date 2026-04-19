import { defineConfig } from 'vite';

/**
 * Custom vitest config
 *
 * @reference https://vitest.dev/config/
 */
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'CanvasHelper',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') {
          return 'esm/index.js';
        }

        return 'cjs/index.cjs';
      },
    },
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
