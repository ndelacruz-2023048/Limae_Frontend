import { NavLink, useNavigate } from "react-router";
import { useFetchNotices } from "../../../../hooks/useFetchNotices";

export const NoticeMain = () => {
  const navigate = useNavigate();
  const { notices, loading, error } = useFetchNotices();

  // Puedes seleccionar una noticia destacada si quieres, o dejar un objeto fijo
  // Aquí sólo pongo la primera como destacada (o null si no hay)
  const featuredPost = notices.length > 0 ? notices[0] : null;

  // El resto serán las otras noticias menos la destacada
  const otherPosts = notices.slice(1).map(n => n.titulo); // solo títulos para sidebar, por ejemplo

  // Para el listado principal, mostramos todas o las últimas (excepto la destacada)
  const recentPosts = notices.slice(1);

  if (loading) return <p>Cargando noticias...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!notices.length) return <p>No hay noticias disponibles.</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Featured Post & Sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Featured Post */}
          <div className="flex-1">
            {featuredPost && (
              <div className="rounded-xl overflow-hidden shadow-lg relative h-64 md:h-80">
                <img
                  src={featuredPost.imagen || featuredPost.fotografia || 'https://via.placeholder.com/600x400'}
                  alt={featuredPost.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                  {/* Si tienes categoría */}
                  {featuredPost.categoria && (
                    <span className="bg-white/80 text-xs px-2 py-1 rounded mb-2 w-fit">{featuredPost.categoria}</span>
                  )}
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">{featuredPost.titulo}</h2>
                </div>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="w-full md:w-80">
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-semibold text-lg mb-4">Otras noticias</h3>
              <ul className="space-y-3">
                {otherPosts.map((title, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-sm text-gray-700 hover:underline cursor-pointer">{title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Recent Posts */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold text-2xl">Noticias recientes</h3>
            <div className="flex gap-2">
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-300">Todas</button>
              <NavLink
                to="/add-notice"
                className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition"
              >
                Agregar noticia
              </NavLink>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-transform duration-200 border border-transparent hover:border-blue-400"
                onClick={() => navigate('/details-notice', { state: { post } })}
              >
                <img
                  src={post.imagen || post.fotografia || 'https://via.placeholder.com/400x300'}
                  alt={post.titulo}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">{post.titulo}</h4>
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{post.entrada || post.descripcion}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
                    <span className="font-medium">{post.autor}</span>
                    <span>•</span>
                    <span>{post.fecha}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
