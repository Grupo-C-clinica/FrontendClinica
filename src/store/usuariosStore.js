import create from 'zustand';
import { fetchUsuarios, createUsuario } from '../services/usuarioService';

const useUsuariosStore = create((set) => ({
  usuarios: [],
  fetchUsuarios: async () => {
    const usuarios = await fetchUsuarios();
    set({ usuarios });
  },
  createUsuario: async (usuarioData) => {
    await createUsuario(usuarioData);
    const usuarios = await fetchUsuarios();
    set({ usuarios });
  },
}));

export default useUsuariosStore;
