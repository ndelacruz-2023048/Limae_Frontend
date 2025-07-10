import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from '../layout/Layout'
import { DetalleReporte } from '../page/DetalleReporte'
import { DashboardReportesPage } from '../page/DashboardReportesPage'
import { LoginPage } from '../page/LoginPage'
import { ProtectedRoutes } from '../hooks/ProtectedRoutes'
import { RegisterPage } from '../page/RegisterPage'

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
        element: <div>404 not found</div>
    }
])


const MyRouter = ()=><RouterProvider router={router}/>

export default MyRouter