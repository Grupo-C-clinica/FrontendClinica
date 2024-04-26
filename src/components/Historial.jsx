import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';


const HistorialClinico = ({ historialId }) => {
  const [historialClinico, setHistorialClinico] = useState([]);
  const [tratamiento, ] = useState('');
  const [multimedia, ] = useState('');

  const agregarTratamiento = () => {
    window.location.href = `/regTratamiento/${historialId}`;
  }

  useEffect(() => {
    // Aquí podrías hacer una solicitud para obtener el historial clínico del paciente
    // Supongamos que tienes una función fetchHistorialClinico que obtiene el historial clínico de la API
    const fetchHistorialClinico = async () => {
      try {
        const response = await fetch(`/api/historialClinico/${historialId}`);
        const data = await response.json();
        setHistorialClinico(data);
      } catch (error) {
        console.error('Error al obtener el historial clínico:', error);
      }
    };

    fetchHistorialClinico();
  }, [pacienteId]);

  useEffect(() => {
    // Aquí podrías hacer una solicitud para obtener el tratamiento del historial clínico
    // Supongamos que tienes una función fetchTratamiento que obtiene el tratamiento de la API
    const fetchTratamiento = async () => {
      try {
        const response = await fetch(`/api/tratamiento/${historialId}`);
        const data = await response.json();
        setTratamiento(data);
      } catch (error) {
        console.error('Error al obtener el tratamiento:', error);
      }
    };

    fetchTratamiento();
  }, [historialId]);
  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Historial Clínico</h2>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-6">
        {/* Información del historial clínico */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Historial Clínico</h3>
          {historialClinico.map(item => (
            <div key={item.HISTORIAL_CLINICO_ID} className="mb-4">
              <p><strong>Fecha:</strong> {item.FECHA}</p>
              <p><strong>Observaciones:</strong> {item.OBSERVACIONES}</p>
              <p><strong>Estado:</strong> {item.STATUS ? 'Activo' : 'Inactivo'}</p>
            </div>
          ))}
        </div>
        {/* Información del tratamiento si hay se muestra, si esta vacio agregar*/}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Tratamiento</h3>
          {tratamiento!="" ? (
            <div>
              <p><strong>Contenido:</strong> {tratamiento.CONTENIDO}</p>
              <p><strong>Estatus:</strong> {tratamiento.STATUS ? 'Activo' : 'Inactivo'}</p>
            </div>
          ) : (
            <button
              className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
              onClick={agregarTratamiento}
            >
              Agregar Tratamiento
            </button>
          )}
        </div>

        

        {/* Información multimedia clínica */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Multimedia Clínica</h3>
          <input
            type="text"
            className="border border-gray-300 rounded-md w-full p-2"
            value={multimedia}
            readOnly
          />
        </div>
      </div>
     
    </motion.div>
  );
};

export default HistorialClinico;
