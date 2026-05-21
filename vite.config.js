import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: '/admin-design-prototypes/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@shell': path.resolve(__dirname, 'src/shell'),
      '@prototypes': path.resolve(__dirname, 'src/prototypes'),
    },
  },
});
