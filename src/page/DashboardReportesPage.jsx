import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { CardReporte } from '../components/organismos/DashboardReportes/CardReporte';
import { useQuery } from '@tanstack/react-query';
import { useReportStore } from '../stores/ReportsStore';

export const DashboardReportesPage = () => {
  const navigate = useNavigate();
  const { fetchReports } = useReportStore();
  const { isLoading, data } = useQuery({ 
    queryKey: ["listReports"], 
    queryFn: fetchReports 
  });

  console.log("Datos recibidos:", data); // ← Agrega para debug

  const handleCardClick = (reporteId) => {
    navigate(`/detalle-reporte/${reporteId}`);
  };

  if (isLoading) return <h1>Loading...</h1>;

  // Verifica si data.reportes existe, si no usa data directamente
  const reportesToShow = data?.reportes || data || [];

  return (
    <div className='flex flex-wrap w-[100%] h-full gap-5 overflow-y-auto'>
      {reportesToShow.map((element) => (
        <CardReporte 
          key={`reporte-${element.numeroReporte || element.id}`}
          numeroReporte={element.numeroReporte}
          tipoDeReporte={element.tipoDeReporte}
          seccion={element.usuarioQueHizoElReporte?.academicCode}
          profesor={element.usuarioQueRealizaraElSeguimiento}
          alumno={element.usuarioQueHizoElReporte}
          createdAt={element.createdAt}
          image={element.image}
          onClick={() => handleCardClick(element.numeroReporte)}
        />
      ))}
    </div>
  );
};