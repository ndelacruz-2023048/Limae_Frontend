import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export const Forms = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    question1: '',
    question2: '',
  });

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
    <div className="w-[30%] h-[550px] bg-white rounded-3xl shadow-lg p-8 relative overflow-visible">
      <div className="absolute top-6 right-6 bg-white rounded-full shadow p-2 cursor-pointer" onClick={() => setStep(1)}>
        <Icon icon="mdi:close" className="text-gray-400 w-6 h-6" />
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-purple-500 transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">What's the name of your project?</h2>
          <input
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            type="text"
            className="border border-gray-300 rounded-md w-full px-4 py-2 mb-4"
            placeholder="AI Content Creator"
          />
          <div className="flex justify-end">
            <button onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded-md">Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">What problem does your project solve?</h2>
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
          <h2 className="text-lg font-semibold mb-4">Who is the target audience?</h2>
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
          <h2 className="text-lg font-semibold mb-4">Do you want to submit the form?</h2>
          <div className="flex justify-between">
            <button onClick={prevStep} className="text-purple-600 px-4 py-2">Back</button>
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded-md">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};
