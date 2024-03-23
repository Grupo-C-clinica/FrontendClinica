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

function App() {


  return (
    <>
    <Navbar/>
    <Home/>
    <Informacion></Informacion>
    <About/>
    <Princing/>
    <Newsletter/>
    <Fotter/>
    </>
  )
}

export default App
