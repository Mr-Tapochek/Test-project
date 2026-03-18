import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase', 
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@styles/variables.scss";`, 
      },
    },
  },
  server: {
    port: 3000,
    open: true, 
  },
});