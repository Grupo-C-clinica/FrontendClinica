import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import useTratamientosStore from '../../store/tratamientoStore';
import { useParams } from 'react-router-dom';

const ListaTratamientos = () => {
    const { idHistorial } = useParams();
    const { tratamientos, listaTratamientoByHistorial } = useTratamientosStore();
    const [update, setUpdate] = useState(false);
    const [sortedTratamientos, setSortedTratamientos] = useState([]);
  
    useEffect(() => {
      if (idHistorial) {
        listaTratamientoByHistorial(idHistorial).then(() => {
          setUpdate(true); // Cambia el estado para forzar la renderización
        });
      }
    }, [idHistorial, listaTratamientoByHistorial]);
  
    useEffect(() => {
      if (update) {
        const sorted = [...tratamientos].sort((a, b) => a.tratamientoId - b.tratamientoId);
        setSortedTratamientos(sorted);
        console.log('Datos actualizados y componente re-renderizado');
        console.log('Tratamientos en el componente:', sorted);
      }
    }, [update, tratamientos]);

    const goToAgregarTratamiento = () => {
        window.location.href = `/regTratamiento/${idHistorial}`;
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
      <button
        className="absolute top-20 right-10 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        onClick={goToAgregarTratamiento}
      >
        Añadir Tratamiento
      </button>
      <div className="bg-white shadow-xl rounded-lg p-6">
        {sortedTratamientos && sortedTratamientos.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedTratamientos.map(tratamiento => (
              <li key={tratamiento.tratamientoId}>
                <div className="tratamiento-item flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full ">
                  <h3 className="text-lg font-semibold">{`Tratamiento #${tratamiento.tratamientoId}`}</h3>
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
