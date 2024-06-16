import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  //base: '/FrontendClinica/', // Asegúrate de que esto apunte a tu repositorio
  plugins: [react()],
  //build: {
    //outDir: 'dist' // Cambia esto si tu directorio de salida es diferente
  //}
});
