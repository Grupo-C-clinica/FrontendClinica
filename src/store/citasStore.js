import { create } from "zustand";
import { fetchCitasByFecha, addCita } from '../services/apiService';

const useCitasStore = create((set) => ({
  citas: [],
  paginaActual: 0,
  totalPaginas: 0,
  pageSize: 6,

  fetchCitasPorFecha: async (fecha) => {
    try {
      const data = await fetchCitasByFecha(fecha);
      set({ citas: data.data });
    } catch (error) {
      console.error('Error fetching citas:', error);
    }
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
  }
}));

export default useCitasStore;
