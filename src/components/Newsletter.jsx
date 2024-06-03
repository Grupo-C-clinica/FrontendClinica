import Banner from '../components/shared/Banner';

import doc from "../assets/doctor1.jpg";

const Newsletter = () => {
  return (
    <div className="bg-white p-3 relative">
      <div className="md:px-14 p-4 max-w-screen-2xl mx-auto my-12">
        <Banner

         banner={doc} heading="Dr. Eduardo Torrelio" subheading={
          <p>
            <p>Cirujano OTORRINOLARINGÓLOGO, Especializado en la cirugía estética con mas de 4 años de experiencia en el campo</p>
            <p>Conferencista Internacional en el campo de la Otorrinolaringología</p>
            <p className='text-bold'>Correo: </p>
            <li>drtorrelio@gmail.com</li>
            
          </p>
        } />
    </div>
    </div>
  );
}
export default Newsletter;