import React, { useState, useEffect } from 'react';

const TEN_SECONDS_MS = 10 * 1000;
const TWENTY_SECONDS_MS = 20 * 1000;

export const StreakSummary = ({ onStreakChange, triggerUpdate }) => {
  // Estados internos
  const [streak, setStreak] = useState(() => {
    const data = localStorage.getItem('streakCount');
    return data ? parseInt(data, 10) : 0;
  });
  const [streakLost, setStreakLost] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const getStreakData = () => {
    const count = parseInt(localStorage.getItem('streakCount'), 10) || 0;
    const lastStr = localStorage.getItem('lastAnswered');
    const last = lastStr ? new Date(lastStr) : null;
    return { count, last };
  };

  const updateStreakData = () => {
    const now = new Date();
    const { count, last } = getStreakData();

    if (!last) {
      // Primera vez
      localStorage.setItem('lastAnswered', now.toISOString());
      localStorage.setItem('streakCount', '1');
      setStreak(1);
      setStreakLost(false);
      setLimitReached(false);
      if (onStreakChange) onStreakChange(1);
      return;
    }

    const diffSec = (now - last) / 1000;

    if (diffSec < 10) {
      // No sumar, tiempo insuficiente
      setLimitReached(true);
      return;
    }

    if (diffSec > 20) {
      // Pasaron más de 20 segundos, pierde la racha
      localStorage.setItem('streakCount', '0');
      localStorage.setItem('lastAnswered', now.toISOString());
      setStreak(0);
      setStreakLost(true);
      setLimitReached(false);
      if (onStreakChange) onStreakChange(0);
      return;
    }

    // Si paso 10 segundos o más y menos de 20 segundos, suma la racha
    const newCount = count + 1;
    localStorage.setItem('streakCount', newCount.toString());
    localStorage.setItem('lastAnswered', now.toISOString());
    setStreak(newCount);
    setStreakLost(false);
    setLimitReached(false);
    if (onStreakChange) onStreakChange(newCount);
  };


  // Cuando cambia triggerUpdate, ejecutamos updateStreakData
  useEffect(() => {
    if (triggerUpdate) {
      updateStreakData();
    }
  }, [triggerUpdate]);

  // Limpiar mensajes después de 5 segundos
  useEffect(() => {
    if (streakLost) {
      const timer = setTimeout(() => setStreakLost(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [streakLost]);

  useEffect(() => {
    if (limitReached) {
      const timer = setTimeout(() => setLimitReached(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [limitReached]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto mt-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h4 className="text-xl font-bold mb-2">Current Streak</h4>
        <p className="text-gray-600 text-lg">🔥 {streak} días seguidos</p>
        {streakLost && (
          <p className="text-red-600 font-bold mt-2">
            ⚠️ La racha se perdió porque pasaron más de 20 segundos sin responder.
          </p>
        )}
        {limitReached && (
          <p className="text-yellow-600 font-bold mt-2">
            ⏳ Solo puedes responder un cuestionario cada 10 segundos.
          </p>
        )}
      </div>
    </div>
  );
};
