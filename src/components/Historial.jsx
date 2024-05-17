// components/ListaImagenes.js
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';
import useMultimediaStore from '../store/multimediaStore';
import { useParams } from 'react-router-dom';

const ListaImagenes = () => {
  const { idHistorial } = useParams(); // Asegurarse de que coincide con el nombre en RegImagenes
  const { multimedia, fetchMultimedia } = useMultimediaStore();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (idHistorial) {
      fetchMultimedia(idHistorial).then(() => {
        setUpdate(true); // Cambia el estado para forzar la renderización
      });
    }
  }, [idHistorial, fetchMultimedia]);
  useEffect(() => {
    if (update) {
      console.log('Datos actualizados y componente re-renderizado');
      multimedia.forEach((media, index) => {
        console.log(`Multimedia ${index + 1}:`, `data:${media.contentType};base64,${media.bytes}`);
      });
    }
  }, [update, multimedia]);
  
  useEffect(() => {
    if (update) {
      console.log('Datos actualizados y componente re-renderizado');
      console.log('Multimedia en el componente:', multimedia);
    }
  }, [update, multimedia]);

  const goToAddImage = () => {
    window.location.href = `/regmultimedia/${idHistorial}`;
  };

 

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      whileInView={'show'}
      className="container mx-auto mt-32"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Lista de Imágenes</h2>
      </div>
      <button
        className="absolute top-20 right-10 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
        onClick={goToAddImage}
      >
        Añadir Imagen
      </button>
      <div className="bg-white shadow-xl rounded-lg p-6">
        {multimedia && multimedia.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {multimedia.map((media, index) => (
              <li key={index}>
                <div className="multimedia-item flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full h-200px">
                  <img
                    src={`data:${media.contentType};base64,${media.bytes}`}
                    alt={media.originalFilename}
                    className="w-full h-full object-cover"
                  />
                  <p className="text-center mt-2">{media.originalFilename}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No se encontraron imágenes.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ListaImagenes;
