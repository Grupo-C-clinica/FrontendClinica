import { useState } from 'react';
import logo from '../assets/logo.png';
import fb from '../assets/fb.png';
import ig from '../assets/ig.png';
import tw from '../assets/tw.png';
import tt from '../assets/tt.png';
import doctor from '../assets/doctor1.jpg';

const Fotter = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = async () => {
    if (email) {
      const endpoint = `http://localhost:8805/api/v1/suscripcion/${email}`;
      try {
        const response = await fetch(endpoint, {
          method: 'GET',
        });
        if (response.ok) {
          alert('Suscripción exitosa');
        } else {
          alert('Error al suscribirse email incorrecto');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error al suscribirse');
      }
    } else {
      alert('Por favor ingrese un email válido');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#010851] md:px-14 p-4 max-w-screen-2xl mx-auto text-white">
      <div className="my-12 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 space-y-8">
          <a href="/" className="text-2xl font-semibold flex items-center space-x-3 text-primary">
            <img src={logo} alt="Clinica Torrelio Logo" className="w-10 inline-block items-center" />
            <span className="text-white">Clinica Torrelio</span>
          </a>
          <p className="md:w-1/2">Reciba las últimas actualizaciones en tratamientos ORL y consejos para su salud auditiva y respiratoria directamente en su correo.</p>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              className="bg-[#9a7af159] py-2 px-4 rounded-md focus:outline-none"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="button"
              value="Suscribirse"
              className="px-4 py-2 bg-secondary rounded-md -ml-2 cursor-pointer hover:bg-white hover:text-primary duration-300 transition-all"
              onClick={handleSubscribe}
            />
          </div>
        </div>
        {/* nav fot */}
        <div className="md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start">
          <div className="space-y-4 mt-5">
            <h4 className="text-xl">Plataform</h4>
            <ul className="space-y-3">
              <a href="/" className="block hover:text-gray-300">Overview</a>
              <a href="/" className="block hover:text-gray-300">Servicios</a>
              <a href="/" className="block hover:text-gray-300">Sobre nosotros</a>
              <a href="/" className="block hover:text-gray-300">Precios</a>
            </ul>
          </div>
          <div className="space-y-4 mt-5">
            <img src={doctor} alt="Doctor" className="w-40 h-40 rounded-full" />
          </div>
        </div>
      </div>
      <hr />
      <div className='flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8'>
        <p className="text-center py-4">© {currentYear} Grupo C - Taller de Software.</p>
        <p className="text-primary font-semibold text-base dark:text-white">
          Hecho con {"<3"}
        </p>
        <div className='flex items-center space-x-5'>
          <a href="https://www.facebook.com/dreduardotorrelio">
            <img src={fb} alt="Facebook" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300' />
          </a>
          <a href="https://www.instagram.com/dreduardotorrelio">
            <img src={ig} alt="Instagram" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300' />
          </a>
          <a href="https://twitter.com/dreduardotorrelio">
            <img src={tw} alt="Twitter" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300' />
          </a>
          <a href="https://www.tiktok.com/dreduardotorrelio">
            <img src={tt} alt="TikTok" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300' />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Fotter;