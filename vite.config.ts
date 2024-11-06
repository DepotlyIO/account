import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';

import getCssModulesNamesGenerator from './utils/css-modules-names-generator';

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
    target: 'es2023',
    cssCodeSplit: false,
  },
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'production' ? getCssModulesNamesGenerator() : (name) => name,
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@/assets/styles/global.scss" as *;',
      },
    },
  },
  plugins: [
    vue(),
    VueDevTools(),
    VitePWA({
      injectManifest: {
        injectionPoint: undefined,
      },
      devOptions: {
        enabled: false,
      },
      manifest: false,
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
