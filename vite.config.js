import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Asegúrate de que esto coincide con el nombre de tu repositorio
  plugins: [react()],
  build: {
    outDir: 'dist', // Asegúrate de que el directorio de salida es correcto
  }
});
