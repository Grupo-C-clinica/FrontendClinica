import { create } from "zustand";import { create } from 'zustand';
import { fetchCitasByFecha, addCita } from '../services/apiService';

const useCitasStore = create((set) => ({
  citas: [],
  fetchCitasByFecha: async (fecha) => {
    try {
      const citas = await fetchCitasByFecha(fecha);
      set({ citas });
    } catch (error) {
      console.error('Error fetching citas:', error);
    }
  },
  addCita: async (pacienteId, citaData) => {
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
