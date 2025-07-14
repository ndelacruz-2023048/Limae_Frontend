import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export const FormsPrueba = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    question1: '',
    question2: '',
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log('Form Submitted', formData);
    alert('Formulario enviado correctamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f4ff] to-[#eef5fb] flex flex-col items-center justify-center px-10 py-14 text-[18px]">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-10">

        {/* Left side - Daily Quest */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
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

                    {!showForm ? (
                        <div className="text-center text-lg text-gray-500">
                        {completed
                            ? '✅ Listo, vuelve mañana para otro Quizz'
                            : 'Presiona "Start Quest" para comenzar'}
                        </div>
                    ) : (
                        <>
                        {step === 1 && (
                            <div>
                            <h2 className="text-lg font-semibold mb-4">
                                What's the name of your project?
                            </h2>
                            <input
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                type="text"
                                className="border border-gray-300 rounded-md w-full px-4 py-2 mb-4"
                                placeholder="AI Content Creator"
                            />
                            <div className="flex justify-end">
                                <button
                                onClick={nextStep}
                                className="bg-purple-600 text-white px-4 py-2 rounded-md"
                                >
                                Next
                                </button>
                            </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                            <h2 className="text-lg font-semibold mb-4">
                                What problem does your project solve?
                            </h2>
                            <input
                                name="question1"
                                value={formData.question1}
                                onChange={handleChange}
                                type="text"
                                className="border border-gray-300 rounded-md w-full px-4 py-2 mb-4"
                            />
                            <div className="flex justify-between">
                                <button
                                onClick={prevStep}
                                className="text-purple-600 px-4 py-2"
                                >
                                Back
                                </button>
                                <button
                                onClick={nextStep}
                                className="bg-purple-600 text-white px-4 py-2 rounded-md"
                                >
                                Next
                                </button>
                            </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Who is the target audience?
                            </h2>
                            <input
                                name="question2"
                                value={formData.question2}
                                onChange={handleChange}
                                type="text"
                                className="border border-gray-300 rounded-md w-full px-4 py-2 mb-4"
                            />
                            <div className="flex justify-between">
                                <button
                                onClick={prevStep}
                                className="text-purple-600 px-4 py-2"
                                >
                                Back
                                </button>
                                <button
                                onClick={nextStep}
                                className="bg-purple-600 text-white px-4 py-2 rounded-md"
                                >
                                Next
                                </button>
                            </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Do you want to submit the form?
                            </h2>
                            <div className="flex justify-between">
                                <button
                                onClick={prevStep}
                                className="text-purple-600 px-4 py-2"
                                >
                                Back
                                </button>
                                <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white px-4 py-2 rounded-md"
                                >
                                Submit
                                </button>
                            </div>
                            </div>
                        )}
                        </>
                    )}
                    </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                className="bg-white border border-gray-300 px-6 py-2 rounded-md shadow hover:bg-gray-100"
                onClick={() => setShowForm(false)}
              >
                Reload this quest ($ attempts left)
              </button>
              <button
                className="bg-purple-600 text-white px-6 py-2 rounded-md shadow hover:bg-purple-700"
                onClick={() => setShowForm(true)}
              >
                Start quest
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Historial and Streaks */}
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          {/* Historial */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-3xl font-bold mb-6">Historial of your quest</h3>
            {[
              { id: 1, date: '10/06/2024' },
              { id: 2, date: '18/2/2025' }
            ].map((item) => (
              <div key={item.id} className="border border-gray-200 px-4 py-3 mb-4 rounded-md flex justify-between items-center">
                <span>Quest N.{item.id} made {item.date}</span>
                <div className="flex gap-2">
                  <button className="border border-gray-300 px-4 py-1 text-sm rounded-md hover:bg-purple-100">View</button>
                  <button className="border border-gray-300 px-4 py-1 text-sm rounded-md hover:bg-red-100">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Streaks en cuadros separados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h4 className="text-xl font-bold mb-2">Current Streak</h4>
              <p className="text-gray-600 text-lg">🔥 5 días seguidos</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h4 className="text-xl font-bold mb-2">Long Streak</h4>
              <p className="text-gray-600 text-lg">🏆 Máximo: 12 días</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h4 className="text-xl font-bold mb-2">Historial of the streaks</h4>
              <button className="mt-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Ver historial</button>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h4 className="text-xl font-bold mb-2">Last Streak</h4>
              <p className="text-gray-600 text-lg">⏳ Hace 3 días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};