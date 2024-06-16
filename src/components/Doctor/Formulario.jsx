import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import usePacientesStore from '../../store/pacientesStore';
import { useNavigate } from 'react-router-dom';

const RegistroPacientes = () => {
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');
  const [localError, setLocalError] = useState(''); // Estado para manejar los errores locales
  const [successMessage, setSuccessMessage] = useState(''); // Estado para manejar mensajes de éxito

  const navigate = useNavigate();

  const generos = ["Masculino", "Femenino"];

  const { addPaciente } = usePacientesStore();

  const handleFechaNacimientoChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    if (selectedDate < oneYearAgo) {
      setFechaNacimiento(e.target.value);
    } else {
      setLocalError('La fecha de nacimiento no puede ser futura');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(''); // Limpiar mensaje de error
    setSuccessMessage(''); // Limpiar mensaje de éxito

    const pacienteData = {
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento,
      genero,
      correo,
      telefono: '123',
      ci: 123,
      idZona: 1,
      tipoSangre: '1',
      status: true,
    };

    try {
      if (!nombre || !apellidoP || !apellidoM || !fechaNacimiento || !genero || !correo) {
        setLocalError('Por favor, llena todos los campos');
        return;
      }
      if (!correo.includes('@')) {
        setLocalError('Por favor, introduce un correo electrónico válido.');
        return;
      }
      const regex = /^[a-zA-Z\s]*$/;
      if (!regex.test(nombre)) {
        setLocalError('El nombre no puede contener caracteres especiales');
        return;
      }
      if (!regex.test(apellidoP)) {
        setLocalError('El apellido paterno no puede contener caracteres especiales');
        return;
      }
      if (!regex.test(apellidoM)) {
        setLocalError('El apellido materno no puede contener caracteres especiales');
        return;
      }
      
      await addPaciente(pacienteData);
      setSuccessMessage('Paciente registrado con éxito');
      setTimeout(() => {
        window.location.href = '/pacientes';

      }, 1000);
    } catch (error) {
      console.error('Error al registrar paciente:', error);
      setLocalError('Error al registrar paciente');
    }
  };

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const fechaMaxima = oneYearAgo.toISOString().split('T')[0];

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registro de Pacientes</h2>
        {localError && (
          <div className="text-center p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {localError}
          </div>
        )}
        {successMessage && (
          <div className="text-center p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input
                type="date"
                id="fechaNacimiento"
                value={fechaNacimiento}
                onChange={handleFechaNacimientoChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                max={fechaMaxima}
              />
            </div>
            <div>
              <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género</label>
              <select
                id="genero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Seleccione un género</option>
                {generos.map((gen) => (
                  <option key={gen} value={gen}>{gen}</option>
                ))}
              </select>
            </div>
          </div>
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
            Registrar
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default RegistroPacientes;
