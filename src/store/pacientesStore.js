import { create } from 'zustand';
import { fetchPacientes } from '../services/apiService';
import { addPaciente as addPacienteService } from '../services/apiService';
import {  fetchPacientesByName, fetchPacientesByFecha, fetchPacientesByStatus } from '../services/apiService';
const usePacientesStore = create((set) => ({
    pacientes: [],
    paginaActual: 1,
    fetchPacientesByName: async (nombre) => {
      const data = await fetchPacientesByName(nombre);
      set({ pacientes: data.data });
    },
    fetchPacientesByFecha: async (fecha) => {
      const data = await fetchPacientesByFecha(fecha);
      set({ pacientes: data.data });
    },
    fetchPacientesByStatus: async (estado) => {
      const data = await fetchPacientesByStatus(estado);
      set({ pacientes: data.data });
    },
    
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
