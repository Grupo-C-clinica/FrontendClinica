
import user from '../assets/user.png';
import {motion} from 'framer-motion'; 
import {fadeIn } from '../variants';
import { useEffect, useState, useCallback } from 'react';
import usePacientesStore from '../store/pacientesStore';

const Pacientes = () => {
  const {
    pacientes,
    paginaActual,
    fetchPacientes,
    setPaginaActual,
    fetchPacientesByName,
    fetchPacientesByFecha,
    fetchPacientesByStatus,
  } = usePacientesStore();
  const [busqueda, setBusqueda] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [mostrarActivos, setMostrarActivos] = useState(true);
  const [mensajeNoEncontrado, setMensajeNoEncontrado] = useState('');

  // Utilizamos useCallback para envolver fetchPacientes para evitar que sea recreada en cada render
  const fetchPacientesCallback = useCallback(fetchPacientes, []);
  const handleSearchByName = () => {
    fetchPacientesByName(busqueda);
  };

  const handleSearchByDate = () => {
    fetchPacientesByFecha(fechaRegistro);
  };

  const handleToggleActive = () => {
    setMostrarActivos(!mostrarActivos);
    fetchPacientesByStatus(mostrarActivos);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Asumimos que fetchPacientes puede lanzar una excepción si no se encuentran datos
        await fetchPacientesCallback(paginaActual, busqueda, fechaRegistro, mostrarActivos);
      } catch (error) {
        // Establecemos un mensaje adecuado dependiendo del estado del filtro
        let mensajeError = 'No se encontraron pacientes.';
        if (busqueda) {
          mensajeError = `No se encontraron pacientes con el nombre "${busqueda}".`;
        } else if (fechaRegistro) {
          mensajeError = `No se encontraron pacientes registrados en la fecha ${fechaRegistro}.`;
        } else if (!mostrarActivos) {
          mensajeError = "No se encontraron pacientes inactivos.";
        }
        setMensajeNoEncontrado(mensajeError);
      }
    };

    fetchData();
  }, [paginaActual, 
    busqueda, 
    fechaRegistro, 
    mostrarActivos, 
    fetchPacientesCallback]);

  // Manejador de búsqueda por nombre



  return (
    <motion.div 
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">Lista de Pacientes</h2>
        <p className="text-tartiary md:w-1/3 mx-auto px-4">Lista de todos los pacientes registrados:</p>    
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6">
        {/* Agregar controles de búsqueda y toggle aquí */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="border-2 border-gray-200 rounded px-4 py-2 mb-4 md:mb-0"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchByName()}
          />
          <input
            type="date"
            className="border-2 border-gray-200 rounded px-4 py-2 mb-4 md:mb-0 md:mx-4"
            value={fechaRegistro}
            onChange={(e) => setFechaRegistro(e.target.value)}
            onBlur={handleSearchByDate}
          />
          <button
            className={`px-4 py-2 ${mostrarActivos ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}
            onClick={handleToggleActive}
          >
            {mostrarActivos ? 'Activos' : 'Inactivos'}
          </button>
        </div>

        {/* Iterar sobre la lista de pacientes y mostrarlos */}
        {pacientes.length > 0 ? (
          pacientes.map((paciente) => (
            <motion.div key={paciente.idPersona} className="w-full flex flex-col items-center mb-4"
              variants={fadeIn('up',0.3)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once:false,amount:0.7}}
            >
              <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow space-y-3 w-full max-w-sm">
                <img src={user} alt="Paciente" className="w-20 rounded-full" />
                <div>
                  <h2 className="text-lg font-semibold">{`${paciente.nombre} ${paciente.apellidoP} ${paciente.apellidoM}`}</h2>
                  <p className="text-gray-600">{`Fecha de nacimiento: ${paciente.fechaNacimiento}`}</p>
                  <p className="text-gray-600">{`Sexo: ${paciente.genero}`}</p>
                  <button 
                    className="btnPrimary"
                    onClick={() => goToHistorial(paciente.id)}
                  >
                    Ver Historial
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-4">
            {mensajeNoEncontrado}
          </div>
        )}
        {/* Paginación */}
        <motion.div 
          variants={fadeIn('right',0.3)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once:false,amount:0.7}}
          className="flex justify-center mt-6"
        >
          <button 
            className="mx-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300" 
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual <= 1}
          >
            Anterior
          </button>
          <button 
            className="btnPrimary"
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Pacientes;