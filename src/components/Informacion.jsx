
import {motion} from 'framer-motion'; 
import {fadeIn } from '../variants';
import "../components/Informacion.css";

import ov1 from '../assets/ov22.png';
import servi1 from '../assets/servi1.jpg';
import servi2 from '../assets/servi2.jpeg';
import servi3 from '../assets/servi3.jpg';
const Información = () => {
    return (
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto" id='servicios'>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                <motion.div 
                variants={fadeIn('right',0.2)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}
                
                className="lg:w-1/4">
                    <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">Calidad que Marca la Diferencia</h3>
                    <p className="text-base text-tartiary">Cada paciente es el centro de nuestra práctica. Empezamos con una evaluación detallada para entender su situación única, seguido por un plan de tratamiento personalizado y un seguimiento dedicado para asegurar los mejores resultados posibles.</p>
                </motion.div>

                <motion.div 
                variants={fadeIn('up',0.3)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once:false,amount:0.7}}
                
                className="w-full lg:w-3/4">
                   <div className='grid md:grid-cols-3 sm:grid-cols2- grid-cols-1 items-start md:gap-12 gap-8'>    
                        <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 
                              items-center hover:-translate-y-4 align="center" justify-flex'>
                                
                             <div className='flip-card'>
                                <div className='flip-card-inner'>
                                    <div class='flip-card-front'>
                                <div>
                                    <img src={servi1} alt="" />
                                    <h5 className="text-2xl text-primary font-semibold px-5 text-center mt-5">Consultas</h5>
                                    
                                </div>
                                </div>
                                <div class="flip-card-back">
                                    <li>
                                        Diagnostico
                                    </li>
                                    <li>
                                        Tratamiento
                                    </li>
                                    <li>
                                        Seguimiento
                                    </li>
                                    <li>
                                        Medicacion
                                    </li>
                                </div>
                                </div>
                                </div>

                        </div>
                        <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 
                         items-center hover:-translate-y-4' >
                             <div className='flip-card'>
                                <div className='flip-card-inner'>
                                    <div class='flip-card-front'>
                                <img src={servi2} alt="" />
                                <h5 className="text-2xl text-primary font-semibold px-5 text-center mt-5">Cirugias</h5>
                                
                            </div>
                                <div className="flip-card-back">
                                    <li>
                                        Resultados Esteticos
                                    </li>
                                    <li>
                                        Mejora en la respiracion
                                    </li>
                                    <li>
                                        Menos Dolor
                                    </li>
                                    <li>
                                        Menor Tiempo de Recuperacion
                                    </li>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 
                         items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer '>
                             <div className='flip-card'>
                                <div className='flip-card-inner'>
                                    <div class='flip-card-front'>
                            <div>
                                <img src={servi3} alt="" />
                                <h5 className="text-2xl text-primary font-semibold px-5 text-center mt-5">Post Operatorios</h5>
                                
                            </div>
                            </div>
                            <div class="flip-card-back">
                                <li>
                                    Cuidados
                                </li>
                                <li>
                                    Medicacion
                                </li>
                                <li>
                                    Revisiones
                                </li>
                                <li>
                                    Recomendaciones
                                </li>
                                </div></div></div>
                        </div>
                    
                    </div> 
                </motion.div>
            </div>
           

        </div>
    );
}
export default Información;