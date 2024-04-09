import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import usePacientesStore from '../store/pacientesStore';

const HistorialClinico = ({ pacienteId }) => {
  const [historialClinico, setHistorialClinico] = useState([]);

  useEffect(() => {
    // Aquí podrías hacer una solicitud para obtener el historial clínico del paciente
    // Supongamos que tienes una función fetchHistorialClinico que obtiene el historial clínico de la API
    const fetchHistorialClinico = async () => {
      try {
        const response = await fetch(`/api/pacientes/${pacienteId}/historial-clinico`);
        const data = await response.json();
        setHistorialClinico(data);
      } catch (error) {
        console.error('Error al obtener el historial clínico:', error);
      }
    };

    fetchHistorialClinico();
  }, [pacienteId]);

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
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Observaciones</th>
              <th className="px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {historialClinico.map(item => (
              <tr key={item.HISTORIAL_CLINICO_ID}>
                <td className="border px-4 py-2">{item.FECHA}</td>
                <td className="border px-4 py-2">{item.OBSERVACIONES}</td>
                <td className="border px-4 py-2">{item.STATUS ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default HistorialClinico;
