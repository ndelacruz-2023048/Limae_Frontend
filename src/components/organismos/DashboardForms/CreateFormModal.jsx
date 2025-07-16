import React, { useState } from 'react';
import { crearCuestionario } from '../../../routers/Services/Api.jsx';

export const CreateFormModal = ({ onClose }) => {
  const [titulo, setTitulo] = useState('');
  const [preguntas, setPreguntas] = useState([
    { pregunta: '' },
    { pregunta: '' },
    { pregunta: '' }
  ]);

  const handlePreguntaChange = (index, value) => {
    const newPreguntas = [...preguntas];
    newPreguntas[index].pregunta = value;
    setPreguntas(newPreguntas);
  };

  const handleAddPregunta = () => {
    setPreguntas([...preguntas, { pregunta: '' }]);
  };

  const handleSubmit = async () => {
    if (!titulo.trim()) return alert('El título es obligatorio');
    if (preguntas.some(p => !p.pregunta.trim())) {
      return alert('Todas las preguntas deben estar completas');
    }

    const res = await crearCuestionario({ titulo, preguntas });

    if (!res.error) {
      alert('✅ Cuestionario creado exitosamente');
      setTitulo('');
      setPreguntas([{ pregunta: '' }, { pregunta: '' }, { pregunta: '' }]);
      onClose();
    } else {
      alert('❌ Error al crear el cuestionario');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h3 className="text-xl font-bold mb-4">Crear nuevo cuestionario</h3>

        <label className="block mb-2 font-semibold">Título del cuestionario</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
          placeholder="Ej. Cuestionario de ayuda a indefensos"
        />

        {preguntas.map((p, i) => (
          <div key={i} className="mb-4">
            <label className="font-semibold block">Pregunta {i + 1}</label>
            <input
              type="text"
              value={p.pregunta}
              onChange={(e) => handlePreguntaChange(i, e.target.value)}
              placeholder="Escribe la pregunta"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        ))}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Guardar Cuestionario
          </button>
        </div>
      </div>
    </div>
  );
};
