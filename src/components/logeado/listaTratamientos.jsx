import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useTratamientosStore from '../../store/tratamientoStore';
import { useParams, useNavigate } from 'react-router-dom';

const ListaTratamientos = () => {
  const { idHistorial } = useParams();
  const navigate = useNavigate();
  const { tratamientos, listaTratamientoByHistorial } = useTratamientosStore();
  const [sortedTratamientos, setSortedTratamientos] = useState([]);

  useEffect(() => {
    if (idHistorial) {
      listaTratamientoByHistorial(idHistorial);
    }
  }, [idHistorial, listaTratamientoByHistorial]);

  useEffect(() => {
    if (tratamientos && tratamientos.data && tratamientos.data.length > 0) {
      const sorted = [...tratamientos.data].sort((a, b) => a.idTratamiento - b.idTratamiento);
      setSortedTratamientos(sorted);
    }
  }, [tratamientos]);

  const goToAgregarTratamiento = () => {
    navigate('/regTratamiento/${idHistorial}');
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      whileInView={'show'}
      className="container mx-auto mt-32"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Lista de Tratamientos</h2>
      </div>
      
      <div className="bg-white shadow-xl rounded-lg p-6">
        <button
          className="right-10 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
          onClick={goToAgregarTratamiento}
        >
          Añadir Tratamiento
        </button>

        {sortedTratamientos.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedTratamientos.map(tratamiento => (
              <li key={tratamiento.idTratamiento}>
                <div className="tratamiento-item flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full ">
                  <h3 className="text-lg font-semibold">{`Tratamiento #${tratamiento.idTratamiento}`}</h3>
                  <p className="text-justify"><strong>Contenido:</strong> {tratamiento.contenido}</p>
                  <p className="text-justify"><strong>Estado:</strong> {tratamiento.status ? 'Activo' : 'Inactivo'}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No se encontraron tratamientos.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ListaTratamientos;