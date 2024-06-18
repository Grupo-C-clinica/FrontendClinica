
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; 
import { fadeIn } from '../../variants';
import useCitasStore from '../../store/citasStore'; // Asumiendo que tienes un store similar para citas
import user from '../../assets/user.png';

const Citas = () => {
  const { citas, fetchCitasByFecha, fetchCitasFalse, fetchCitasActivas } = useCitasStore();

  const [busqueda, setBusqueda] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [mostrarActivos, setMostrarActivos] = useState(true);
  const [mensajeNoEncontrado] = useState('No se encontraron citas.');
  const [dataLoaded, setDataLoaded] = useState(false);

  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Suma 1 porque los meses van de 0 a 11
  const day = String(fechaActual.getDate()).padStart(2, '0');
  const fechaActualString = `${year}-${month}-${day}`;

  // Fetch initial citas based on the current date
  useEffect(() => {
    const fetchCitasDelDia = async () => {
      await fetchCitasByFecha(fechaActualString);
      setDataLoaded(true);
    };
    fetchCitasDelDia();
  }, [fetchCitasByFecha]);

  // Fetch citas based on mostrarActivos state
  useEffect(() => {
    const fetchCitas = async () => {
      setDataLoaded(false);
      if (mostrarActivos) {
        await fetchCitasByFecha(fechaActualString);
      } else {
        await fetchCitasFalse();
      }
      setDataLoaded(true);
    };
    fetchCitas();
  }, [mostrarActivos, fetchCitasActivas, fetchCitasFalse]);

  const handleSearchByDate = () => {
    fetchCitasByFecha(fechaRegistro);
  };

  const handleToggleActive = () => {
    setMostrarActivos(!mostrarActivos);
  };

  const citasSeguras = citas || [];
  // Asistente será estático sin sesión iniciada sino por parámetro habría que pasar el id del asistente
  const asistente = '1';
  const addCita = () => {
    window.location.href = `/regCita/${asistente}`;
  };
  const modificarCita = (citaId) => {
    window.location.href = `/actualizarCita/${citaId}`;
  };

  // Función para formatear la hora según el huso horario de Bolivia (UTC-4)
  const formatHoraBolivia = (horaUTC) => {
    const dateUTC = new Date(horaUTC);
    // Ajustar a UTC-4 (Bolivia)
    dateUTC.setHours(dateUTC.getHours() - 4);
    return dateUTC.toLocaleTimeString('es-BO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // Función para formatear la fecha según el formato deseado
  const formatFecha = (fechaISO) => {
    const date = new Date(fechaISO);
    return date.toLocaleDateString('es-BO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <motion.div 
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      className="container mx-auto mt-32"
    >
     
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Lista de Citas</h2>
        <p className="text-tartiary md:w-1/3 mx-auto px-4">Lista de todas las citas registradas:</p>    
      </div>

      

      <div className="bg-white shadow-xl rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="border-2 border-gray-200 rounded px-4 py-2 mb-4 md:mb-0"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            // onKeyPress={(e) => e.key === 'Enter' && handleSearchByName()}
          />
          <input
            type="date"
            className="border-2 border-gray-200 rounded px-4 py-2 mb-4 md:mb-0 md:mx-4"
            value={fechaRegistro}
            onChange={(e) => setFechaRegistro(e.target.value)}
            onBlur={handleSearchByDate}
          />
           <button 
            className=" right-10 bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded"
            onClick={() => addCita()}
          >
            Agregar Cita
          </button>
          <button
            className={`px-4 py-2 ${mostrarActivos ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}
            onClick={handleToggleActive}
          >
            {mostrarActivos ? 'Activos' : 'Inactivos'}
          </button>
        </div>

        {!dataLoaded ? (
          <p>Cargando datos...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {citasSeguras.length > 0 ? citasSeguras.map((cita) => (
              <motion.div key={cita.idCita} className="col-span-1"
                variants={fadeIn('up', 0.3)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
              >
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full">
                  <img src={user} alt="Cita" className="w-20 rounded-full" />
                  <div>
                    <p className='text-gray-600'>{`Paciente: ${cita.nombrePaciente} ${cita.apellidoPPaciente} ${cita.apellidoMPaciente}`}</p>
                    <p className="text-gray-600">{`Fecha de la cita: ${formatFecha(cita.fecha)}`}</p>
                    <p className="text-gray-600">{`Hora: ${cita.hora}`}</p>

                    <button className="btn3" onClick={() => modificarCita(cita.idCita)}>
                      Modificar
                    </button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-4 col-span-3">{mensajeNoEncontrado}</div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Citas;
