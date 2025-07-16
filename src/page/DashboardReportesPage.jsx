import React from 'react'
import { CardReporte } from '../components/organismos/DashboardReportes/CardReporte'
import { useQuery } from '@tanstack/react-query'
import { useReportStore } from '../stores/ReportsStore'

export const DashboardReportesPage = () => {
  const {fetchReports} = useReportStore()
  const {isLoading,data} = useQuery({queryKey:["listReports"],queryFn:fetchReports})
  
  if(isLoading){
    return <h1>Loading...</h1>
  }
  console.log(data);
  
  return (
    <div className='flex  flex-wrap w-[100%] h-full gap-5 overflow-y-auto'>
      {data?.reportes?.map((element,index)=>(
        <CardReporte 
          numeroReporte={element?.numeroReporte}
          tipoDeReporte={element?.tipoDeReporte}
          seccion={element?.usuarioQueHizoElReporte?.academicCode}
          profesor={element?.usuarioQueRealizaraElSeguimiento}
          alumno={element?.usuarioQueHizoElReporte}
          createdAt={element?.createdAt}
          image={element?.image}
        />
      ))}



    </div>
  )
}
