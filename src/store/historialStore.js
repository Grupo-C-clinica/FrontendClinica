import { create } from 'zustand'
import { addHistorialToPaciente, fetchHistorialByPaciente, fetchPacientesByFecha, listHistorialByPaciente } from '../services/apiService';
const useHistorialStore = create((set) =>({
    historiales:[],
    listHistorialesbyPaciente: async (idPaciente) => {
        try{
            const historial = await listHistorialByPaciente(idPaciente);
            set({ historial });
        }catch(error){
            console.error("Error al obtener historiales del paciente")
        }
    },
    addHistorialToPaciente: async(idPaciente, historialData) =>{
        try{
            const newHistorial = await addHistorialToPaciente(idPaciente, historialData);
            set((state) => ({
                historiales: [...state.historiales, newHistorial]
            }));
            console.log('Paciente agregado con éxito');
        } catch (error) {
            console.error('Error al agregar historial', error);
        }
    },
}));


export default useHistorialStore;

