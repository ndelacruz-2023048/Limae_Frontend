import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL;

export const useReportStore = create((set)=>({
    reportes:[],
    fetchReports:async()=>{
        try {
            const response = await fetch(`${API_URL}/api/v1/reportes/todosLosReportes`)
            const data = await response.json()
            console.log(data);
            
            set({reportes:data})
            return data
        } catch (error) {
            console.log("Error fetching hotels by id", error);
        }
    }
}))