import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { DetalleTab } from '../components/organismos/detalleReporte/DetalleTab'
import { AvancesTab } from '../components/organismos/detalleReporte/AvancesTab'
import { ComentariosTab } from '../components/organismos/detalleReporte/ComentariosTab'

export const DetalleReporte = () => {
  const [activeTab, setActiveTab] = useState('details')

  return (
    <div className='flex justify-center bg-[#f1f7fc] rounded-2xl w-full h-full'>
      <div className="p-6 w-[90%] mx-auto">
        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 mr-1 rounded-full bg-green-400"></span>
            Published
          </span>
        </div>

        {/* Title & Image Section */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Reporte #45</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <Icon icon="mdi:file-document-outline" className="w-5 h-5" />
                Bullying
              </span>
              <span className="flex items-center gap-1">
                <Icon icon="qlementine-icons:education-16" className="w-5 h-5" />
                Basicos
              </span>
            </div>
          </div>
          <div className="ml-4">
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              alt="Imagen del Reporte"
              className="rounded-lg shadow-md object-cover w-[300px] h-[90px]"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span>Creado por</span>
          <span className="font-medium">Bagus Fikri</span>
          <span>el 26 Sep 2023</span>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-700">
            Discover the foundations of User Interface and User Experience design, equipping
            yourself with essential knowledge, tools, and methodologies to create seamless and
            user-friendly digital experiences. This comprehensive course delves...
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-6">
            <button 
              onClick={() => setActiveTab('details')}
              className={`pb-2 font-medium ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Detalle
            </button>
            <button 
              onClick={() => setActiveTab('discussion')}
              className={`pb-2 ${activeTab === 'discussion' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Comentarios
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'details' && (
          <DetalleTab/>
        )}
        {activeTab === 'report' && (
          <AvancesTab/>
        )}
        {activeTab === 'discussion' && (
          <ComentariosTab/>
        )}
      </div>
    </div>
  )
}
