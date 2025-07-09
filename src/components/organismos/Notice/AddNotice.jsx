import { useNavigate } from 'react-router-dom';
import { useNotice } from '../../../../hooks/useNotice';

export const AddNotice = () => {
  const navigate = useNavigate();
  const {
    form,
    file,
    etiquetaInput,
    fileInputRef,
    handleChange,
    handleFileChange,
    handleAddEtiqueta,
    handleRemoveEtiqueta,
    handleSubmit,
    setEtiquetaInput,
  } = useNotice(navigate);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-1 bg-blue-500"></div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Título</h2>
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={form.titulo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Entrada */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Entrada</h2>
            <input
              type="text"
              name="entrada"
              placeholder="Resumen breve..."
              value={form.entrada}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Cuerpo */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Cuerpo</h2>
            <textarea
              name="cuerpo"
              placeholder="Contenido completo de la noticia..."
              value={form.cuerpo}
              onChange={handleChange}
              rows={6}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Autor */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Autor</h2>
            <input
              type="text"
              name="autor"
              placeholder="Nombre del autor"
              value={form.autor}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Fecha */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Fecha</h2>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">URL</h2>
            <input
              type="url"
              name="url"
              placeholder="https://..."
              value={form.url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Etiquetas */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Etiquetas</h2>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {form.etiquetas.map((et, idx) => (
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

          {/* Fotografía */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">Fotografía</h2>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              {file ? (
                <p className="text-blue-500 font-medium">{file.name}</p>
              ) : (
                <>
                  <p className="text-gray-600 mb-1">Haz clic para seleccionar imagen</p>
                  <p className="text-sm text-gray-500">PNG, JPG (máx. 5MB)</p>
                </>
              )}
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Agregar Noticia
          </button>
        </form>
      </div>
    </div>
  );
};
