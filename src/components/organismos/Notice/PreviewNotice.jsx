import React from 'react'
import { useUploadImageStore } from '../../../stores/UploadImageStore'
import dayjs from 'dayjs'

export const PreviewNotice = ({title,entrada,cuerpo,autor,fecha}) => {
  const {dataImageFile,urlImageFile} = useUploadImageStore()

  return (
    <div className="flex bg-white rounded-xl shadow-lg overflow-hidden  border border-blue-200">
      {/* Left: Text Content */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
        <div>
          <div className="text-teal-500 font-semibold text-xs mb-2">{autor||"RUSSIA"}</div>
          <div className="text-gray-400 text-xs mb-4">{fecha ? dayjs(fecha).format('D MMM, YYYY').toUpperCase() : "8 OCT, 2025"}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight break-words">
            {title || "Moscow is among world's best Christmas markets"}
          </h2>
          <div className="bg-orange-100 border-l-4 border-orange-400 text-orange-700 p-3 mb-4 text-sm">
            <span className=" break-words">{entrada || "The Telegraph named world's 10 best Christmas markets – and Moscow was included on the list."}</span>
          </div>
          <p className="text-gray-700 text-sm mb-4 break-words">
            {cuerpo || "Rating’s authors were impressed by glowing festive installations, aromatic mulled wine, gingerbread with crispy glaze and crêpes with caviar. Besides, you can shop nice handmade presents and souvenirs, participate in various workshops and plunge into bright Christmas atmosphere."}
          </p>
        </div>
      </div>
      {/* Right: Image & Overlay */}
      <div className="relative w-1/2 hidden md:block">
        <img
          src={urlImageFile || "https://res.cloudinary.com/dtmwybty7/image/upload/v1752187459/WhatsApp-Image-2023-01-30-at-12.02.59-PM_b1jlfu.webp"}
          alt="Red Square"
          className="object-cover h-full w-full"
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
    </div>
  )
}
