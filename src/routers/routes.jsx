import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from '../layout/Layout'
import { DetalleReporte } from '../page/DetalleReporte'
import { DashboardReportesPage } from '../page/DashboardReportesPage'
import { DashboardAdminPage } from '../page/DashboardAdminPage'

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
                path:"/dashboard-admin",
                element:<DashboardAdminPage/>
            }
        ]
    }
])


const MyRouter = ()=><RouterProvider router={router}/>

export default MyRouter