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
    target: 'es2022',
  },
  css: {
    modules: {
      generateScopedName:
        process.env.NODE_ENV === 'production' ? getCssModulesNamesGenerator() : (name) => name,
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/global.scss";',
      },
    },
  },
  plugins: [
    vue(),
    VueDevTools(),
    VitePWA({
      devOptions: {
        enabled: false,
      },
      injectRegister: 'auto',
      manifest: {
        description: 'Depotly application',
        icons: [
          {
            src: 'pwa/logo-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa/logo-180x180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'pwa/logo-180x180-maskable.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'pwa/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa/logo-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        name: 'Depotly',
        short_name: 'Depotly',
        theme_color: '#f6f8fa',
      },
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
