import { defineConfig } from 'electron-vite';
import path from 'path';

export default defineConfig({
  main: {
    build: {
      outDir: 'dist-electron/main',
      lib: {
        entry: path.resolve(__dirname, 'electron/index.js'),
        formats: ['cjs']
      }
    }
  },

  preload: {
    build: {
      outDir: 'dist-electron/preload',
      lib: {
        entry: path.resolve(__dirname, 'electron/preload.js'),
        formats: ['cjs']
      }
    }
  },

  renderer: {
    build: {
      rollupOptions: {
        input: path.resolve(__dirname, 'src/index.html')
      }
    }
  }
});
