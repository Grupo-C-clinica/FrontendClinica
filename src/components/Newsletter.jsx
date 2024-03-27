import Banner from '../components/shared/Banner';

import doc from "../assets/doctor1.jpg";

const Newsletter = () => {
  return (
    <div className="md:px-14 p-4 max-w-screen-2xl mx-auto my-12">
        <Banner

         banner={doc} heading="Dr. Eduardo Torrelio" subheading="Cirujano OTORRINOLARINGÓLOGO, Especializado en la cirugía estética con mas de 4 años de experiencia en el campo" />
    </div>
  );
}
export default Newsletter;