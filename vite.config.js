import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Tartelier-Reposter-a-Artesanal/',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
});
