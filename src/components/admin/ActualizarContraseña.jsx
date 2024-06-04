import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useUsuariosStore from '../../store/usuariosStore';

const ActualizarContraseña = () => {
  const [codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { verificarCodigoYActualizarContraseña } = useUsuariosStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      alert('Por favor, introduce una nueva contraseña');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await verificarCodigoYActualizarContraseña(codigo, password);
      alert('Contraseña actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      alert('Error al actualizar contraseña');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32 mb-10"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Actualizar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código de Verificación</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded hover:bg-primary transition-all duration-300"
          >
            Actualizar
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ActualizarContraseña;
