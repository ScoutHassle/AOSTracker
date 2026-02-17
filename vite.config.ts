import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Using relative base path makes the build work in any subfolder or root domain
  base: './', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});