import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import useUsuariosStore from '../store/usuariosStore';

const EnviarCodigo = () => {
  const [correo, setCorreo] = useState('');
  const { enviarCodigoVerificacion } = useUsuariosStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    try {
      await enviarCodigoVerificacion(correo);
      alert('Código de verificación enviado');
    } catch (error) {
      console.error('Error al enviar el código de verificación:', error);
      alert('Error al enviar el código de verificación');
    }
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
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded hover:bg-primary transition-all duration-300"
          >
            Enviar Código
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default EnviarCodigo;
