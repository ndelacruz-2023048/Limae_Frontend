import { useState, useEffect } from 'react';
import { getCuestionariosConRespuestas, responderCuestionario } from '../../../routers/Services/Api.jsx';
import { StreakSummary } from './StreakSummary.jsx';

export const DailyQuestForm = () => {
  // Estados cuestionarios y formulario
  const [step, setStep] = useState(1);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [formData, setFormData] = useState({ respuesta1: '', respuesta2: '', respuesta3: '' });
  const [cuestionarios, setCuestionarios] = useState([]);
  const [preguntasActuales, setPreguntasActuales] = useState([]);
  const [cuestionarioSeleccionado, setCuestionarioSeleccionado] = useState(null);
  const [iniciado, setIniciado] = useState(false);
  const [respuestasEnviadas, setRespuestasEnviadas] = useState(null);

  // Estados para manejar botón iniciar y trigger para actualizar racha
  const [puedeIniciar, setPuedeIniciar] = useState(true);
  const [triggerStreakUpdate, setTriggerStreakUpdate] = useState(false);

  const TEN_SECONDS_MS = 10 * 1000;

  // Cargar cuestionarios y seleccionar aleatorio
  useEffect(() => {
    const cargar = async () => {
      const res = await getCuestionariosConRespuestas();
      if (!res.error) {
        setCuestionarios(res.cuestionarios);
        seleccionarRandom(res.cuestionarios);
      }
    };
    cargar();
  }, []);

  // Control botón iniciar según tiempo desde última respuesta
  useEffect(() => {
    const last = getLastAnswered();
    if (last) {
      const diffMs = new Date() - last;
      setPuedeIniciar(diffMs >= TEN_SECONDS_MS);
    } else {
      setPuedeIniciar(true);
    }
  }, []);

  const seleccionarRandom = (lista) => {
    const aleatorio = lista[Math.floor(Math.random() * lista.length)];
    if (!aleatorio || !aleatorio.preguntas || aleatorio.preguntas.length < 3) return;
    setPreguntasActuales(aleatorio.preguntas);
    setCuestionarioSeleccionado(aleatorio);
    setFormData({ respuesta1: '', respuesta2: '', respuesta3: '' });
    setStep(1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLastAnswered = () => {
    const last = localStorage.getItem('lastAnswered');
    return last ? new Date(last) : null;
  };

  const handleSubmit = async () => {
    if (!nombreUsuario.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }
    const respuestas = [
      { pregunta: preguntasActuales[0]._id, respuesta: formData.respuesta1 },
      { pregunta: preguntasActuales[1]._id, respuesta: formData.respuesta2 },
      { pregunta: preguntasActuales[2]._id, respuesta: formData.respuesta3 },
    ];

    try {
      const res = await responderCuestionario({
        nombreUsuario,
        cuestionario: cuestionarioSeleccionado._id,
        respuestas
      });

      if (res.success) {
        alert('✅ Respuestas enviadas con éxito');
        seleccionarRandom(cuestionarios);
        setNombreUsuario('');
        setFormData({ respuesta1: '', respuesta2: '', respuesta3: '' });
        setIniciado(false);

        // Aquí disparo el update de la racha
        setTriggerStreakUpdate(prev => !prev);

      } else {
        alert('❌ Error al enviar las respuestas');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error inesperado');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Responder Cuestionario Diario</h2>

      {cuestionarioSeleccionado ? (
        <>
          <h3 className="text-xl font-semibold mb-2 text-purple-700">
            {cuestionarioSeleccionado.titulo}
          </h3>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => seleccionarRandom(cuestionarios)}
              disabled={iniciado}
              className={`px-4 py-2 rounded ${iniciado ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-500 text-white'}`}
            >
              Refrescar
            </button>

            <button
              onClick={() => setIniciado(true)}
              disabled={!puedeIniciar || iniciado}
              className={`px-4 py-2 rounded bg-blue-600 text-white ${(!puedeIniciar || iniciado) ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={!puedeIniciar ? 'Solo puedes responder una vez cada 12 horas' : ''}
            >
              Iniciar
            </button>
          </div>
        </>
      ) : (
        <p>Cargando cuestionario...</p>
      )}

      {iniciado && preguntasActuales.length >= 3 && (
        <div className="max-w-xl mx-auto">
          <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
            <div className="h-full bg-purple-600 transition-all" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>

          {step === 1 && (
            <div>
              <label className="block mb-2 font-semibold">Tu nombre:</label>
              <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
              />

              <label className="block mb-2 font-semibold">{preguntasActuales[0].pregunta}</label>
              <input
                name="respuesta1"
                value={formData.respuesta1}
                onChange={handleChange}
                type="text"
                className="w-full border px-4 py-2 rounded"
              />

              <div className="flex justify-end mt-4">
                <button onClick={() => setStep(2)} className="bg-purple-600 text-white px-4 py-2 rounded">Next</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block mb-2 font-semibold">{preguntasActuales[1].pregunta}</label>
              <input
                name="respuesta2"
                value={formData.respuesta2}
                onChange={handleChange}
                type="text"
                className="w-full border px-4 py-2 rounded"
              />

              <div className="flex justify-between mt-4">
                <button onClick={() => setStep(1)} className="text-purple-600 px-4 py-2">Back</button>
                <button onClick={() => setStep(3)} className="bg-purple-600 text-white px-4 py-2 rounded">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block mb-2 font-semibold">{preguntasActuales[2].pregunta}</label>
              <input
                name="respuesta3"
                value={formData.respuesta3}
                onChange={handleChange}
                type="text"
                className="w-full border px-4 py-2 rounded"
              />

              <div className="flex justify-between mt-4">
                <button onClick={() => setStep(2)} className="text-purple-600 px-4 py-2">Back</button>
                <button onClick={() => setStep(4)} className="bg-purple-600 text-white px-4 py-2 rounded">Next</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="mb-4 font-semibold">¿Estás listo para enviar tus respuestas?</p>
              <div className="flex justify-between">
                <button onClick={() => setStep(3)} className="text-purple-600 px-4 py-2">Back</button>
                <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Enviar</button>
              </div>
            </div>
          )}
        </div>
      )}

      <StreakSummary triggerUpdate={triggerStreakUpdate} onStreakChange={(val) => {
        // Si quieres recibir la racha actualizada aquí, puedes manejarla
        // Ejemplo: console.log('Racha actualizada:', val);
      }} />

      {respuestasEnviadas && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold mb-2 text-green-600">Respuestas Enviadas</h3>
          <p className="mb-2"><strong>Título:</strong> {respuestasEnviadas.titulo}</p>
          <ul className="list-disc ml-6 space-y-2">
            {respuestasEnviadas.preguntas.map((p, idx) => (
              <li key={p._id}>
                <strong>{p.pregunta}</strong>: {respuestasEnviadas.respuestas[idx]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
