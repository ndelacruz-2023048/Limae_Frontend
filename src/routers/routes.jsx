import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from '../layout/Layout'
import { DetalleReporte } from '../page/DetalleReporte'
import { DashboardReportesPage } from '../page/DashboardReportesPage'
import { NoticeMainPage } from '../page/NoticeMainPage'
import { AddNoticePage } from '../page/AddNoticePage'
import { DetailsNoticePage } from '../page/DetailsNoticePage'
import { DashboardAlumnos } from '../components/organismos/Usuarios/DashboardAlumnos'
import EditNoticePage from '../page/EditNoticePage'
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
            },
            {
                path: "/edit-notice",
                element: <EditNoticePage />
            }
            {
                path:"/dashboard-formulario",
                element:<DashboardForm/>
            }
        ]
    }
])


const MyRouter = ()=><RouterProvider router={router}/>

export default MyRouter