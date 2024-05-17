import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import usePacientesStore from '../../store/pacientesStore';
import useCitasStore from '../../store/citasStore';
import useHorarioStore from '../../store/horarioStore';
import { error } from 'pdf-lib';
import { useParams } from 'react-router-dom';

const RegistroCita = () => {
  // Estados para almacenar los datos del formulario
  const ListaTiposCitas=[
    {id:1, nombre:'Consulta'},
    {id:2, nombre:'Examen'},
    {id:3, nombre:'Operación'}
  ];
  const listaDoctores=[
    {id:1, nombre:'Dr. Juan Pérez'},
    {id:2, nombre:'Dra. María González'},
    {id:3, nombre:'Dr. José López'}
  ];
  const listaHorarios=[
    {id:1, hora:'08:00'},
    {id:2, hora:'09:00'},
    {id:3, hora:'10:00'}
  ];
  const listaPacientes=[
  ];

  const idAsistenteP = 27
  const [iddoctor, setDoctor] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [idtipoCita, setTipoCita] = useState('');
  const [idhorario, setHorario] = useState('');
  const [idpaciente, setPaciente] = useState('');
  const [idasistente, setAsistente] = useState('');
  const [error, setError] = useState('');
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState('');
  const [razon, setRazon] = useState('');
  const [estatus, setEstatus] = useState(false); // Estado de la cita
  const {updateCita, citaById} = useCitasStore();
  const {allPacientes, pacientes} = usePacientesStore();
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const {idCita} = useParams();

  useEffect(() => {
    allPacientes('');
  }, [allPacientes]);

  useEffect(() => {
    if(idCita){
      const getCitas = async () => {
        try{
          const cita = await citaById(idCita);
          setTipoCita(cita.tipoCita);
          setHorario(cita.idHorario);
          setPaciente(cita.paciente);
          setAsistente(cita.idAsistenteP);
          setFecha(cita.fecha);
          setHora(cita.hora);
          setRazon(cita.razon);
          setEstatus(cita.status);
        }catch{
          console.error('Error al obtener a la cita', error);
        }
      };
      getCitas();
    }
  },[idCita, citaById]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!idCita){
      console.error('No se ha proporcionado citaId');
      return;
  }
  const formattedHora = `${hora}:00`;
  const idPacienteSeleccionado = selectedPaciente ? selectedPaciente.value : '';
  const citaData = {
    idTipoCita: idtipoCita,
      idHorario: idhorario,
      idPaciente: idPacienteSeleccionado,
      idAsistente: idAsistenteP,
      fecha: fecha,
      hora: formattedHora ,
      razon: razon,
      status: estatus,
  };
  //Validar que todos los campos estén llenos
  if (
    !idtipoCita ||
    !idhorario ||
    !idPacienteSeleccionado ||
    !idasistente ||
    !hora ||
    !fecha ||
    !razon
  ) {
    setError('Todos los campos son obligatorios');
    return;
  }
  if(razon.length < 10){
    setError('La razón debe tener al menos 10 caracteres');
    return;
  }

  try {
     // Aquí puedes realizar una llamada a tu backend para registrar la cita
    console.log('Cita Actualizada:', citaData);
    await updateCita(idCita, citaData);
    console.log('Cita regsitrada: ', citaData);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
     window.location.href = '/citas';
    }, 3000);
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    setError('Ocurrio un error al actualizar la cita');
    }
  };

  const opcionesPacientes = pacientes.map(paciente => ({
    value: paciente.idpaciente,
    label: `${paciente.nombre} ${paciente.apellidoP} ${paciente.apellidoM}`
  }));

  const handleChangePaciente = (selectedOption) => {
    setSelectedPaciente(selectedOption);
  };

  //obtener Tipos de citas, doctor y horarios
  /*
  const [doctores, fetchDoctores] = useDoctorStore();
  const [horarios, fetchHorarios] = useHorarioStore();
  const [pacientes, fetchPacientes] = usePacientesStore();
  */
  /*
  useEffect(() => {
    fetchTiposCitas();
    fetchDoctores();
    fetchPacientes();
  }, [fetchTiposCitas, fetchDoctores, fetchPacientes]);
  


  const handleDoctorChange = (doctorID) => {
    fetchHorarios(doctorID);
  };*/

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial='hidden'
      whileInView={'show'}
      viewport={{ once: false, amount: 0.7 }}
      className="container mx-auto mt-32"
    >
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-center text-3xl font-extrabold mb-4 text-primary">Registro de Cita</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos del formulario */}
          {/* Tipo de cita */}
          <div>
            <label htmlFor="tipoCita" className="block text-sm font-medium text-gray-700">Tipo de Cita</label>
            <select
              id="tipoCita"
              value={idtipoCita}
              onChange={(e) => setTipoCita(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecciona un tipo de cita</option>
              {ListaTiposCitas.map((tipoCita) => (
                <option key={tipoCita.id} value={tipoCita.id}>{tipoCita.nombre}</option>
              ))}
            </select>
          </div>
          {/* Doctor */}
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
            <select
              id="doctor"
              value={iddoctor}
              onChange={(e) => handleDoctorChange(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecciona un doctor</option>
              {listaDoctores.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>{doctor.nombre}</option>
              ))}
            </select>
          </div>
          {/* Horario */}
          <div>
            <label htmlFor="horario" className="block text-sm font-medium text-gray-700">Horario</label>
            <select
              id="horario"
              value={idhorario}
              onChange={(e) => setHorario(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Selecciona un horario</option>
              {listaHorarios.map((horario) => (
                <option key={horario.id} value={horario.id}>{horario.hora}</option>
              ))}
            </select>

          </div>
          
          {/* Paciente */}
          <div>
            <label htmlFor="paciente" className="block text-sm font-medium text-gray-700">Paciente</label>
            <Select
              id="paciente"
              value={selectedPaciente}
              onChange={handleChangePaciente}
              option={pacientes.map(paciente => ({ value: paciente.idPaciente, label: `${paciente.nombre} ${paciente.apellidoP} ${paciente.apellidoM}` }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Selecciona un paciente"
              isClearable
            />
          </div>
          
          {/* Asistente */}
          <div>
            <label htmlFor="asistente" className="block text-sm font-medium text-gray-700">Asistente</label>
            <input
              type="text"
              id="asistente"
              value={idasistente}
              onChange={(e) => setAsistente(e.target.value)}
              placeholder="Ingrese el nombre del asistente"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          {/* Hora */}
          <div>
            <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Hora</label>
            <input
              type="time"
              id="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          {/* Fecha */}
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          {/* Razón */}
          <div>
            <label htmlFor="razon" className="block text-sm font-medium text-gray-700">Razón</label>
            <textarea
              id="razon"
              value={razon}
              onChange={(e) => setRazon(e.target.value)}
              placeholder="Ingrese la razón de la cita"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows="3"
            ></textarea>
          </div>
          
          {/* Estatus */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Estatus</span>
            <button
              type="button"
              onClick={() => setEstatus(!estatus)}
              className={`${estatus ? 'bg-green-500' : 'bg-red-500'} rounded-full px-3 py-1 text-white`}
            >
              {estatus ? 'Activo' : 'Inactivo'}
            </button>
          </div>
          
          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full py-2 px-8 bg-secondary font-semibold text-white rounded hover:bg-primary transition-all duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default RegistroCita;
