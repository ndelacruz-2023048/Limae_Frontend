import React from 'react';
import DailyQuestForm from '../components/organismos/DashboardForms/DailyQuestForm';
import QuestHistory from '../components/organismos/DashboardForms/QuestHistory';
import StreakSummary from '../components/organismos/DashboardForms/StreakSummary';

export const DashboardForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f0f4ff] to-[#eef5fb] flex flex-col items-center justify-center px-10 py-14 text-[18px]">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          <DailyQuestForm />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-10">
          <QuestHistory />
          <StreakSummary />
        </div>
      </div>
    </div>
  );
};

export default FormsPrueba;