// store/multimediaStore.js
import create from 'zustand';
import { fetchMultimedia, createMultimedia,deleteMultimedia } from '../services/multimediaService';

const useMultimediaStore = create((set) => ({
  multimedia: [],
  fetchMultimedia: async (idHistorial) => {
    const multimedia = await fetchMultimedia(idHistorial);
    set({ multimedia });
  },
  createMultimedia: async (idHistorial, formData) => {
    await createMultimedia(idHistorial, formData);
    const multimedia = await fetchMultimedia(idHistorial);
    set({ multimedia });
  },
  deleteMultimedia: async (idMultimedia, idHistorial) => {
    await deleteMultimedia(idMultimedia);
    const multimedia = await fetchMultimedia(idHistorial);
    set({ multimedia });
  },
}));

export default useMultimediaStore;
