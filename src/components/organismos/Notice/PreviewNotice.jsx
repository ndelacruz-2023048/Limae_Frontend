import React from 'react'

export const PreviewNotice = () => {
  return (
    <div className="flex bg-white rounded-xl shadow-lg overflow-hidden  border border-blue-200">
      {/* Left: Text Content */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
        <div>
          <div className="text-teal-500 font-semibold text-xs mb-2">RUSSIA</div>
          <div className="text-gray-400 text-xs mb-4">3 OCT</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
            Moscow is among world's best Christmas markets
          </h2>
          <div className="bg-orange-100 border-l-4 border-orange-400 text-orange-700 p-3 mb-4 text-sm">
            <span className="font-semibold">The Telegraph</span> named world's 10 best Christmas markets – and Moscow was included on the list.
          </div>
          <p className="text-gray-700 text-sm mb-4">
            Rating’s authors were impressed by glowing festive installations, aromatic mulled wine, gingerbread with crispy glaze and crêpes with caviar. Besides, you can shop nice handmade presents and souvenirs, participate in various workshops and plunge into bright Christmas atmosphere.
          </p>
          <p className="text-gray-500 text-xs">
            Christmas markets 2018-2019 in Moscow are going to be held around GUM and the Red Square. There you can enjoy dishes of traditional Russian cuisine and Russian interpretations of famous European drinks and snacks.
          </p>
        </div>
      </div>
      {/* Right: Image & Overlay */}
      <div className="relative w-1/2 hidden md:block">
        <img
          src="https://res.cloudinary.com/dtmwybty7/image/upload/v1752187459/WhatsApp-Image-2023-01-30-at-12.02.59-PM_b1jlfu.webp"
          alt="Red Square"
          className="object-cover h-full w-full"
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* Info on image */}
        <div className="absolute top-0 left-0 p-6">
          <div className="text-white font-semibold text-lg">Red Square</div>
          <div className="text-blue-200 text-xs">Plaza in Moscow, Russia</div>
        </div>
        {/* Arrows */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button className="bg-teal-500 hover:bg-teal-600 rounded-full p-2 shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        {/* Dots */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          <span className="block w-2 h-2 bg-white/70 rounded-full"></span>
          <span className="block w-2 h-2 bg-white/30 rounded-full"></span>
        </div>
      </div>
    </div>
  )
}
