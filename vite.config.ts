/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true,
    include: ['src'],
    exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/**/*.css', 'src/**/*.scss', 'src/**/*.sass', 'src/**/*.less'],
    // Для v5 используем afterBuild
    afterBuild: async () => {
      const files = await glob('dist/types/**/*.d.ts');
      for (const file of files) {
        const filePath = resolve(process.cwd(), file);
        const content = readFileSync(filePath, 'utf8');

        // Удаляем CSS импорты
        const cleaned = content.replace(/import\s+['"][^'"]*\.(css|scss|sass|less)['"];?\n?/g, '');
        if (content !== cleaned) {
          writeFileSync(filePath, cleaned, 'utf8');
          console.log(`✅ Очищен: ${file}`);
        }
      }
      console.log('✨ Очистка .d.ts завершена');
    }
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LarthriaUI',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles.css';
          }
          return assetInfo.name || 'assets/[name].[ext]';
        }
      }
    },
    cssCodeSplit: false
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});