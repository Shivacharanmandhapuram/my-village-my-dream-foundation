import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { devApi } from './dev-api';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), devApi()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
