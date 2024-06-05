import create from 'zustand';
import { fetchUsuarios, createUsuario, changeUsuarioStatus } from '../services/usuarioService';

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
  changeStatus: async (userId, status, ) => {
    await changeUsuarioStatus(userId, status, );
    const usuarios = await fetchUsuarios();
    set({ usuarios });
  },
  updateUsuario: async (usuarioId, usuarioData) =>{
    try{
      const updatedUsuario = await updateUsuario(usuarioId, usuarioData);
      set({ usuario: updatedUsuario });
      return updatedUsuario;
    } catch (error) {
      console.error('Error al actualizar usuario', error);
      throw error;
    }
  }
}));

export default useUsuariosStore;
