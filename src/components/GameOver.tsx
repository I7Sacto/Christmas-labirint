interface GameOverProps {
  onRestart: () => void;
  onMenu: () => void;
}

export default function GameOver({ onRestart, onMenu }: GameOverProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-red-900/20 animate-pulse-slow" />

      <div className="relative z-10 text-center p-6 sm:p-12 bg-black/60 backdrop-blur-md rounded-3xl shadow-2xl max-w-2xl mx-4 border-4 border-red-600 animate-shake">
        <div className="mb-8 text-6xl sm:text-9xl animate-bounce">💀</div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 text-red-600 tracking-wider animate-pulse-slow">
          GAME OVER
        </h1>

        <p className="text-xl sm:text-3xl text-white mb-8 opacity-90">
          Час вийшов!
        </p>

        <div className="mb-8 flex justify-center gap-2 sm:gap-4">
          <div className="text-3xl sm:text-5xl opacity-50">❄️</div>
          <div className="text-3xl sm:text-5xl opacity-50">⏰</div>
          <div className="text-3xl sm:text-5xl opacity-50">❄️</div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-lg sm:text-2xl font-bold hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Спробувати знову
          </button>
          <button
            onClick={onMenu}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-lg sm:text-2xl font-bold hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Головне меню
          </button>
        </div>
      </div>
    </div>
  );
}
