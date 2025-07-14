import React from 'react'

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="flex flex-col items-center">
        {/* Icono de imagen */}
        <div className="relative mb-6">
          <svg className="w-20 h-20 text-blue-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
            <rect x="8" y="12" width="32" height="24" rx="4" className="fill-blue-100 stroke-blue-400" />
            <circle cx="16" cy="20" r="3" className="fill-blue-300" />
            <path d="M12 32l7-7 5 5 7-7 5 5" className="stroke-blue-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Flecha de subida animada */}
          <svg className="absolute left-1/2 -translate-x-1/2 -top-8 w-8 h-8 text-blue-500 animate-up-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
        {/* Barra de progreso animada */}
        <div className="w-48 h-3 bg-blue-200 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-blue-500 animate-progress-bar" style={{width: '60%'}}></div>
        </div>
        <span className="text-white text-lg font-semibold animate-pulse">Subiendo imagen...</span>
      </div>
      {/* Animaciones personalizadas */}
      <style>{`
        @keyframes up-arrow {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-24px); opacity: 1; }
        }
        .animate-up-arrow {
          animation: up-arrow 1.2s infinite;
        }
        @keyframes progress-bar {
          0% { width: 0%; }
          80% { width: 90%; }
          100% { width: 60%; }
        }
        .animate-progress-bar {
          animation: progress-bar 1.8s infinite;
        }
      `}</style>
    </div>
  )
}
