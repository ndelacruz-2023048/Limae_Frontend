// DashboardAlumnos.jsx
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import './dashboardAlumnos.css'
import { obtenerReportesRequest, reportePorIdRequest } from '../../../services/api'
import { toast } from 'react-toastify'
import Carousel from './Carousel'

export const DashboardAlumnos = () => {
  const [ reportes, setReportes] = useState([])
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null)

  useEffect(()=>{
    const fetchReportes = async()=>{
      const res = await obtenerReportesRequest()
      if(!res.error){
        setReportes(res.reportes)
      }else{
        console.error('Error al cargar el reporte:', res.error)
        toast.error("Error al cargar reporte")
      }
    }

    fetchReportes()
  }, [])

  const handleClickReport = async (id)=>{
    const res = await reportePorIdRequest(id)
    if(!res.error){
      setReporteSeleccionado(res.reporte)
    }else{
      console.error('Error al cargar el reporte:', res.error)
      toast.error("Error al cargar reporte")
    }
  }

  return (
    <>
      {/* Carousel/banner superior */}
      <div className="w-full px-1 sm:px-2 pt-2 sm:pt-4">
        <NavLink to="/notices">
          <Carousel />
        </NavLink>
      </div>
      <div className="dashboard-alumnos-container flex flex-col md:flex-row gap-2 md:gap-0 w-full">
        <aside className="sidebar-reportes w-full md:w-1/4 lg:w-1/5 px-1 md:px-0 mb-4 md:mb-0">
          <h2 className="sidebar-title text-xl sm:text-2xl mb-2 text-center">Reportes</h2>
          <ul className="lista-reportes flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible">
            {reportes.map((reporte) => (
              <li
                key={reporte._id}
                className={`reporte-item min-w-[120px] md:min-w-0 text-gray-700 font-semibold text-base sm:text-lg text-center cursor-pointer hover:bg-yellow-100 transition flex items-center justify-center gap-2 sm:gap-3 px-2 py-2 rounded-md
                  ${reporteSeleccionado && reporteSeleccionado._id === reporte._id ? 'bg-gray-50' : ''}`}
                onClick={() => handleClickReport(reporte._id)}
              >
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1 sm:mr-2"></span>
                {reporte.numeroReporte}
              </li>
            ))}
          </ul>
        </aside>
        <main className="contenido-reporte flex-1 w-full min-h-[300px]">
          {reporteSeleccionado ? (
            <div className="card-nuevo-reporte">
              <button
                className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => setReporteSeleccionado(null)}
              >
                ← Regresar
              </button>
              <ol className="relative border-l-4 border-gray-200 ml-4">
                <li className="mb-10 ml-6">
                  <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-white border-4 border-blue-600 rounded-full"></span>
                  <div className="bg-white rounded-lg shadow p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-400 font-semibold uppercase">
                        {new Date(reporteSeleccionado.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-blue-600 font-bold">{reporteSeleccionado.numeroReporte}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Tipo de Reporte:</span> {reporteSeleccionado.tipoDeReporte}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Descripción:</span> {reporteSeleccionado.descripcion}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Usuario que hizo el reporte:</span>{' '}
                      {reporteSeleccionado.usuarioQueHizoElReporte?.name
                        ? `${reporteSeleccionado.usuarioQueHizoElReporte.name} ${reporteSeleccionado.usuarioQueHizoElReporte.surname}`
                        : reporteSeleccionado.usuarioQueHizoElReporte}
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Asignado a:</span>{' '}
                      {reporteSeleccionado.usuarioQueRealizaraElSeguimiento?.name
                        ? `${reporteSeleccionado.usuarioQueRealizaraElSeguimiento.name} ${reporteSeleccionado.usuarioQueRealizaraElSeguimiento.surname}`
                        : reporteSeleccionado.usuarioQueRealizaraElSeguimiento}
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          ) : (
            <div className="card-nuevo-reporte flex flex-col items-center justify-center h-full w-full py-24">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No files found"
                className="w-24 mb-6 opacity-70"
              />
              <h2 className="titulo-form text-2xl font-semibold mb-2 text-gray-700">No files found</h2>
              <p className="text-gray-500 mb-6 text-center">
                Tu búsqueda no coincide con ningún reporte.<br />
                Por favor selecciona uno o crea uno nuevo.
              </p>
              <div className="boton-nuevo-container">
                <button className="boton-nuevo-reporte px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => alert("Aquí iría el formulario")}>Crear nuevo reporte</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
