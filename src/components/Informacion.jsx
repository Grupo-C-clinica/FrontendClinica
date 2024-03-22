//32:08
import ov1 from '../assets/ov2.png';
const Información = () => {
    return (
        <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                <div className="lg:w-1/4">
                    <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">Calidad que Marca la Diferencia</h3>
                    <p className="text-base text-tartiary">Cada paciente es el centro de nuestra práctica. Empezamos con una evaluación detallada para entender su situación única, seguido por un plan de tratamiento personalizado y un seguimiento dedicado para asegurar los mejores resultados posibles.</p>
                </div>
                <div className="w-full lg:w-3/4">
                   <div className='grid md:grid-cols-3 sm:grid-cols2- grid-cols-1 items-start md:gap-12 gap-8'>    
                        <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 
                            flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer'>
                                <div>
                                    <img src={ov1} alt="" />
                                    <h5 className="text-2xl text-primary font-semibold px-5 text-center mt-5">Diagnóstico Preciso</h5>
                                    
                                </div>
                        </div>
                        <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 
                        flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16'>
                            <div>
                                <img src={ov1} alt="" />
                                <h5 className="text-2xl text-primary font-semibold px-5 text-center mt-5">Cuidado Continuo</h5>
                                
                            </div>
                        </div>
                        <div className='bg-[rgba(255,255,255,0.04)] rounded-[35px] h-96 shadow-3xl p-8 
                        flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer '>
                            <div>
                                <img src={ov1} alt="" />
                                <h5 className="text-2xl text-primary font-semibold px-5 text-center mt-5">Técnicas Avanzadas</h5>
                                
                            </div>
                        </div>
                    
                    </div> 
                </div>
            </div>
        </div>
    );
}
export default Información;