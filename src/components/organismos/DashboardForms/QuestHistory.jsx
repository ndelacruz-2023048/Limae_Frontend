import React from 'react';

const QuestHistory = () => {
  const history = [
    { id: 1, date: '10/06/2024' },
    { id: 2, date: '18/2/2025' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h3 className="text-3xl font-bold mb-6">Historial of your quest</h3>
      {history.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 px-4 py-3 mb-4 rounded-md flex justify-between items-center"
        >
          <span>Quest N.{item.id} made {item.date}</span>
          <div className="flex gap-2">
            <button className="border border-gray-300 px-4 py-1 text-sm rounded-md hover:bg-purple-100">View</button>
            <button className="border border-gray-300 px-4 py-1 text-sm rounded-md hover:bg-red-100">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestHistory;