import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserAuth } from '../context/AuthContext'; // Ajusta si la ruta es distinta
import { DailyQuestForm } from '../components/organismos/DashboardForms/DailyQuestForm';
import { CreateFormModal } from '../components/organismos/DashboardForms/CreateFormModal';

export const DashboardForm = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const { user } = UserAuth();
  const [type, setType] = useState('');

  useEffect(() => {
    if (user) {
      try {
        const decoded = jwtDecode(user);
        console.log(decoded);
        
        setType(decoded?.role || decoded?.type || '');
      } catch (e) {
        console.error('Error al decodificar el token:', e);
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f4ff] to-[#eef5fb] flex flex-col items-center justify-center px-10 py-14 text-[18px]">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[75%] flex flex-col gap-6">
          <DailyQuestForm />

          {/* Solo mostrar botón si es ADMIN */}
          {type === 'ADMIN' && (
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 self-start"
              onClick={() => setShowFormModal(true)}
            >
              ➕ Crear nuevo formulario
            </button>
          )}
        </div>

        <div className="w-full lg:w-1/3"></div>
      </div>

      {showFormModal && (
        <CreateFormModal onClose={() => setShowFormModal(false)} />
      )}
    </div>
  );
};
