import create from 'zustand';
import { fetchPacientes } from '../services/apiService';

const usePacientesStore = create((set) => ({
    pacientes: [],
    paginaActual: 1,
    fetchPacientes: async (pagina) => {
      const data = await fetchPacientes(pagina);
      set({ pacientes: data.pacientes }); // Asegúrate de ajustar esto según la estructura de tu respuesta de API
    },
    setPaginaActual: (pagina) => set(() => ({ paginaActual: pagina })),
  }));

export default usePacientesStore;
