import React, { useState, useEffect } from 'react';

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export const StreakSummary = ({ onStreakChange, triggerUpdate }) => {
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

    const diffMs = now - last;

    if (diffMs < TWELVE_HOURS_MS) {
      // Aún no han pasado 12 horas
      setLimitReached(true);
      return;
    }

    if (diffMs > TWENTY_FOUR_HOURS_MS) {
      // Pasaron más de 24 horas, pierde la racha
      localStorage.setItem('streakCount', '0');
      localStorage.setItem('lastAnswered', now.toISOString());
      setStreak(0);
      setStreakLost(true);
      setLimitReached(false);
      if (onStreakChange) onStreakChange(0);
      return;
    }

    // Pasaron al menos 12h y menos de 24h → sumar racha
    const newCount = count + 1;
    localStorage.setItem('streakCount', newCount.toString());
    localStorage.setItem('lastAnswered', now.toISOString());
    setStreak(newCount);
    setStreakLost(false);
    setLimitReached(false);
    if (onStreakChange) onStreakChange(newCount);
  };

  useEffect(() => {
    if (triggerUpdate) {
      updateStreakData();
    }
  }, [triggerUpdate]);

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
            ⚠️ La racha se perdió porque pasaron más de 24 horas sin responder.
          </p>
        )}
        {limitReached && (
          <p className="text-yellow-600 font-bold mt-2">
            ⏳ Solo puedes responder una vez cada 12 horas.
          </p>
        )}
      </div>
    </div>
  );
};
