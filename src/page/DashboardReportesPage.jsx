import React from 'react'
import { CardReporte } from '../components/organismos/DashboardReportes/CardReporte'

export const DashboardReportesPage = () => {
  return (
    <div className='flex  flex-wrap w-[100%] h-full gap-5 overflow-y-auto'>
      <CardReporte/>
      <CardReporte/>
      <CardReporte/>
      <CardReporte/>
      <CardReporte/>



    </div>
  )
}
