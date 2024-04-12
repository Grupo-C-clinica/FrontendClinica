import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const ListaHistorialesClinicos = ({pacienteId}) => {
  const [historialesClinicos, setHistorialesClinicos] = useState([]);

  useEffect(() => {
    // Aquí podrías hacer una solicitud para obtener la lista de historiales clínicos
    // Supongamos que tienes una función fetchHistorialesClinicos que obtiene los historiales clínicos de la API
    const fetchHistorialesClinicos = async () => {
        try {
            const response = await fetch(`/api/pacientes/${pacienteId}/historial-clinico`);
            const data = await response.json();
            setHistorialesClinicos(data);
          } catch (error) {
            console.error('Error al obtener el historial clínico:', error);
          }
    };

    fetchHistorialesClinicos();
  }, []);

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Lista de Historiales Clínicos</h2>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6">
        {historialesClinicos.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {historialesClinicos.map(historial => (
              <li key={historial.HISTORIAL_CLINICO_ID} className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{`Historial #${historial.HISTORIAL_CLINICO_ID}`}</h3>
                <p><strong>Fecha:</strong> {historial.FECHA}</p>
                <p><strong>Observaciones:</strong> {historial.OBSERVACIONES}</p>
                <p><strong>Estado:</strong> {historial.STATUS ? 'Activo' : 'Inactivo'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No se encontraron historiales clínicos.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ListaHistorialesClinicos;
