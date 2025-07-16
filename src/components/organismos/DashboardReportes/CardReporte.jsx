import React from 'react'
import { Icon } from '@iconify/react'
import { GenerateInitialsAvatar } from '../../../utils/Avatar'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

export const CardReporte = ({numeroReporte,tipoDeReporte,seccion,profesor,alumno,image,createdAt}) => {
  return (
    <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] min-h-[400px] max-h-[500px] bg-white rounded-3xl shadow-lg p-3 sm:p-6 md:p-8 relative overflow-visible mx-auto">

      {/* Perfil y datos principales */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Foto de perfil */}
        <img src={image}alt="profile" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-xl text-gray-900">{numeroReporte}</h2>
            <span className="ml-2 flex items-center gap-1">
              <Icon icon="twemoji:flag-guatemala" className="w-5 h-5" />
              <span className="text-sm text-gray-500"> Nivel Basico</span>
            </span>
          </div>
          <ul className="text-sm text-gray-500 mt-1 list-disc ml-5">
            <li>{tipoDeReporte}</li>
          </ul>
        </div>
      </div>
      {/* Datos secundarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-xs text-gray-500 w-full">
        <div className="min-w-0">
          <div className="font-semibold text-gray-400 whitespace-nowrap">Tipo de Violencia</div>
          <div className="text-gray-700 break-words truncate max-w-[120px] md:max-w-[150px]" title={tipoDeReporte}>{tipoDeReporte}</div>
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-gray-400 whitespace-nowrap">Grado</div>
          <div className="text-gray-700 break-words truncate max-w-[120px] md:max-w-[150px]">Básicos</div>
        </div>
        <div className="min-w-0">
        <div className="font-semibold text-gray-400">Sección</div>
        <div className="text-gray-700 break-words truncate max-w-[120px] md:max-w-[150px]">{seccion}</div>
        </div>
        <div className="min-w-0">
        <div className="font-semibold text-gray-400">Orientador</div>
          <div className="flex items-center gap-2 mt-1">
            <GenerateInitialsAvatar name={profesor?.name} surname={profesor?.surname}/>
            <span className="text-gray-700 truncate max-w-[80px] md:max-w-[100px]">{profesor?.name}</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-gray-400 whitespace-nowrap">Creado</div>
          <div className="text-gray-700 truncate max-w-[120px] md:max-w-[150px]">{createdAt ? dayjs(createdAt).format('DD MMM, YYYY') : "Aug 7, 2024"}</div>
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-gray-400 whitespace-nowrap">Duración</div>
          <div className="text-gray-700 truncate max-w-[120px] md:max-w-[150px]">
            {createdAt ? (() => {
              const start = dayjs(createdAt);
              const end = dayjs();
              const diffMs = end.diff(start);
              const dur = dayjs.duration(diffMs);
              const days = Math.floor(dur.asDays());
              const hours = dur.hours();
              return `${days} días, ${hours} horas`;
            })() : '0 días, 0 horas'}
          </div>
        </div>
      </div>
      {/* Tabla de servicios */}
      {/*<div className="mt-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-blue-100 text-blue-600 rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">4</div>
          <span className="font-semibold text-gray-700">Services</span>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-3 bg-gray-50 text-xs text-gray-400 font-semibold py-2 px-4">
            <div> </div>
            <div>Ultima actualización</div>
            <div className="text-center">Tema</div>
          </div>

          <div className="grid grid-cols-3 items-center py-3 px-4">
            <div className="font-semibold text-gray-700">I-765</div>
            <div className="text-gray-500">Aug 11, 2024</div>
            <div className="flex justify-end">
              <div className="flex items-center w-full justify-between">
                <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-xl flex items-center px-4 py-2 w-56 justify-between">
                  <span className="text-pink-900 text-xs font-medium">Comentarios</span>
                  <span className="ml-3 flex items-center justify-center w-7 h-7 rounded-full bg-white text-pink-700 font-bold text-sm shadow">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  )
}
