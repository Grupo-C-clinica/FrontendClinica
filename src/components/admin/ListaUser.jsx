import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useUsuariosStore from '../../store/usuariosStore';

const Usuarios = () => {
    const { fetchUsuarios, usuarios, changeStatus } = useUsuariosStore();
    const [showDialog, setShowDialog] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchUsuarios(token);
    }, [fetchUsuarios]);

    const handleStatusChange = async (user) => {
        const token = localStorage.getItem('token');
        try {
            await changeStatus(user.username, !user.status, token);
            console.log('Estado del usuario cambiado exitosamente');
        } catch (error) {
            console.error('Error al cambiar estado del usuario: ', error);
        }
    };

    const redirigirEditar = (username, userRol) => {
        window.location.href = `/editarUsuario/${username}/${userRol}`;
    };

    const handleDeleteClick = (usuario) => {
        setSelectedUsuario(usuario);
        setShowDialog(true);
    };

    const handleConfirmDelete = () => {
        handleStatusChange(selectedUsuario);
        setShowDialog(false);
        setSelectedUsuario(null);
    };

    const handleCancelDelete = () => {
        setShowDialog(false);
        setSelectedUsuario(null);
    };

    return (
        <motion.div variants={fadeIn('up', 0.3)} initial="hidden" whileInView={'show'} className="container mx-auto mt-32">
            <div className="text-center">
                <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Gestión de Usuarios</h2>
            </div>
            
            <div className="bg-white shadow-xl rounded-lg p-6">
                {usuarios && usuarios.length > 0 ? (
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {usuarios.map(usuario => (
                            <li key={usuario.username} className="relative">
                                <div className="user-item flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full h-200px">
                                    <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={() => handleDeleteClick(usuario)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6L18 18M6 18L18 6" />
                                        </svg>
                                    </button>
                                    <div className="text-center mt-2">
                                        <h3 className="text-lg font-semibold">{`${usuario.nombre} ${usuario.apellidoP} ${usuario.apellidoM}`}</h3>
                                        <p><strong>Correo:</strong> {usuario.correo}</p>
                                        <p><strong>Username:</strong> {usuario.username}</p>
                                        <p><strong>Rol:</strong> {usuario.rol}</p>
                                        <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-secondary py-2 px-3 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => redirigirEditar(usuario.username, usuario.rol)}>
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">No se encontraron usuarios.</p>
                )}
            </div>
            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirmar Borrado</h2>
                        <p>¿Estás seguro de que deseas cambiar el estado de este usuario?</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={handleCancelDelete}>
                                Cancelar
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleConfirmDelete}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Usuarios;
