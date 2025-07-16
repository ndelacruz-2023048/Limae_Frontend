import React from "react";
import { useLocation } from "react-router";
import logo from "../../../assets/logo.png";

export const DetailsNotice = () => {
  const location = useLocation();
  const post = location.state?.post;

  const noticeData = post || {
    titulo: "Moscú está entre los mejores mercados navideños del mundo",
    entrada: "The Telegraph nombró los 10 mejores mercados navideños del mundo...",
    cuerpo: [
      "Los autores de la clasificación quedaron impresionados...",
      "Además, puedes comprar bonitos regalos...",
      "Los mercados navideños 2018-2019 en Moscú se llevarán a cabo..."
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
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-6 flex-1">
        {/* Texto */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col w-full">
          <div className="mb-4">
            <img src={logo} alt="Logo" className="w-20 h-auto" />
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-teal-500 font-bold text-xs tracking-widest">{noticeData.autor}</span>
              <span className="text-gray-400 text-xs font-medium">
                {new Date(noticeData.fecha).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-3 text-gray-900">
              {noticeData.titulo}
            </h1>

            <blockquote className="border-l-4 border-orange-400 pl-4 italic text-gray-700 mb-4 text-base">
              {noticeData.entrada}
            </blockquote>

            {cuerpoArray.map((p, idx) => (
              <p key={idx} className="text-gray-600 mb-3 text-base">{p}</p>
            ))}
          </div>
        </div>

        {/* Imagen */}
        <div className="w-full md:w-1/2">
          <div className="relative rounded-xl overflow-hidden shadow-lg h-64 sm:h-full">
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
    </div>
  );
};
