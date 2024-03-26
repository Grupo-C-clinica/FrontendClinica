import { create } from 'zustand';
import { fetchPacientes } from '../services/apiService';
import { addPaciente as addPacienteService } from '../services/apiService';

const usePacientesStore = create((set) => ({
    pacientes: [],
    paginaActual: 1,

    addPaciente: async (pacienteData) => {
      try {
        const newPaciente = await addPacienteService(pacienteData);
        set((state) => ({
          pacientes: [...state.pacientes, newPaciente]
        }));
        console.log('Paciente agregado con éxito');
      } catch (error) {
        console.error('Error al agregar paciente:', error);
      }
    },

    fetchPacientes: async (pagina) => {
      const data = await fetchPacientes(pagina);
      // Asegúrate de ajustar esto según la estructura de tu respuesta de API
      set({ pacientes: data.data }); // Cambio aquí
    },
    setPaginaActual: (pagina) => set(() => ({ paginaActual: pagina })),
  }));
  
export default usePacientesStore;
