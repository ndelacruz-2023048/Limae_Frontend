// DashboardAlumnos.jsx
import React, { useEffect, useState } from 'react'
import './dashboardAlumnos.css'
import { obtenerReportesRequest, reportePorIdRequest } from '../../../services/api'
import { toast } from 'react-toastify'

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
    <div className="dashboard-alumnos-container">
      <aside className="sidebar-reportes">
        <h2 className="sidebar-title">Reportes</h2>
        <ul className="lista-reportes">
          {reportes.map((reporte) => (
            <li
              key={reporte._id}
              className="reporte-item"
              onClick={() => handleClickReport(reporte._id)}
            >
              {reporte.numeroReporte}
            </li>
          ))}
        </ul>
      </aside>

      <main className="contenido-reporte">
        {reporteSeleccionado ? (
          <div className="card-nuevo-reporte">
            <h2 className="titulo-form">{reporteSeleccionado.numeroReporte}</h2>

            <div className="mb-3">
              <p><strong>Tipo de Reporte:</strong> {reporteSeleccionado.tipoDeReporte}</p>
            </div>

            <div className="mb-3">
              <p><strong>Descripción:</strong></p>
              <p>{reporteSeleccionado.descripcion}</p>
            </div>

            <div className="mb-3">
              <p><strong>Usuario que hizo el reporte:</strong> {
                reporteSeleccionado.usuarioQueHizoElReporte?.name
                  ? `${reporteSeleccionado.usuarioQueHizoElReporte.name} ${reporteSeleccionado.usuarioQueHizoElReporte.surname}`
                  : reporteSeleccionado.usuarioQueHizoElReporte
              }</p>
            </div>

            <div className="mb-3">
              <p><strong>Asignado a:</strong> {
                reporteSeleccionado.usuarioQueRealizaraElSeguimiento?.name
                  ? `${reporteSeleccionado.usuarioQueRealizaraElSeguimiento.name} ${reporteSeleccionado.usuarioQueRealizaraElSeguimiento.surname}`
                  : reporteSeleccionado.usuarioQueRealizaraElSeguimiento
              }</p>
            </div>

            <div className="mb-3">
              <p><strong>Fecha de creación:</strong> {new Date(reporteSeleccionado.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ) : (
          <div className="card-nuevo-reporte">
            <h2 className="titulo-form">Nuevo Reporte</h2>
            <div className="boton-nuevo-container">
              <button className="boton-nuevo-reporte" onClick={() => alert("Aquí iría el formulario")}>
              Crear nuevo reporte
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
