import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from '../layout/Layout'
import { DetalleReporte } from '../page/DetalleReporte'
import { DashboardReportesPage } from '../page/DashboardReportesPage'
import { DashboardForm } from '../page/DashboardForms'

const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"/home",
                element:<h1>Home</h1>
            },
            {
                path:"/detalle-reporte",
                element:<DetalleReporte/>
            },
            {
                path:"/dashboard-reportes",
                element:<DashboardReportesPage/>
            },
            {
                path:"/dashboard-formulario",
                element:<DashboardForm/>
            }
        ]
    }
])


const MyRouter = ()=><RouterProvider router={router}/>

export default MyRouter