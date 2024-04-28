import { create } from "zustand";
import { fetchCitasByFecha, addCita } from '../services/apiService';

const useCitasStore = create((set) => ({
  citas: [],
  tiposCitas: [],
  fetchCitasByFecha: async (fecha) => {
      const data = await fetchCitasByFecha(fecha);
      set({ citas: data.data });
  },
  addCitas: async (pacienteId, citaData) => {
    try {
      const newCita = await addCita(pacienteId, citaData);
      set((state) => ({
        citas: [...state.citas, newCita]
      }));
      console.log('Cita agregada con éxito');
    } catch (error) {
      console.error('Error adding cita:', error);
    }
  },
  fetchTiposCitas: async () => {
    
    set({ tiposCitas: [
      { id: 1, nombre: 'Consulta' },
      { id: 2, nombre: 'Examen' },
      { id: 3, nombre: 'Operación' },
    ] });


  },

}));

export default useCitasStore;
