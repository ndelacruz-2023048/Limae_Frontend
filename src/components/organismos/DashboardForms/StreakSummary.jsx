import React from 'react';

import React from 'react';

export const StreakSummary = ({ currentStreak }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h4 className="text-xl font-bold mb-2">Current Streak</h4>
        <p className="text-gray-600 text-lg">🔥 {currentStreak} días seguidos</p>
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
  );
};