import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const Alergias = () => {
  const [alergiaActiva, setAlergiaActiva] = useState(false);
  const [tipoAlergia, setTipoAlergia] = useState('');
  const [causa, setCausa] = useState('');

  // Ejemplo de tipos de alergias, podrías cargar estos desde tu backend
  const tiposDeAlergia = ["Epidermica", "Polen", "Alimentos", "Animales", "Medicamentos"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías el envío de los datos del formulario
    console.log({ tipoAlergia, causa, alergiaActiva });
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registro de Alergia</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selector de tipo de alergia */}
          <div>
            <label htmlFor="tipoAlergia" className="block text-sm font-medium text-gray-700">Tipo de alergia</label>
            <select
              id="tipoAlergia"
              value={tipoAlergia}
              onChange={(e) => setTipoAlergia(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Seleccione un tipo</option>
              {tiposDeAlergia.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          {/* Campo de texto para la causa */}
          <div>
            <label htmlFor="causa" className="block text-sm font-medium text-gray-700">Causa</label>
            <input
              type="text"
              id="causa"
              value={causa}
              onChange={(e) => setCausa(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Toggle button para el estado de la alergia */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Alergia activa</span>
            <button
              type="button"
              onClick={() => setAlergiaActiva(!alergiaActiva)}
              className={`${alergiaActiva ? 'bg-green-500' : 'bg-red-500'} rounded-full px-3 py-1 text-white`}
            >
              {alergiaActiva ? 'Activa' : 'Inactiva'}
            </button>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded
            hover:bg-primary transition-all duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Alergias;
