import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL;

export const useReportStore = create((set) => ({
  reportes: [],
  // En ReportsStore.jsx, modifica temporalmente para debuggear:
fetchReports: async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/reportes/todosLosReportes`)
    const data = await response.json()
    console.log("API Response:", data) // ← Agrega esto
    
    // Verifica si los reportes vienen en data.reportes o directamente en data
    const reportesArray = Array.isArray(data.reportes) ? data.reportes : 
                         Array.isArray(data) ? data : []
    
    set({ reportes: reportesArray })
    return reportesArray
  } catch (error) {
    console.error("Error fetching reports:", error)
    return []
  }
}
}))