import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditNotice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Simula valores de una noticia
  setValue('titulo', 'Noticia de ejemplo');
  setValue('entrada', 'Esta es la entrada...');
  setValue('cuerpo', 'Contenido completo de la noticia...');
  setValue('autor', 'Marcos Pamal');
  setValue('url', 'https://ejemplo.com');
  setValue('etiquetas', 'educación, noticias');
  setPreviewImage('https://thumbs.dreamstime.com/b/ultima-hora-noticias-de-%C3%BAltima-espa%C3%B1ol-mapa-del-mundo-ingl%C3%A9s-fondo-en-segundo-plano-d-ilustraci%C3%B3n-222184600.jpg'); // Imagen temporal
  setLoading(false); // 🔥 Esto era lo que faltaba
}, [setValue]);

  /* useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`http://localhost:3200/obtenerN/${id}`);
        const data = res.data;

        setValue('titulo', data.titulo);
        setValue('entrada', data.entrada);
        setValue('cuerpo', data.cuerpo);
        setValue('autor', data.autor);
        setValue('url', data.url);
        setValue('etiquetas', data.etiquetas.join(', '));
        setPreviewImage(data.fotografia);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la noticia', error);
      }
    };
    fetchNotice();
  }, [id, setValue]); */

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('entrada', data.entrada);
    formData.append('cuerpo', data.cuerpo);
    formData.append('autor', data.autor);
    formData.append('url', data.url);
    formData.append('etiquetas', data.etiquetas);
    if (data.fotografia[0]) {
      formData.append('fotografia', data.fotografia[0]);
    }

    try {
      await axios.put(`http://localhost:3200/actualizarN/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/noticias');
    } catch (error) {
      console.error('Error al actualizar la noticia', error);
    }
  };

  if (loading) return <p>Cargando noticia...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-lg">
      <div>
        <h2 className="text-xl font-semibold mb-4">Vista previa de la imagen</h2>
        {previewImage && <img src={previewImage} alt="Preview" className="rounded-lg w-full h-auto mb-4" />}
        <input type="file" {...register('fotografia')} className="w-full border p-2 rounded" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Editar noticia</h2>

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
          className="w-full border p-2 rounded h-40"
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

        <input
          type="text"
          {...register('etiquetas')}
          placeholder="Etiquetas separadas por coma"
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Actualizar Noticia
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditNotice;