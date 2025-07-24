import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs', // <--- Cambia esto de 'dist' a 'docs'
  },
  base: '/APK-Posgrados-Controldeactividades/', // importante para rutas correctas
});
