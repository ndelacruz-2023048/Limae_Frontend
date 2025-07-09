import React from "react";
import { useLocation } from "react-router";

export const DetailsNotice = () => {
  const location = useLocation();
  const post = location.state?.post;
  

  const noticeData = post || {
    titulo: "Moscú está entre los mejores mercados navideños del mundo",
    entrada: "The Telegraph nombró los 10 mejores mercados navideños del mundo, y Moscú fue incluido en la lista.",
    cuerpo: [
      "Los autores de la clasificación quedaron impresionados por las brillantes instalaciones festivas, el aromático vino caliente, el pan de jengibre con glaseado crujiente y los crepes con caviar.",
      "Además, puedes comprar bonitos regalos y souvenirs hechos a mano, participar en varios talleres y sumergirte en el brillante ambiente navideño.",
      "Los mercados navideños 2018-2019 en Moscú se llevarán a cabo alrededor de GUM y la Plaza Roja. Allí podrás disfrutar de platos de la cocina rusa tradicional y de interpretaciones rusas de famosas bebidas y aperitivos europeos."
    ],
    fotografia: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    autor: "Autor Desconocido",
    fecha: new Date("2025-10-03"),
    url: "https://example.com",
    etiquetas: ["Navidad", "Moscú", "Mercados"]
  };

  const cuerpoArray = Array.isArray(noticeData.cuerpo)
    ? noticeData.cuerpo
    : typeof noticeData.cuerpo === "string"
    ? noticeData.cuerpo.split("\n").filter(Boolean)
    : [];

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col md:flex-row gap-6 overflow-x-hidden">
      {/* Texto */}
      <div className="flex-1 bg-white rounded-xl shadow p-8 flex flex-col max-w-full min-w-[300px] w-full overflow-x-hidden break-words">
        <div className="w-full">
          <span className="text-teal-500 font-bold text-xs tracking-widest">{noticeData.autor}</span>
          <span className="float-right text-gray-400 text-xs font-medium">{new Date(noticeData.fecha).toLocaleDateString()}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-2 text-gray-900">{noticeData.titulo}</h1>
          <blockquote className="border-l-4 border-orange-400 pl-4 italic text-gray-700 mb-4 text-base">
            {noticeData.entrada}
          </blockquote>
          {cuerpoArray.map((p, idx) => (
            <p key={idx} className="text-gray-600 mb-3 text-base">{p}</p>
          ))}
        </div>
      </div>

      {/* Imagen */}
      <div className="md:w-1/2 min-w-[300px] w-full max-w-full">
  <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
    <img
      src={noticeData.fotografia}
      alt={noticeData.titulo}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
      <div className="text-white font-semibold text-lg">{noticeData.titulo}</div>
      <div className="text-gray-200 text-xs">{noticeData.entrada}</div>
    </div>
  </div>
</div>


    </div>
  );
};
