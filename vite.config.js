import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        consultation: resolve(__dirname, 'consultation.html'),
        privacy: resolve(__dirname, 'privacy.html')
      }
    }
  }
});
