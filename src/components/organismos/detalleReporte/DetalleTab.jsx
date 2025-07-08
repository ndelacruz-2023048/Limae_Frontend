import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

export const DetalleTab = () => {
  return (
    <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700">
        <Icon icon="mdi:book-outline" className="w-5 h-5" />
        <span>Tipo de Violencia: Bullying</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
        <Icon icon="qlementine-icons:education-16" className="w-5 h-5" />
        <span>Nivel: Basicos</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
        <Icon icon="fluent:notebook-section-24-regular" className="w-5 h-5" />
        <span>Sección:B</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
        <Icon icon="iconoir:clock" className="w-5 h-5 text-yellow-600" />
        <span>Desde hace 5 dias 3 horas fue creado el reporte</span>
        </div>
    </div>
  )
}
