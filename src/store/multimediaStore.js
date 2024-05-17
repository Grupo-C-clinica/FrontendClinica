// store/multimediaStore.js
import create from 'zustand';
import { fetchMultimedia, createMultimedia } from '../services/multimediaService';

const useMultimediaStore = create((set) => ({
  multimedia: [],
  fetchMultimedia: async (historialId) => {
    const multimedia = await fetchMultimedia(historialId);
    set({ multimedia });
  },
  createMultimedia: async (historialId, formData) => {
    await createMultimedia(historialId, formData);
    const multimedia = await fetchMultimedia(historialId);
    set({ multimedia });
  },
}));

export default useMultimediaStore;
