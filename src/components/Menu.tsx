import { Difficulty } from '../types/game';

interface MenuProps {
  onStartGame: (difficulty: Difficulty) => void;
}

export default function Menu({ onStartGame }: MenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d5a6e] to-[#1a3a4a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center p-6 sm:p-8 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl max-w-2xl mx-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-[#f5e6d3] tracking-wider animate-pulse-slow">
          CHRISTMAS
        </h1>
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-[#d94f4f] tracking-wider animate-pulse-slow" style={{ animationDelay: '0.2s' }}>
          MASHUP
        </h2>

        <div className="mb-8 flex justify-center gap-3 sm:gap-6 flex-wrap">
          <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🎅</div>
          <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🍪</div>
          <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎄</div>
          <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce" style={{ animationDelay: '0.6s' }}>🍬</div>
          <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce" style={{ animationDelay: '0.8s' }}>🎁</div>
        </div>

        <p className="text-xl sm:text-2xl text-[#f5e6d3] mb-8 font-semibold">
          Виберіть рівень складності
        </p>

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={() => onStartGame('easy')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-lg sm:text-2xl font-bold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Легкий (10x10)
          </button>
          <button
            onClick={() => onStartGame('medium')}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-lg sm:text-2xl font-bold hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Середній (15x15)
          </button>
          <button
            onClick={() => onStartGame('hard')}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-lg sm:text-2xl font-bold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Важкий (20x20)
          </button>
        </div>

        <p className="text-sm sm:text-lg text-[#f5e6d3] mt-6 opacity-80">
          Час на проходження: 15 хвилин
        </p>
      </div>
    </div>
  );
}
