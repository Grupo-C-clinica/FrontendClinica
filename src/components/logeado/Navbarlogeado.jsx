import { useState } from 'react';
import logo from '../../assets/logo.png';
import { FaTimes, FaBars, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const togglerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { link: "Registrar nuevo paciente", path: "/FrontendClinica/registroPacientes" },
    { link: "Lista Pacientes", path: "/FrontendClinica/pacientes" },
    { link: "Citas", path: "/FrontendClinica/citas" },
  ];

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    window.location.href = `/`; // O redireccionar a la página que consideres adecuada
  };

  return (
    <>
      <nav className='bg-white md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0 z-10'>
        <div className='text-lg container mx-auto flex justify-between items-center font-medium'>
          <div className='flex space-x-14 items-center'>
            <Link to="/" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
              <img src={logo} alt="UCB Logo" className='w-10 inline-block items-center'/>
              <span>UCB</span>
            </Link>
            <ul className="md:flex space-x-12 hidden">
              {navItems.map(({ link, path }) => (
                <Link to={path} key={link} className='block hover:text-gray-300 cursor-pointer'>{link}</Link>
              ))}
            </ul>
          </div>
          <div className='hidden md:block relative'>
            <button onClick={toggleProfileMenu} className='flex items-center focus:outline-none'>
              <FaUserCircle className='w-8 h-8 text-primary' />
            </button>
            {isProfileMenuOpen && (
              <div className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20'>
                <button onClick={handleLogout} className='block px-4 py-2 text-sm text-primary hover:bg-gray-100 w-full text-left'>Cerrar sesión</button>
              </div>
            )}
          </div>
          <div className='md:hidden'>
            <button onClick={togglerMenu} className='text-primary focus:outline-none focus:text-gray-300'>
              {isMenuOpen ? <FaTimes className='w-6 h-6'/> : <FaBars className='w-6 h-6'/>}
            </button>
          </div>
        </div>
      </nav>
      <div className={`bg-white fixed top-0 right-0 bottom-0 w-[60vw] p-8 border-l z-20 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={togglerMenu} className='text-primary mb-8'>
          <FaTimes className='w-8 h-8'/>
        </button>
        {navItems.map(({ link, path }) => (
          <Link to={path} key={link} className='block hover:text-gray-300 text-primary mb-4' onClick={togglerMenu}>{link}</Link>
        ))}
        <div>
          <Link to="/historial" className='text-primary hover:bg-gray-100 display-block'>Historial</Link>
          <button onClick={handleLogout} className='text-primary hover:bg-gray-100 display-block w-full text-left mt-2'>Cerrar sesión</button>
        </div>
      </div>
    </>
  );
};


export default Navbar;