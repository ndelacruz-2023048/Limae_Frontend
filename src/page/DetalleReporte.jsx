import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { DetalleTab } from '../components/organismos/detalleReporte/DetalleTab'
import { AvancesTab } from '../components/organismos/detalleReporte/AvancesTab'
import { ComentariosTab } from '../components/organismos/detalleReporte/ComentariosTab'
import { useReportStore } from '../stores/ReportsStore'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

export const DetalleReporte = () => {
  const { reporteId } = useParams()
  const { reportes, fetchReports } = useReportStore()
  const [activeTab, setActiveTab] = useState('details')
  const [reporte, setReporte] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const loadReporte = async () => {
    try {
      setLoading(true)
      
      // Opción 1: Si ya tienes todos los reportes en el store
      if (reportes.length > 0) {
        const foundReporte = reportes.find(r => r.numeroReporte === reporteId)
        setReporte(foundReporte || null)
      } 
      // Opción 2: Si prefieres cargar solo el reporte específico
      else {
        const response = await fetch(`${API_URL}/api/v1/reportes/${reporteId}`)
        const data = await response.json()
        setReporte(data.reporte || null)
      }
    } catch (error) {
      console.error("Error loading report:", error)
    } finally {
      setLoading(false)
    }
  }

    loadReporte()
  }, [reporteId, reportes])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Cargando...</div>
  }

  if (!reporte) {
    return <div className="flex justify-center items-center h-64">Reporte no encontrado</div>
  }

  // Calcula la duración desde que se creó el reporte
  const calculateDuration = () => {
    const start = dayjs(reporte.createdAt)
    const end = dayjs()
    const diffMs = end.diff(start)
    const dur = dayjs.duration(diffMs)
    const days = Math.floor(dur.asDays())
    const hours = dur.hours()
    return `${days} días, ${hours} horas`
  }

  return (
    <div className='flex justify-center bg-[#f1f7fc] rounded-2xl w-full h-full'>
      <div className="p-6 w-[90%] mx-auto">
        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 mr-1 rounded-full bg-green-400"></span>
            Activo
          </span>
        </div>

        {/* Title & Image Section */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Reporte #{reporte.numeroReporte}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <Icon icon="mdi:file-document-outline" className="w-5 h-5" />
                {reporte.tipoDeReporte}
              </span>
              <span className="flex items-center gap-1">
                <Icon icon="qlementine-icons:education-16" className="w-5 h-5" />
                {reporte.usuarioQueHizoElReporte?.academicCode || 'Básicos'}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <img
              src={reporte.image || 'https://randomuser.me/api/portraits/men/44.jpg'}
              alt="Imagen del Reporte"
              className="rounded-lg shadow-md object-cover w-[300px] h-[90px]"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span>Creado por</span>
          <span className="font-medium">
            {reporte.usuarioQueHizoElReporte?.name || 'Usuario desconocido'}
          </span>
          <span>el {dayjs(reporte.createdAt).format('D MMM YYYY')}</span>
        </div>

        {/* Description - Puedes agregar un campo 'descripcion' en tus reportes si es necesario */}
        <div className="mb-8">
          <p className="text-gray-700">
            {reporte.descripcion || 'No hay descripción disponible para este reporte.'}
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
              onClick={() => setActiveTab('report')}
              className={`pb-2 ${activeTab === 'report' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Avances
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
          <DetalleTab 
            tipoDeReporte={reporte.tipoDeReporte}
            nivel="Básicos" // Puedes hacerlo dinámico si lo tienes en los datos
            seccion={reporte.usuarioQueHizoElReporte?.academicCode}
            duracion={calculateDuration()}
          />
        )}
        {activeTab === 'report' && (
          <AvancesTab reporteId={reporteId} />
        )}
        {activeTab === 'discussion' && (
          <ComentariosTab reporteId={reporteId} />
        )}
      </div>
    </div>
  )
}