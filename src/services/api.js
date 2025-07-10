import axios from "axios";

const apiReport = axios.create(
    {
        baseURL: 'http://localhost:3660/api/v1/reportes',
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