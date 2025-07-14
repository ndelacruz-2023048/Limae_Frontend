import { useEffect, useState } from 'react';
import { carruselData } from './carruselData';

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carruselData.length);
    }, 4000); // Cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 relative rounded-lg shadow mb-4 overflow-hidden flex items-center justify-center">
      <img
        src={carruselData[current].img}
        alt="Anti-bullying"
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/10 z-10"></div>
      <span className="relative z-20 text-white text-base xs:text-lg sm:text-xl md:text-2xl font-semibold text-center px-2 sm:px-4 drop-shadow-lg w-full flex items-center justify-center">
        {carruselData[current].frase}
      </span>
    </div>
  );
};

export default Carousel;
