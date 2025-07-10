import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

const apiReport = axios.create(
    {
        baseURL: `${API_URL}/api/v1/reportes`,
        timeout: 2000
    }
)

export const reportePorIdRequest = async(id)=>{
    try {
        const res = await apiReport.get(`/reportePorId/${id}`)
        return res.data
    } catch (error) {
        return{
            error: true,
            error
        }
    }
}

export const obtenerReportesRequest = async()=>{
    try {
        const res = await apiReport.get('/todosLosReportes')
        return res.data
    } catch (error) {
        return{
            error:true,
            error
        }
    }
}