import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useUsuariosStore from '../../store/usuariosStore';

const Usuarios = () => {
    const { fetchUsuarios, usuarios, changeStatus } = useUsuariosStore();

    const handleStatusChange = async (user) => {
        const token = localStorage.getItem('token');
        try {
            await changeStatus(user.userId, !user.status, token);
            console.log('Estado del usuario cambiado exitosamente');
        } catch (error) {
            console.error('Error al cambiar estado del usuario: ', error);
        }
    };
    const redirigirEditar = (userId, userRol) => {
        window.location.href = `/editarUsuario/${userId}/${userRol}`;
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchUsuarios(token);
    }, [fetchUsuarios]);

    return (
        <div className="md:px-16 p-4 max-w-screen-2xl mx-auto mt-24" id='usuarios'>
            <motion.div variants={fadeIn('right', 0.2)} initial='hidden' whileInView={'show'} className="mb-8">
                <h3 className="text-3xl text-primary font-bold mb-3">Gestión de Usuarios</h3>
                <p className="text-base text-tartiary">Administra los usuarios de la plataforma, consulta su información y realiza acciones como modificar o eliminar.</p>
            </motion.div>

            <ul className="divide-y divide-gray-200">
                <li className="py-4 grid grid-cols-12">
                    <span className="col-span-2 font-bold">Nombre</span>
                    <span className="col-span-2 font-bold">Apellido Paterno</span>
                    <span className="col-span-2 font-bold">Apellido Materno</span>
                    <span className="col-span-2 font-bold">Correo</span>
                    <span className="col-span-1 font-bold text-center">Rol</span>
                    <span className="col-span-2 font-bold text-center">Estado</span>
                    <span className="col-span-1 font-bold text-center">Teléfono</span>
                    <span className="col-span-1 font-bold text-right">Acciones</span>
                </li>
                {usuarios.map(usuario => (
                    <li key={usuario.userId} className="py-4 flex items-center justify-between">
                        <div className="grid grid-cols-12 w-full">
                            <span className="col-span-2">{usuario.nombre}</span>
                            <span className="col-span-2">{usuario.apellidoP}</span>
                            <span className="col-span-2">{usuario.apellidoM}</span>
                            <span className="col-span-2">{usuario.correo}</span>
                            <span className="col-span-1 text-center">{usuario.rol}</span>
                            <span className={`col-span-2 text-center ${usuario.status ? 'text-green-500' : 'text-red-500'}`}>
                                {usuario.status ? 'Activo' : 'Inactivo'}
                            </span>
                            <span className="col-span-1 text-center">{usuario.telefono}</span>
                            <div className="col-span-1 flex justify-end space-x-2">
                                <button className="bg-secondary py-2 px-3 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => handleStatusChange(usuario)}>
                                    {usuario.status ? 'Eliminar' : 'Alta'}
                                </button>
                                <button className="bg-secondary py-2 px-3 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600" onClick={() => redirigirEditar(usuario.userId,usuario.rol)}>
                                    Editar
                                </button>

                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Usuarios;
