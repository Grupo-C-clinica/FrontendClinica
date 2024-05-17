// store/multimediaStore.js
import create from 'zustand';
import { fetchMultimedia } from '../services/multimediaService';

const useMultimediaStore = create((set) => ({
  multimedia: [],
  fetchMultimedia: async (historialId) => {
    const multimedia = await fetchMultimedia(historialId);
    set({ multimedia });
  },
}));

export default useMultimediaStore;
