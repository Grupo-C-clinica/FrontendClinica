import {  useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useUsuariosStore from '../../store/usuariosStore';

import { useParams } from 'react-router-dom';

const ActualizarUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ci, setCi] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const generos = ["Masculino", "Femenino"];

  const {usuarioId}=useParams();
  const {usuarioRol}=useParams();

  const {updateUsuario} = useUsuariosStore();

  const handleFechaNacimientoChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    if (selectedDate < oneYearAgo) {
      setFechaNacimiento(e.target.value);
    } else {
      alert('La fecha de nacimiento no puede ser futura');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioData = {
      nombre,
      apellidoP,
      apellidoM,
      fechaNacimiento,
      genero,
      correo,
      telefono,
      ci,
      username,
      password,
      rol,
    };

    const regexNombre = /^[a-zA-Z\s]*$/;
    const regexTelefono = /^(\+591\s)?[67]\d{7}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || !apellidoP || !apellidoM || !fechaNacimiento || !genero || !correo || !telefono || !ci || !username || (password && !password) || !rol) {
      alert('Por favor, llena todos los campos');
      return;
    }
    if (!regexCorreo.test(correo)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    }
    if (!regexTelefono.test(telefono)) {
      alert('Por favor, introduce un número de teléfono válido (celular +591).');
      return;
    }
    if (!regexNombre.test(nombre) || !regexNombre.test(apellidoP) || !regexNombre.test(apellidoM)) {
      alert('El nombre y apellidos no pueden contener caracteres especiales');
      return;
    }

    try {
      if(usuarioRol==="doctor"){
        await updateUsuario(usuarioId, usuarioData);
      }else{
        await updateUsuario(usuarioId, usuarioData);
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('Error al actualizar usuario');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
      className="container mx-auto mt-32 mb-10"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Actualizar Usuario</h2>
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
              <label htmlFor="apellidoP" className="block text-sm font-medium text-gray-700">Apellido Paterno</label>
              <input
                type="text"
                id="apellidoP"
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
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="ci" className="block text-sm font-medium text-gray-700">CI</label>
            <input
              type="text"
              id="ci"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
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

export default ActualizarUsuario;
