import React, { useEffect, useState } from "react";
import { UploadImage } from "../../moleculas/UploadImage/UploadImage";
import { obtenerUsuariosRequest, crearReporteRequest } from "../../../services/api";

export const ReportModal = ({ isOpen, onClose, usuarioActualId }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    descripcion: "",
    tipoDeReporte: "",
    usuarioQueRealizaraElSeguimiento: "",
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await obtenerUsuariosRequest();
        console.log("Respuesta de usuarios:", data);
        if (!data.error && Array.isArray(data.usuarios)) {
          setUsuarios(data.usuarios);
        } else {
          console.error("La respuesta no contiene un array de usuarios:", data);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const datos = {
      ...form,
      usuarioQueHizoElReporte: usuarioActualId,
    };

    const res = await crearReporteRequest(datos);

    if (!res.error) {
      console.log("Reporte creado:", res);
      onClose();
    } else {
      alert("Error al crear el reporte: " + res.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[60%] h-[50%] max-w-[1200px] flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl z-10"
        >
          ✕
        </button>

        {/* IZQUIERDA */}
        <div className="w-full lg:w-[50%] h-full bg-[#eeeeee] p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Formulario para Reporte de Violencia</h2>

          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción detallada del incidente..."
            className="w-full border rounded px-4 py-2 mb-4 resize-none"
            rows={4}
          />

          <div className="mt-4 h-[40%] border border-dashed border-gray-400 rounded-lg overflow-hidden">
            <UploadImage />
          </div>
        </div>

        {/* DERECHA */}
        <div className="w-full lg:w-[50%] h-full bg-white p-4 flex flex-col justify-between">
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4">
              <label className="block font-medium text-sm mb-6">Tipo de reporte</label>
              <select
                name="tipoDeReporte"
                value={form.tipoDeReporte}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Selecciona un tipo</option>
                <option value="AcosoVerbal">Acoso Verbal</option>
                <option value="ViolenciaEstudiantilContraDocentes">Violencia Estudiantil contra Docentes</option>
                <option value="ViolenciaSexual">Violencia Sexual</option>
                <option value="ViolenciaEscolarEstructural">Violencia Escolar Estructural</option>
                <option value="ViolenciaPorGenero">Violencia por Género</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-6">Asignar seguimiento a:</label>
              <select
                name="usuarioQueRealizaraElSeguimiento"
                value={form.usuarioQueRealizaraElSeguimiento}
                onChange={handleChange}
                className="w-full border rounded px-2 py-2"
              >
                <option value="">Seleccione un usuario</option>
                {usuarios.map((u) => (
                  <option key={u._id} value={u._id}>{u.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#edaa25] text-white px-4 py-2 rounded hover:bg-[#eda025]"
            >
              Crear Reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
