import React, { useState } from 'react';
import { DailyQuestForm } from '../components/organismos/DashboardForms/DailyQuestForm';
import { StreakSummary } from '../components/organismos/DashboardForms/StreakSummary';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: `${API_URL}SeminarioProyecto/v1`,
  withCredentials: true,
  timeout: 10000,
});

export const DashboardForm = () => {
  const [streak, setStreak] = useState(0);
  const [showFormModal, setShowFormModal] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [preguntas, setPreguntas] = useState([
    { pregunta: '', respuesta: '' },
    { pregunta: '', respuesta: '' },
    { pregunta: '', respuesta: '' },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const newPreguntas = [...preguntas];
    newPreguntas[index][field] = value;
    setPreguntas(newPreguntas);
  };

  const handleCreateForm = async () => {
    if (!nombreUsuario.trim()) return alert('Nombre requerido');
    if (preguntas.some((p) => !p.pregunta.trim() || !p.respuesta.trim())) {
      return alert('Completa todas las preguntas y respuestas');
    }

    const res = await createFormulario({ nombreUsuario, preguntas });
    if (!res.error) {
      alert('Formulario creado exitosamente');
      setShowFormModal(false);
      setNombreUsuario('');
      setPreguntas([
        { pregunta: '', respuesta: '' },
        { pregunta: '', respuesta: '' },
        { pregunta: '', respuesta: '' },
      ]);
    } else {
      alert('Error al crear formulario');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f4ff] to-[#eef5fb] flex flex-col items-center justify-center px-10 py-14 text-[18px]">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          <DailyQuestForm streak={streak} setStreak={setStreak} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          <StreakSummary currentStreak={streak} />
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setShowFormModal(true)}
          >
            ➕ Crear nuevo formulario
          </button>

          {showFormModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h3 className="text-xl font-bold mb-4">Crear nuevo formulario</h3>

                <label className="block mb-2 font-semibold">Nombre del usuario</label>
                <input
                  type="text"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  placeholder="Ej. Juan Pérez"
                />

                {preguntas.map((p, i) => (
                  <div key={i} className="mb-4">
                    <label className="font-semibold block">Pregunta {i + 1}</label>
                    <input
                      type="text"
                      value={p.pregunta}
                      onChange={(e) => handleQuestionChange(i, 'pregunta', e.target.value)}
                      placeholder="Pregunta"
                      className="w-full border border-gray-300 rounded-md px-4 py-1 mb-2"
                    />
                    <input
                      type="text"
                      value={p.respuesta}
                      onChange={(e) => handleQuestionChange(i, 'respuesta', e.target.value)}
                      placeholder="Respuesta"
                      className="w-full border border-gray-300 rounded-md px-4 py-1"
                    />
                  </div>
                ))}

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateForm}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Guardar Formulario
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
