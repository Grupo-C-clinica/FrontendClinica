import { create } from "zustand";
import { addTratamiento, listaTratamientoByHistorial} from "../services/apiService";

const useTratamientoStore = create((set) => ({
    tratamientos: [],
    historiales: [],
    addTratamiento: async(tratamientoData, idHistorial) => {
        try{
            const response = await addTratamiento(tratamientoData, idHistorial);
            const newTratamiento = response.data;
            set(state => ({
                tratamientos: [...state.tratamientos, newTratamiento]
            }));
            return newTratamiento;
        } catch (error) {
            console.error ('Error al agregar el tratamiento', error);
            throw error;
        }
    },
    listaTratamientoByHistorial: async (idHistorial) => {
        try {
            const tratamientos = await listaTratamientoByHistorial(idHistorial);
            console.log('Tratamientos obtenidos del historial:', tratamientos);
            set({ tratamientos });  // Asegúrate de que 'tratamientos' está estableciendo correctamente
        } catch (error) {
            console.error("Error al obtener tratamientos del historial", error);
        }
    },
}));

export default useTratamientoStore;