import React from "react";
import { useLocation } from "react-router";

export const DetailsNotice = () => {
  const location = useLocation();
  const post = location.state?.post;

  // Fallback: datos por defecto si no hay post recibido
  const noticeData = post || {
    country: "RUSSIA",
    date: "3 OCT",
    title: "Moscow is among world's best Christmas markets",
    subtitle: "The Telegraph named world’s 10 best Christmas markets – and Moscow was included on the list.",
    body: [
      "Rating's authors were impressed by glowing festive installations, aromatic mulled wine, gingerbread with crispy glaze and crêpes with caviar. Besides, you can shop nice handmade presents and souvenirs, participate in various workshops and plunge into bright Christmas atmosphere.",
      "Christmas markets 2018–2019 in Moscow are going to be held around GUM and the Red Square. There you can enjoy dishes of traditional Russian cuisine and Russian interpretations of famous European drinks and snacks."
    ],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    imageTitle: "Red Square",
    imageSubtitle: "Plaza in Moscow, Russia"
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row p-6 gap-6">
      {/* Left: Text */}
      <div className="flex-1 bg-white rounded-xl shadow p-8 flex flex-col justify-between">
        <div>
          <span className="text-teal-500 font-bold text-xs tracking-widest">{noticeData.country}</span>
          <span className="float-right text-gray-400 text-xs font-medium">{noticeData.date}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-2 text-gray-900">{noticeData.title}</h1>
          <blockquote className="border-l-4 border-orange-400 pl-4 italic text-gray-700 mb-4 text-base">
            {noticeData.subtitle}
          </blockquote>
          {noticeData.body && noticeData.body.map((p, idx) => (
            <p key={idx} className="text-gray-600 mb-3 text-base">{p}</p>
          ))}
        </div>
      </div>
      {/* Right: Image */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
          <img src={noticeData.image} alt={noticeData.imageTitle || 'Notice'} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="text-white font-semibold text-lg">{noticeData.imageTitle}</div>
            <div className="text-gray-200 text-xs">{noticeData.imageSubtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
