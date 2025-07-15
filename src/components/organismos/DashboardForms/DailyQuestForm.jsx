// IMPORTACIONES
import React, { useState, useEffect } from 'react';
import { getFormularios } from '../../../api/api';

export const DailyQuestForm = ({ streak, setStreak }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    question1: '',
    question2: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [formularios, setFormularios] = useState([]);
  const [currentPreguntas, setCurrentPreguntas] = useState([]);
  const [reloadCount, setReloadCount] = useState(0);
  const [lastStreakTime, setLastStreakTime] = useState(null);
  const maxReloads = 5;

  // Validar y manejar el envío
  const handleSubmit = () => {
    let correctas = 0;

    if (
      currentPreguntas[0] &&
      currentPreguntas[0].respuesta.trim().toLowerCase() ===
        formData.projectName.trim().toLowerCase()
    ) {
      correctas++;
    }
    if (
      currentPreguntas[1] &&
      currentPreguntas[1].respuesta.trim().toLowerCase() ===
        formData.question1.trim().toLowerCase()
    ) {
      correctas++;
    }
    if (
      currentPreguntas[2] &&
      currentPreguntas[2].respuesta.trim().toLowerCase() ===
        formData.question2.trim().toLowerCase()
    ) {
      correctas++;
    }

    if (correctas >= 2) {
      const now = new Date();
      const tenMinutes = 10 * 60 * 1000;

      if (!lastStreakTime || now - new Date(lastStreakTime) >= tenMinutes) {
        setStreak((prev) => prev + 1);
        setLastStreakTime(now);
      }

      alert('✅ ¡Quest completado correctamente!');
    } else {
      alert('❌ Debes acertar al menos 2 respuestas para completar el quest.');
    }

    // Resetear
    setShowForm(false);
    setStep(1);
    setFormData({
      projectName: '',
      question1: '',
      question2: '',
    });
  };

  // Cargar formularios al inicio
  useEffect(() => {
    const cargarFormularios = async () => {
      const res = await getFormularios();
      if (!res.error) {
        setFormularios(res.data);
        resetQuest(res.data); // Cargar una pregunta al azar desde el inicio
      }
    };
    cargarFormularios();
  }, []);

  const resetQuest = (forms = formularios) => {
    const randomForm = forms[Math.floor(Math.random() * forms.length)];

    if (!randomForm || !randomForm.preguntas || randomForm.preguntas.length < 3) return;

    setCurrentPreguntas(randomForm.preguntas);

    setFormData({
      projectName: '',
      question1: '',
      question2: '',
    });
  };

  const reloadQuest = () => {
    if (reloadCount < maxReloads) {
      setReloadCount((prev) => prev + 1);
      resetQuest();
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6">Daily quest</h2>

      <div className="min-h-[250px] border-2 border-gray-300 flex items-center justify-center text-gray-500 font-semibold mb-6 rounded-xl">
        {!showForm ? (
          <span className="text-lg">Presiona "Start Quest" para comenzar</span>
        ) : (
          <div className="w-full max-w-lg relative">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-purple-500 transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>

            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  {currentPreguntas[0]?.pregunta || "Cargando pregunta..."}
                </h2>
                <input
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 rounded-md w-full px-4 py-2 mb-4"
                />
                <div className="flex justify-end">
                  <button onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded-md">
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  {currentPreguntas[1]?.pregunta || "Cargando pregunta..."}
                </h2>
                <input
                  name="question1"
                  value={formData.question1}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 rounded-md w-full px-4 py-2 mb-4"
                />
                <div className="flex justify-between">
                  <button onClick={prevStep} className="text-purple-600 px-4 py-2">Back</button>
                  <button onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded-md">Next</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  {currentPreguntas[2]?.pregunta || "Cargando pregunta..."}
                </h2>
                <input
                  name="question2"
                  value={formData.question2}
                  onChange={handleChange}
                  type="text"
                  className="border border-gray-300 rounded-md w-full px-4 py-2 mb-4"
                />
                <div className="flex justify-between">
                  <button onClick={prevStep} className="text-purple-600 px-4 py-2">Back</button>
                  <button onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded-md">Next</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">¿Deseas enviar este quest?</h2>
                <div className="flex justify-between">
                  <button onClick={prevStep} className="text-purple-600 px-4 py-2">Back</button>
                  <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-md">Submit</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className={`border px-6 py-2 rounded-md shadow ${
            reloadCount >= maxReloads
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white border-gray-300 hover:bg-gray-100'
          }`}
          disabled={reloadCount >= maxReloads}
          onClick={reloadQuest}
        >
          Reload this quest ({maxReloads - reloadCount} attempts left)
        </button>

        <button
          className="bg-purple-600 text-white px-6 py-2 rounded-md shadow hover:bg-purple-700"
          onClick={() => setShowForm(true)}
        >
          Start quest
        </button>
      </div>

      {/* Listado de formularios */}
      <div>
        <h3 className="text-xl font-bold mb-4">Tus formularios enviados</h3>
        <ul className="space-y-2">
          {formularios.map((form) => (
            <li key={form._id} className="p-3 bg-gray-100 rounded-md shadow-sm">
              <p><strong>Nombre:</strong> {form.nombreUsuario}</p>
              <ul className="ml-4 list-disc">
                {form.preguntas.map((p, i) => (
                  <li key={p._id}>
                    <strong>Pregunta:</strong> {p.pregunta} <br />
                    <strong>Respuesta:</strong> {p.respuesta}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
