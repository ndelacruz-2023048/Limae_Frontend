import React from 'react';
import { useNavigate } from 'react-router';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const studentData = [
  { name: 'Spanish', value: 40, color: '#facc15' },
  { name: 'France', value: 30, color: '#60a5fa' },
  { name: 'Singapore', value: 30, color: '#f472b6' },
];

const reportes = [
  { id: 1, title: 'Asistencia del mes', img: 'https://via.placeholder.com/40' },
  { id: 2, title: 'Participación en clase', img: 'https://via.placeholder.com/40' },
  { id: 3, title: 'Notas finales', img: 'https://via.placeholder.com/40' },
  { id: 4, title: 'Actividades extracurriculares', img: 'https://via.placeholder.com/40' },
  { id: 5, title: 'Evaluaciones pendientes', img: 'https://via.placeholder.com/40' },
];

const noticias = [
  { id: 1, title: 'Nuevo horario de clases' },
  { id: 2, title: 'Reunión de padres' },
  { id: 3, title: 'Fiesta escolar' },
  { id: 4, title: 'Actualización de plataforma' },
  { id: 5, title: 'Exámenes finales' },
];

const estudiantes = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', img: 'https://via.placeholder.com/40' },
  { id: 2, nombre: 'María', apellido: 'López', img: 'https://via.placeholder.com/40' },
  { id: 3, nombre: 'Carlos', apellido: 'Ramírez', img: 'https://via.placeholder.com/40' },
  { id: 4, nombre: 'Ana', apellido: 'Martínez', img: 'https://via.placeholder.com/40' },
  { id: 5, nombre: 'Luis', apellido: 'García', img: 'https://via.placeholder.com/40' },
];

export const ComponetsDashboardAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f3f3ff] min-h-screen p-6 space-y-6 text-gray-800">
      {/* Encabezado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Componente 1: Última Noticia con contenedores separados */}
        <div className="lg:col-span-2 space-y-3">
          <div className="px-2">
            <h2 className="text-2xl font-bold text-gray-700">Classes Details</h2>
          </div>
          <div className="relative mx-auto overflow-hidden rounded-2xl shadow h-[90%] w-[90%]">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/009/273/280/small/concept-of-loneliness-and-disappointment-in-love-sad-man-sitting-element-of-the-picture-is-decorated-by-nasa-free-photo.jpg"
              alt="noticia fondo"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-md p-6 m-4 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold">Welcome to Miss Isabelle's classroom Hub</h3>
              <p className="text-sm text-gray-700">Grade 6 - Section B</p>
            </div>
          </div>
        </div>

        {/* Componente 3: Students Summary */}
        <div className="bg-gradient-to-br from-white/80 via-purple-100/80 to-white/80 backdrop-blur-md rounded-2xl p-6 shadow">
          <h3 className="text-lg font-bold mb-4">Students Summary</h3>
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
                  fill="#8884d8"
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
          <div className="text-center mt-2 font-bold text-2xl">350</div>
          <p className="text-center text-sm text-gray-500">Excellent</p>
        </div>
      </div>

      {/* Fila inferior de 4 componentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Componente 2.1: Reporte de estudiantes */}
        <div
          className="bg-gradient-to-br from-white/80 via-yellow-100/60 to-white/80 backdrop-blur-md rounded-2xl p-6 shadow cursor-pointer"
          onClick={() => navigate('/dashboard-reportes')}
        >
          <h3 className="text-lg font-bold mb-4">Reporte de estudiantes</h3>
          <ul className="space-y-3">
            {reportes.map(r => (
              <li
                key={r.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition shadow cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/detalle-reporte');
                }}
              >
                <img src={r.img} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
                <span className="font-medium text-gray-700">{r.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Componente 2.2: Páginas de información */}
        <div
          className="bg-gradient-to-br from-white/80 via-blue-100/60 to-white/80 backdrop-blur-md rounded-2xl p-6 shadow cursor-pointer"
          onClick={() => navigate('/notices')}
        >
          <h3 className="text-lg font-bold mb-4">Páginas de información</h3>
          <ul className="space-y-3">
            {noticias.map(n => (
              <li key={n.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition shadow cursor-pointer">
                {n.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Componente 2.3: Estudiantes */}
        <div className="bg-gradient-to-br from-white/80 via-pink-100/60 to-white/80 backdrop-blur-md rounded-2xl p-6 shadow">
          <h3 className="text-lg font-bold mb-4">Estudiantes</h3>
          <ul className="space-y-3">
            {estudiantes.map(e => (
              <li key={e.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/30 hover:bg-white/50 transition shadow">
                <img src={e.img} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
                <div>
                  <p className="font-semibold text-gray-800">{e.nombre} {e.apellido}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
