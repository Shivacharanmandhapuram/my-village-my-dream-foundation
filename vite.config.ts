import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { devApi } from './dev-api';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // PGlite writes to .pglite/ on every query; watching it causes endless full reloads.
        watch: { ignored: ['**/.pglite/**', '**/api/**'] },
      },
      plugins: [react(), devApi()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
