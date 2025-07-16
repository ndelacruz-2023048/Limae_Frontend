import { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

const API_URL = import.meta.env.VITE_API_URL;

dayjs.extend(relativeTime);
dayjs.locale("es");

export const NoticeList = () => {
  const [noticias, setNoticias] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/noticias/obtenerN`);
        const data = await res.json();
        if (res.ok) {
          const reversed = data.noticias.reverse();
          setNoticias(reversed);
          setRecentPosts(
            reversed.slice(0, 5).map((n) => ({
              id: n._id,
              title: n.titulo,
              author: n.autor || "@desconocido",
              link: n.url || "#",
              image: n.fotografia || null,
            }))
          );
        } else {
          console.error("❌ Error al obtener noticias:", data.message);
        }
      } catch (error) {
        console.error("❌ Error de red al obtener noticias:", error);
      }
    };

    fetchNoticias();
  }, []);

  const handleClear = () => {
    setRecentPosts([]);
  };

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm("¿Seguro que quieres eliminar esta noticia?");
    if (!confirmacion) return;

    try {
      const res = await fetch(`${API_URL}/api/v1/noticias/eliminarN/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setNoticias((prev) => prev.filter((n) => n._id !== id));
        setRecentPosts((prev) => prev.filter((r) => r.id !== id));
      } else {
        console.error("❌ Error al eliminar:", data.message);
      }
    } catch (error) {
      console.error("❌ Error de red al eliminar:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full px-4 py-6">
      {/* Noticias (columna izquierda) */}
      <div className="w-full md:w-[70%] space-y-6 border-b md:border-b-0 md:border-r pb-6 md:pb-0 md:pr-4">
        {noticias.map((notice) => (
          <div
            key={notice._id}
            className="bg-white p-4 rounded shadow relative hover:shadow-md transition"
          >
            {/* Menú de opciones */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() =>
                  setMenuOpenId(menuOpenId === notice._id ? null : notice._id)
                }
              >
                <MoreVertical className="text-gray-500 hover:text-black" />
              </button>
              {menuOpenId === notice._id && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-30">
                  <button
                    className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                    onClick={() =>
                      navigate(`/edit-notice/${notice._id}`, { state: { notice } })
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="w-full px-4 py-2 hover:bg-gray-100 text-left text-red-500"
                    onClick={() => handleEliminar(notice._id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              {notice.fotografia && (
                <img
                  src={notice.fotografia}
                  alt="notice"
                  className="w-full sm:w-28 sm:h-28 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <div className="flex text-sm text-gray-500 mb-1 flex-wrap gap-2">
                  <span>{notice.autor || "@desconocido"}</span>
                  <span className="ml-auto">{dayjs(notice.createdAt).fromNow()}</span>
                </div>
                <a className="text-lg font-semibold text-blue-700 hover:underline break-words">
                  {notice.titulo}
                </a>
                <p className="text-sm mt-2 text-gray-700 break-words">{notice.entrada}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Noticias recientes (columna derecha) */}
      <div className="w-full md:w-[30%] bg-white rounded p-4 shadow h-fit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Noticias Recientes</h2>
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={handleClear}
          >
            Limpiar
          </button>
        </div>
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.id} className="flex items-start gap-3">
              {post.image ? (
                <img
                  src={post.image}
                  alt="preview"
                  className="w-10 h-10 object-cover rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
              )}
              <div className="flex-1 min-w-0">
                <a
                  href={post.link}
                  className="text-sm font-semibold text-blue-700 hover:underline break-words"
                >
                  {post.title}
                </a>
                <p className="text-xs text-gray-500 truncate">{post.author}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
