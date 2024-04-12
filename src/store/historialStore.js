import { create } from 'zustand'
import { listHistorialByPaciente } from '../services/apiService';
const useHistorialStore = create((set) =>({
    historiales:[],
    listHistorialesbyPaciente: async (idPaciente) => {
        try{
            const historial = await listHistorialByPaciente(idPaciente);
            set({ historial });
        }catch(error){
            console.error("Error al obtener historiales del paciente")
        }
    }
}));

export default useHistorialStore;