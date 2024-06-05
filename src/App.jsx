import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/HomeA';
import Informacion from './components/Informacion';
import Navbar from './components/NavbarA';
import About from './components/About';
import Princing from './components/Pricing';
import Newsletter from './components/Newsletter';
import Fotter from './components/Fotter';
import Pacientes from './components/Pacientes';
import Alergias from './components/Alergias';
import RegistroPacientes from './components/Doctor/Formulario';
import Contacts from './components/Contacts/contacts';
import Wrapper from './components/ContenedorGlobal/Contenedor';
import Referencias from './components/Referencias';
import Reviews from './components/Reviews';
import HistorialClinico from './components/Historial';
import ListaHistorialesClinicos from './components/listaHistorial';
import ModificarPaciente from './components/Doctor/ModificarPaciente';
import Citas from './components/logeado/Citas';
import RegHistorial from './components/logeado/RegHistorial';
import HistorialMultimedia from './components/logeado/HistorialMultimedia';
import RegTratamiento from './components/logeado/RegTratamiento';
import RegistrarCita from './components/logeado/RegCitas';
import ActualizarCita from './components/logeado/ActualizarCita';
import Registromultimedia from './components/logeado/Registromultimedia';
import Multimedia from './components/Historial';
import NavbarL from './components/logeado/Navbarlogeado';
import RegistroUsuarios from './components/admin/registroUser';
import NavbarL2 from './components/admin/navbarAdmin';
import ListaUsers from './components/admin/ListaUser';
import ActualizarUsuarios from './components/admin/ActualizarUser';
import Login from './components/Login/Login';


//secre
import NavbarSecre from './components/secretaria/NavbarSecre';
import PacientesSecre from './components/secretaria/PacientesSecre';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userRol, setUserRol] = useState(localStorage.getItem('userRol'));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  let location = useLocation();

  useEffect(() => {
    console.log("Rol actual:", userRol);
    console.log("Token actual:", token);
    console.log("User ID actual:", userId);
    console.log("Is Logged In:", isLoggedIn);
  }, [userRol, token, userId, isLoggedIn]);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
      setUserId(localStorage.getItem('userId'));
      setUserRol(localStorage.getItem('userRol'));
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const renderNavbar = () => {
    const path = location.pathname;
    if (path === '/login' || path === '/register') {
      return null;
    } else if (!isLoggedIn) {
      return <Navbar />;
    } else {
      switch (userRol) {
        case 'doctor':
          return <NavbarL />;
        case 'admin':
          return <NavbarL2 />;
        case 'asistente':
          return <NavbarSecre />;
        default:
          return <Navbar />;
      }
    }
  };

  const renderRoutes = () => (
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
      <Route path="/regCita/:idAsistenteP" element={<RegistrarCita/>} />
      <Route path='/actualizarCita/:idCita' element={<ActualizarCita/>} />
      <Route path="*" element={<div>404</div>} />
      <Route path="/registroUsuarios" element={<RegistroUsuarios />} />
      <Route path="/listaUsuarios" element={<ListaUsers />} />
      <Route path="/actualizarUsuario/:idUsuario" element={<ActualizarUsuarios />} />

      {/* nuevo*/}
      <Route path="/logout" element={<><Navbar /><Home/><Informacion/><About/><Princing/><Newsletter/><Reviews/>
      <Wrapper id="referencias" heading="Referencias" textCenter="center"><Referencias/></Wrapper>
        <Wrapper id="contacts" heading="Contactos" textCenter="center"><Contacts/></Wrapper>
      
      </>} />
      <Route path="/pacientesecre" element={<PacientesSecre />} />
       
    </Routes>
  );

  return (
    <>
      {renderNavbar()}
      {renderRoutes()}
      {location.pathname !== '/login' && <Fotter />}
    </>
  );
}

export default App;
