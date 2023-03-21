import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { splitVendorChunkPlugin } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), splitVendorChunkPlugin()],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${resolve('./node_modules')}/`,
      vue: `${resolve('./node_modules/vue/dist/vue.runtime.esm-bundler.js')}`,
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  css: {
    preprocessorOptions: {
      sass: {},
      // scss: {
      //   additionalData: `
      //         @import "@/global-variables.scss";
      //       `,
      // },
    },
  },
  server: {
    port: <%= port %>,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: <%= port %>,
    },
  },
});
