import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { UploadImage } from "../../moleculas/UploadImage/UploadImage";

export const ReportModal = ({ isOpen, onClose, usuarioActualId }) => {
  const [form, setForm] = useState({
    numeroReporte: "",
    descripcion: "",
    tipoDeReporte: "",
    usuarioQueRealizaraElSeguimiento: "", // Esto puede ser un ID
  });

  // Simulación de usuarios (esto vendrá luego desde el backend)
  const usuariosSimulados = [
    { _id: "1", nombre: "Rafael Hernández" },
    { _id: "2", nombre: "Ana López" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const datos = {
      ...form,
      usuarioQueHizoElReporte: usuarioActualId, // Este se pasa por props
    };
    console.log("Datos a guardar:", datos);
    // Aquí irá el axios.post más adelante
    onClose();
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
            className="w-full border rounded px-4 py-2 mb-4"
            rows={4}
          />

          <UploadImage/>
        </div>
  
        {/* DERECHA */}
        <div className="w-full lg:w-[50%] h-full bg-white p-4 overflow-y-auto space-y-4">
          <div>
            <label className="block font-medium text-sm mb-1">Tipo de reporte</label>
            <select
              name="tipoDeReporte"
              value={form.tipoDeReporte}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 mb-4"
            >
              <option value="">Selecciona un tipo</option>
              <option value="AcosoVerbal">Acoso Verbal</option>
              <option value="ViolenciaEstudiantilContraDocentes">Violencia Estudiantil contra Docentes</option>
              <option value="ViolenciaSexual">Violencia Sexual</option>
              <option value="ViolenciaEscolarEstructural">Violencia Escolar Estructural</option>
              <option value="ViolenciaPorGenero">Violencia por Género</option>
            </select>

            <label className="block text-sm font-medium text-gray-600 mb-1">Asignar seguimiento a:</label>
            <select
              name="usuarioQueRealizaraElSeguimiento"
              value={form.usuarioQueRealizaraElSeguimiento}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2"
            >
              <option value="">Seleccione un usuario</option>
              {usuariosSimulados.map((u) => (
                <option key={u._id} value={u._id}>{u.nombre}</option>
              ))}
            </select>
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
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Crear Reporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
