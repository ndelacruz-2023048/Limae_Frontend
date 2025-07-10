import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from '../layout/Layout'
import { DetalleReporte } from '../page/DetalleReporte'
import { DashboardReportesPage } from '../page/DashboardReportesPage'
import { NoticeMainPage } from '../page/NoticeMainPage'
import { AddNoticePage } from '../page/AddNoticePage'
import { DetailsNoticePage } from '../page/DetailsNoticePage'
import { DashboardAlumnos } from '../components/organismos/Usuarios/DashboardAlumnos'

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
                path:"/notices",
                element:<NoticeMainPage/>   
            },
            {
                path:"/add-notice",
                element:<AddNoticePage/>
            },
            {
                path:"/details-notice",
                element:<DetailsNoticePage/>
            },
            {
                path:"/dashboard-usuario",
                element: <DashboardAlumnos />
            }
        ]
    }
])


const MyRouter = ()=><RouterProvider router={router}/>

export default MyRouter