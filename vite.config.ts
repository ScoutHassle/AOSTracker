
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This must match your GitHub repository name exactly
  base: '/AOSTracker/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
