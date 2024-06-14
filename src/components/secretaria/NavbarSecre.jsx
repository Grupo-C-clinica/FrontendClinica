import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import useAuthStore from '../../store/useAuthStore'; 
import { FaTimes, FaBars, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout); 
  const name = localStorage.getItem('name');
  useEffect(() => {}, []);

  const togglerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    {link: "Registrar nuevo paciente", path: "/registroPacientes"},
    {link: "Lista Pacientes", path: "/pacientesecre"},
    {link: "Citas", path: "/citas"},
  ];

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    logout(); // Llama a la función logout
    window.location.href = '/'; // Redirige a la página principal
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <nav className='bg-white md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0 z-10'>
        <div className='text-lg container mx-auto flex justify-between items-center font-medium'>
          <div className='flex space-x-14 items-center'>
            <a href="/" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
              <img src={logo} alt="UCB Logo" className='w-10 inline-block items-center'/>
              <span>Clinica Otorrinolaringologo</span>
            </a>
            <ul className="md:flex space-x-12 hidden">
              {navItems.map(({link, path}) => (
                <a href={path} key={link} className='block hover:text-gray-300 cursor-pointer'>{link}</a>
              ))}
            </ul>
          </div>
          <div className='hidden md:block relative'>
            <button onClick={toggleProfileMenu} className='flex items-center focus:outline-none'>
              {name && <span className='mr-6'>{name}</span>}
              <FaUserCircle className='w-8 h-8 text-primary' />
            </button>
            {isProfileMenuOpen && (
              <div className='absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20'>
                <button onClick={openLogoutModal} className='block px-4 py-2 text-sm text-primary hover:bg-gray-100 w-full text-left'>Cerrar sesión</button>
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
        {navItems.map(({link, path}) => (
          <a href={path} key={link} className='block hover:text-gray-300 text-primary mb-4' onClick={togglerMenu}>{link}</a>
        ))}
        <div className=''>
          <button onClick={openLogoutModal} className='text-primary hover:bg-gray-100 display-block w-full text-left mt-2'>Cerrar sesión</button>
        </div>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative text-center">
            <h3 className="text-lg font-bold mb-4">Confirmar Cierre de Sesión</h3>
            <p>¿Estás seguro de que quieres cerrar sesión?</p>
            <div className="mt-4 flex flex-col md:flex-row justify-around space-y-2 md:space-y-0 md:space-x-4">
              <button onClick={closeLogoutModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors duration-300 w-full md:w-auto">
                Cancelar
              </button>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 w-full md:w-auto">
                Cerrar Sesión
              </button>
            </div>
            <button className="absolute top-2 right-2 text-2xl font-bold" onClick={closeLogoutModal}>&times;</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
