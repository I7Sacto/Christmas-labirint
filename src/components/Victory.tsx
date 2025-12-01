interface VictoryProps {
  onNextLevel: () => void;
  onMenu: () => void;
  currentLevel: number;
  isGameComplete: boolean;
}

export default function Victory({ onNextLevel, onMenu, currentLevel, isGameComplete }: VictoryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d5a6e] to-[#1a3a4a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          >
            {['🎉', '🎊', '⭐', '✨', '🎁', '🎄'][Math.floor(Math.random() * 6)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center p-12 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl max-w-2xl mx-4 border-4 border-yellow-400 animate-scale-in">
        {isGameComplete ? (
          <>
            <div className="mb-8 text-9xl animate-bounce">🏆</div>

            <h1 className="text-6xl font-bold mb-6 text-yellow-400 tracking-wider animate-pulse-slow">
              CONGRATULATIONS!
            </h1>

            <p className="text-4xl text-white mb-4 font-bold">
              YOU PASSED 3 LEVELS!
            </p>

            <p className="text-2xl text-green-400 mb-8">
              Ви пройшли всі рівні!
            </p>

            <div className="mb-8 flex justify-center gap-4 text-6xl">
              <div className="animate-bounce" style={{ animationDelay: '0s' }}>🎅</div>
              <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎄</div>
              <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8 text-9xl animate-bounce">🎄</div>

            <h1 className="text-7xl font-bold mb-6 text-green-400 tracking-wider animate-pulse-slow">
              VICTORY!
            </h1>

            <p className="text-3xl text-white mb-8">
              Рівень {currentLevel} пройдено!
            </p>

            <div className="mb-8 flex justify-center gap-4">
              <div className="text-6xl animate-spin-slow">⭐</div>
              <div className="text-6xl animate-spin-slow" style={{ animationDelay: '0.3s' }}>⭐</div>
              <div className="text-6xl animate-spin-slow" style={{ animationDelay: '0.6s' }}>⭐</div>
            </div>
          </>
        )}

        <div className="space-y-4">
          {!isGameComplete && (
            <button
              onClick={onNextLevel}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-xl text-2xl font-bold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Наступний рівень
            </button>
          )}
          <button
            onClick={onMenu}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-8 rounded-xl text-2xl font-bold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Головне меню
          </button>
        </div>
      </div>
    </div>
  );
}
