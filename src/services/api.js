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

export const crearReporteRequest = async (datos) => {
    try {
        const res = await apiReport.post('/agregar', datos);
        return res.data;
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};

const apiUsuario = axios.create({
    baseURL: `${API_URL}/api/v1/usuarios`,
    timeout: 2000,
});
  
  export const obtenerUsuariosRequest = async () => {
    try {
        const res = await apiUsuario.get('/');
        return res.data;
    } catch (error) {
        return {
            error: true,
            error
        };
    }
};