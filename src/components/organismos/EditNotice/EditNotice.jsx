import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const EditNotice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, setValue } = useForm();

  const [previewImages, setPreviewImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [relatedItems, setRelatedItems] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [etiquetaInput, setEtiquetaInput] = useState('');

  useEffect(() => {
    const notice = location.state?.notice;

    if (!notice) {
      alert("❌ No se encontraron datos de la noticia.");
      return navigate('/notice-list');
    }

    const imagenPrincipal = notice.fotografia ? [notice.fotografia] : [];
    setPreviewImages(imagenPrincipal);

    if (notice.fotografia) {
      setRelatedItems([{ name: 'Imagen principal', image: notice.fotografia, file: null }]);
    }

    setValue('titulo', notice.titulo || '');
    setValue('entrada', notice.entrada || '');
    setValue('cuerpo', notice.cuerpo || '');
    setValue('autor', notice.autor || '');
    setValue('url', notice.url || '');

    const etiquetasIniciales = Array.isArray(notice.etiquetas)
      ? notice.etiquetas
      : (notice.etiquetas || '').split(',').map(e => e.trim()).filter(Boolean);
    setEtiquetas(etiquetasIniciales);

    setLoading(false);
  }, [location, navigate, setValue]);

  const handleAddEtiqueta = () => {
    const nueva = etiquetaInput.trim();
    if (nueva && !etiquetas.includes(nueva)) {
      setEtiquetas([...etiquetas, nueva]);
      setEtiquetaInput('');
    }
  };

  const handleRemoveEtiqueta = (etiqueta) => {
    setEtiquetas(etiquetas.filter((et) => et !== etiqueta));
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('entrada', data.entrada);
    formData.append('cuerpo', data.cuerpo);
    formData.append('autor', data.autor);
    formData.append('url', data.url);
    formData.append('etiquetas', etiquetas.join(','));

    const imagenNueva = relatedItems.find(item => item.file);
    if (imagenNueva?.file) {
      formData.append('fotografia', imagenNueva.file);
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/noticias/actualizarN/${id}`, {
        method: 'PUT',
        body: formData
      });

      const result = await response.json();
      console.log("Respuesta cruda del backend:", result);

      if (!response.ok || !result.success) {
        alert("❌ Error al actualizar la noticia");
        console.error(result.message || result.error);
      } else {
        alert("✅ Noticia actualizada correctamente");
        navigate("/notice-list");
      }
    } catch (error) {
      alert("❌ Error inesperado al actualizar");
      console.error(error);
    }
  };

  const handleAddRelatedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newImage = { name: file.name, image: imageUrl, file };
      setRelatedItems([...relatedItems, newImage]);
      setPreviewImages((prev) => [...prev, imageUrl]);
    }
  };

  const handleRemoveRelated = (index) => {
    setRelatedItems((prev) => {
      const isPrincipal = prev[index].name === 'Imagen principal';
      const hasNewImage = prev.some((item, idx) => idx !== index && item.file !== null);
      const isOnlyImage = prev.length === 1;

      if (isOnlyImage) {
        alert("❌ No puedes eliminar la única imagen.");
        return prev;
      }

      if (isPrincipal && !hasNewImage) {
        alert("❌ No puedes eliminar la imagen principal sin agregar una nueva.");
        return prev;
      }

      const imageToRemove = prev[index].image;
      setPreviewImages((prevImages) => prevImages.filter((img) => img !== imageToRemove));
      return prev.filter((_, i) => i !== index);
    });
  };

  if (loading) return <p className="p-10 text-lg">Cargando noticia...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-3 gap-6 bg-white rounded-xl shadow-lg p-6"
      >
        {/* Columna Izquierda */}
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Fotografía</h2>

          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            {previewImages.length > 0 ? (
              <>
                <img
                  src={previewImages[currentImage]}
                  alt={`Imagen ${currentImage + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setCurrentImage((prev) =>
                      prev === 0 ? previewImages.length - 1 : prev - 1
                    )
                  }
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentImage((prev) =>
                      prev === previewImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow"
                >
                  →
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No hay imágenes
              </div>
            )}
          </div>

          <div className="mt-6 bg-gray-50 rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-md font-semibold">Elementos relacionados</h3>
              <label className="cursor-pointer text-blue-500 text-xl font-bold hover:text-blue-700">
                +
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddRelatedImage}
                  className="hidden"
                />
              </label>
            </div>

            <ul className="space-y-2">
              {relatedItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-white p-2 rounded border hover:shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt="Relacionado"
                      className="w-10 h-10 object-cover rounded"
                    />
                    <p className="text-sm">{item.name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRelated(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded shadow"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Editar Noticia</h2>

          <input
            type="text"
            {...register('titulo', { required: true })}
            placeholder="Título"
            className="w-full border p-2 rounded"
          />

          <textarea
            {...register('entrada')}
            placeholder="Entrada"
            className="w-full border p-2 rounded h-20"
          />

          <textarea
            {...register('cuerpo')}
            placeholder="Cuerpo de la noticia"
            className="w-full border p-2 rounded h-32"
          />

          <input
            type="text"
            {...register('autor')}
            placeholder="Autor"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            {...register('url')}
            placeholder="URL relacionada"
            className="w-full border p-2 rounded"
          />

          {/* Etiquetas */}
          <div>
            <h2 className="text-md font-semibold">Etiquetas</h2>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {etiquetas.map((et, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {et}
                    <button
                      type="button"
                      onClick={() => handleRemoveEtiqueta(et)}
                      className="ml-1 text-blue-500 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={etiquetaInput}
                  onChange={(e) => setEtiquetaInput(e.target.value)}
                  placeholder="Agregar etiqueta"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={handleAddEtiqueta}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/notice-list')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Actualizar Noticia
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNotice;