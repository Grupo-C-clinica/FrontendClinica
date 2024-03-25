/*
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/HomeA";
import Informacion from "./components/Informacion";
import Footer from "./components/Footer/Footer";
import Contacts from "./components/Contacts/contacts";
import Wrapper from "./components/ContenedorGlobal/Contenedor";

const App = () => {
  return (
    <>
    
      
    <Navbar/>
    <Wrapper id="contacts" heading="Contactos">
      <Contacts />
    </Wrapper>
      <Informacion></Informacion>
    <Footer/>
    </>
  );
};

export default App;
*/

import './App.css'
import Home from './components/HomeA'
import Informacion from './components/Informacion'
import Navbar from './components/NavbarA'
import About from './components/About'
import Princing from './components/Pricing'
import Newsletter from './components/Newsletter'
import Fotter from './components/Fotter'
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import Pacientes from './components/Pacientes'; 
import Alergias from './components/Alergias'
import RegistroPacientes from './components/Doctor/Formulario'
import Contacts from './components/Contacts/contacts'
import Wrapper from './components/ContenedorGlobal/Contenedor'
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<>
          <Home/><Informacion/><About/><Princing/><Newsletter/>
            <Wrapper id="contacts" heading="Contactos" textCenter="center"><Contacts/></Wrapper>
            </>} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/alergias" element={<Alergias />} />
        <Route path="/registroPacientes" element={<RegistroPacientes />} />
        {/* Agrega aquí otras rutas según sea necesario */}
      </Routes>
      <Fotter/>
    </>
  );
}
export default App
