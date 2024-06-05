import './App.css'
import Home from './components/HomeA'
import Informacion from './components/Informacion'
import Navbar from './components/NavbarA'
import About from './components/About'
import Princing from './components/Pricing'
import Newsletter from './components/Newsletter'
import Fotter from './components/Fotter'
import { Routes, Route, useLocation } from 'react-router-dom';// Importa Routes y Route
import Pacientes from './components/Pacientes'; 
import Alergias from './components/Alergias'
import RegistroPacientes from './components/Doctor/Formulario'
import Contacts from './components/Contacts/contacts'
import Wrapper from './components/ContenedorGlobal/Contenedor'
import Referencias from './components/Referencias'
import Reviews from './components/Reviews'

//import Login from './components/logeado/Login'
import HistorialClinico from './components/Historial'
import ListaHistorialesClinicos from './components/listaHistorial'
import ModificarPaciente from './components/Doctor/ModificarPaciente'
import Citas from './components/logeado/Citas'
import RegHistorial from './components/logeado/RegHistorial'
import HistorialMultimedia from './components/logeado/HistorialMultimedia'
import RegTratamiento from './components/logeado/RegTratamiento'
import RegistrarCita from './components/logeado/RegCitas'
import ActualizarCita from './components/logeado/ActualizarCita'
import Registromultimedia from './components/logeado/Registromultimedia'
import Multimedia from './components/Historial'

import NavbarL from './components/logeado/Navbarlogeado'
import RegistroUsuarios from './components/admin/registroUser'
import NavbarL2 from './components/admin/navbarAdmin'
import ListaUsers from './components/admin/ListaUser'
import ActualizarUsuarios from './components/admin/ActualizarUser'

//login
import Login from './components/Login/Login'


function App() {
  // Asumo que isLoggedIn se determinará por algún método de autenticación real
  const isLoggedIn = false;
  let location = useLocation();

  // Ahora incluye la comprobación para mostrar el navbar y el footer
  const showNavbar = isLoggedIn || location.pathname !== '/login';
  const showFooter = location.pathname !== '/login' && !isLoggedIn;

  return (
    <>
      {showNavbar && (isLoggedIn ? <NavbarL /> : <Navbar />)}
      <Routes>
        <Route path="/" element={<>
          <Home/><Informacion/><About/><Princing/><Newsletter/><Reviews/>
          <Wrapper id="referencias" heading="Referencias" textCenter="center"><Referencias/></Wrapper>
          <Wrapper id="contacts" heading="Contactos" textCenter="center"><Contacts/></Wrapper>
        </>} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/alergias/:idPaciente" element={<Alergias />} />
        <Route path="/registroPacientes" element={<RegistroPacientes />} />
        <Route path="/historialClinico" element={<HistorialClinico />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listaHistorial/:idPaciente" element={<ListaHistorialesClinicos />} />
        <Route path="/modificarPaciente/:idPaciente" element={<ModificarPaciente />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/regHistorial/:idPaciente" element={<RegHistorial />} />
        <Route path="/regmultimedia/:idHistorial" element={<Registromultimedia />} />
        <Route path="/historialMultimedia" element={<HistorialMultimedia />} />
        <Route path="/multimedia/:idHistorial" element={<Multimedia />} />
        <Route path="/regTratamiento/:historialClinicoId" element={<RegTratamiento />} />
        {/*Registrar cita */}
        <Route path="/regCita/:idAsistenteP" element={<RegistrarCita/>} />
        <Route path='/actualizarCita/:idCita' element={<ActualizarCita/>} />
        <Route path="*" element={<div>404</div>} />
        {/* Aquí puedes agregar más rutas según sea necesario */}
        {/* Rutas de administrador */}
        <Route path="/registroUsuarios" element={<RegistroUsuarios />} />
        <Route path="/listaUsuarios" element={<ListaUsers />} />
        <Route path="/actualizarUsuario/:usuarioId/:usuarioRol" element={<ActualizarUsuarios />} />
      </Routes>
      {showFooter && <Fotter/>}
    </>
  );
}
export default App;