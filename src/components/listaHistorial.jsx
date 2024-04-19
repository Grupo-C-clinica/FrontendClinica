import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import usePacientesStore from '../store/pacientesStore';
import { useParams } from 'react-router-dom';

const ListaHistorialesClinicos = () => {
  const { idPaciente } = useParams(); // Obtiene el idPaciente de la URL
  const { historialesClinicos, fetchHistorialesClinicos } = usePacientesStore();

  useEffect(() => {
    if (idPaciente) {
      fetchHistorialesClinicos(idPaciente);
    }
  }, [idPaciente, fetchHistorialesClinicos]); 

  const goToHistorial = (historialId) => {
    window.location.href = `/regHistorial/${historialId}`;
  };
  const goToHistorial2 = (historialId) => {
    window.location.href = `/historialMultimedia/${historialId}`;
  };
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
      
      <button
        className="absolute top-20 right-10 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        onClick={() => goToHistorial()}
        
      >
        Añadir Historial Clínico
      </button>

      <div className="bg-white shadow-xl rounded-lg p-6">
        {historialesClinicos.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {historialesClinicos.map(historial => (
              <div key={historial.idHistorial} className=" historial-item flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full">
              <h3 className="text-lg font-semibold">{`Historial #${historial.idHistorial}`}</h3>
              <p className="text-justify"><strong>Fecha:</strong> {new Date(historial.fecha).toLocaleDateString()}</p>
              <p className="text-justify"><strong>Observaciones:</strong> {historial.observaciones}</p>
              <p className="text-justify"><strong>Estado:</strong> {historial.status ? 'Activo' : 'Inactivo'}</p>
              <button className="btn3" onClick={() => goToHistorial2()}>
                    Ver Historial
                  </button>
              </div>
              
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
