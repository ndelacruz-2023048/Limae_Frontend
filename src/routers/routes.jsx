import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from '../layout/Layout'
import { DetalleReporte } from '../page/DetalleReporte'
import { DashboardReportesPage } from '../page/DashboardReportesPage'
import { NoticeMainPage } from '../page/NoticeMainPage'
import { AddNoticePage } from '../page/AddNoticePage'
import { DetailsNoticePage } from '../page/DetailsNoticePage'
import { DashboardAdminPage } from '../page/DashboardAdminPage'
import { DashboardAlumnos } from '../components/organismos/Usuarios/DashboardAlumnos'
import EditNoticePage from '../page/EditNoticePage'
import { DashboardForm } from '../page/DashboardForms'
import { LoginPage } from '../page/LoginPage'
import { ProtectedRoutes } from '../hooks/ProtectedRoutes'
import { RegisterPage } from '../page/RegisterPage'
import { NotFound } from '../page/NotFund'
import NoticeListpage from '../page/NoticeListPage'

const router = createBrowserRouter([
    {
        path:"/",
        element:<ProtectedRoutes accesBy="authenticated"><Layout/></ProtectedRoutes>,
        children:[
            {
                index: true,
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
                path:"/dashboard-admin",
                element:<DashboardAdminPage/>
            },
            {
                path:"/dashboard-usuario",
                element: <DashboardAlumnos />
            },
            {
                path: "/edit-notice/:id",
                element: <EditNoticePage />
            },
            {
                path:"/dashboard-formulario",
                element:<DashboardForm />
            },
            {
                path: "/notice-list",
                element: <NoticeListpage />
            }
        ],
        errorElement:<h1>Error</h1>
    },
    {
        path: '/login',
        element: <ProtectedRoutes accesBy="non-authenticated"><LoginPage/></ProtectedRoutes>,
    },
    {
        path: '/register',
        element: <ProtectedRoutes accesBy="non-authenticated"><RegisterPage/></ProtectedRoutes>,
    },
    {
        path: '/*',
        element: <NotFound />
    }
])


const MyRouter = ()=><RouterProvider router={router}/>

export default MyRouter