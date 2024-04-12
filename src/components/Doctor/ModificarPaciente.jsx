import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import usePacientesStore from '../../store/pacientesStore';

const ModificarPaciente = ({ pacienteId }) => {
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');

  const { getPacienteById, updatePaciente } = usePacientesStore();

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const paciente = await getPacienteById(pacienteId);
        setNombre(paciente.nombre);
        setApellidoP(paciente.apellidoP);
        setApellidoM(paciente.apellidoM);
        setFechaNacimiento(paciente.fechaNacimiento);
        setGenero(paciente.genero);
        setCorreo(paciente.correo);
      } catch (error) {
        console.error('Error al obtener el paciente:', error);
      }
    };

    fetchPaciente();
  }, [pacienteId, getPacienteById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pacienteData = {
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento,
      genero,
      correo,
    };
    try {
      await updatePaciente(pacienteId, pacienteData);
      alert('Paciente modificado con éxito');
      window.location.href = '/pacientes';
    } catch (error) {
      console.error('Error al modificar el paciente:', error);
      alert('Error al modificar el paciente');
    }
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
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Modificar Paciente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* ApellidoP */}
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido Paterno</label>
              <input
                type="text"
                id="apellido"
                value={apellidoP}
                onChange={(e) => setApellidoP(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* ApellidoM */}
            <div>
              <label htmlFor="apellidoM" className="block text-sm font-medium text-gray-700">Apellido Materno</label>
              <input
                type="text"
                id="apellidoM"
                value={apellidoM}
                onChange={(e) => setApellidoM(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* Fecha de Nacimiento */}
            <div>
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* Género */}
            <div>
              <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género</label>
              <select
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Seleccione un género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
          {/* Correo */}
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
          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded
            hover:bg-primary transition-all duration-300"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default ModificarPaciente;
