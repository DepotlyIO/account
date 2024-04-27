import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';

import getNamesGenerator from './utils/modulesNamesGenerator';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[hash].js',
        entryFileNames: 'entries/[hash].js',
        assetFileNames: 'assets/[hash][extname]',
      },
    },
    target: 'es2022',
  },
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'production' ? getNamesGenerator() : (name) => name,
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/global.scss";',
      },
    },
  },
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
