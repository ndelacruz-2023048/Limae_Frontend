import React from 'react';
import { useNavigate } from 'react-router';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useFetchNotices } from '../../../../hooks/useFetchNotices';
import { useFetchReportes } from '../../../../hooks/useFetchReportes';
import { useFetchEstudiantes } from '../../../../hooks/useFetchEstudiantes';

export const ComponetsDashboardAdmin = () => {
  const navigate = useNavigate();
  const { notices } = useFetchNotices();
  const { reportes } = useFetchReportes();
  const { estudiantes } = useFetchEstudiantes();

  const ultimaNoticia = notices[0];
  const ultimasNoticias = notices.slice(0, 5);
  const ultimosReportes = reportes.slice(0, 5);
  const ultimosEstudiantes = estudiantes.slice(0, 5);

  const groupedByCountry = estudiantes.reduce((acc, estudiante) => {
    const academicCode = estudiante.academicCode || 'Desconocido';
    acc[academicCode] = (acc[academicCode] || 0) + 1;
    return acc;
  }, {});

  const studentData = Object.entries(groupedByCountry).map(([name, value]) => ({
    name,
    value,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
  }));

  return (
    <div className="bg-[#f3f3ff] min-h-screen p-4 md:p-6 space-y-6 text-gray-800">
      {/* Encabezado */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Última Noticia */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-gray-700">Última noticia</h2>
          {ultimaNoticia && (
            <div
              className="relative w-full overflow-hidden rounded-2xl shadow aspect-video cursor-pointer"
              onClick={() => navigate('/details-notice', { state: { post: ultimaNoticia } })}
            >
              <img
                src={ultimaNoticia.imagen || ultimaNoticia.fotografia || 'https://via.placeholder.com/600x400'}
                alt="noticia fondo"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-md p-4 md:p-6 m-4 rounded-xl shadow-md">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  {ultimaNoticia.titulo}
                </h3>
                <p className="text-sm text-gray-700 mt-1">{ultimaNoticia.entrada || ''}</p>
              </div>
            </div>
          )}
        </div>

        {/* Gráfico de Estudiantes */}
        <div className="bg-gradient-to-br from-white/80 via-purple-100/80 to-white/80 backdrop-blur-md rounded-2xl p-6 shadow">
          <h3 className="text-lg font-bold mb-4">Gráfica: código académico</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  label
                >
                  {studentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2 font-bold text-2xl">
            {estudiantes.length > 0 ? estudiantes.length : 'Sin datos'}
          </div>
          <p className="text-center text-sm text-gray-500">Estudiantes registrados</p>
        </div>
      </div>

      {/* Fila inferior */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-6">
        {/* Reportes */}
        <div
          className="bg-gradient-to-br from-white/80 via-yellow-100/60 to-white/80 backdrop-blur-md rounded-2xl p-6 shadow cursor-pointer"
          onClick={() => navigate('/dashboard-reportes')}
        >
          <h3 className="text-lg font-bold mb-4">Reporte de estudiantes</h3>
          <ul className="space-y-3">
            {ultimosReportes.map(r => (
              <li
                key={r._id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition shadow cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/detalle-reporte', { state: { reporte: r } });
                }}
              >
                <span className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full text-yellow-600 font-bold border-2 border-gray-200">
                  {r.numeroReporte?.slice(-2)}
                </span>
                <span className="font-medium text-gray-700 text-sm">{r.numeroReporte}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Noticias */}
        <div
          className="bg-gradient-to-br from-white/80 via-blue-100/60 to-white/80 backdrop-blur-md rounded-2xl p-6 shadow cursor-pointer"
          onClick={() => navigate('/notices')}
        >
          <h3 className="text-lg font-bold mb-4">Páginas de información</h3>
          <ul className="space-y-3">
            {ultimasNoticias.map(n => (
              <li
                key={n._id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition shadow cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/details-notice', { state: { post: n } });
                }}
              >
                <img
                  src={n.imagen || n.fotografia || 'https://via.placeholder.com/60x40'}
                  alt={n.titulo}
                  className="w-16 h-12 object-cover rounded"
                />
                <span className="text-gray-800 font-medium text-sm">{n.titulo}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Estudiantes */}
        <div className="bg-gradient-to-br from-white/80 via-pink-100/60 to-white/80 backdrop-blur-md rounded-2xl p-6 shadow">
          <h3 className="text-lg font-bold mb-4">Estudiantes</h3>
          <ul className="space-y-3">
            {ultimosEstudiantes.map(e => (
              <li
                key={e._id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition shadow"
              >
                <img
                  src={e.profilePicture || 'https://via.placeholder.com/40'}
                  alt={e.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{e.name} {e.surname}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
