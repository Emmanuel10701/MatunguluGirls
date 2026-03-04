// Modern Loading Screen with Enhanced Design
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-emerald-800 via-teal-850 to-slate-800 z-50 flex flex-col items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Loader */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated Rings */}
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-4 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
          <div className="absolute inset-8 border-4 border-white/40 rounded-full animate-spin"></div>
          
          {/* Center Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-800 via-teal-850 to-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="/MatG.jpg" 
                alt="School Logo" 
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>
        </div>
        
        {/* Loading Content */}
        <div className="text-center space-y-6">
          {/* School Name with Gradient */}
          <div>
            <h2 className="md:text-3xl font-bold text-white mb-2 text-lg sm:text-3xl">
              Matungulu Girls High School
            </h2>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
          
          {/* Loading Text */}
          <div className="space-y-4">
            <p className="text-white/80 md:text-lg text-base sm:text-lg">Preparing an exceptional learning experience</p>
            
            {/* Animated Dots */}
            <div className="flex items-center justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-emerald-800 via-teal-850 to-slate-800 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-emerald-700/95 via-teal-700/95 to-slate-700/95 animate-gradient-loading"></div>
            </div>
            
            <p className="text-white/60 text-sm">Loading for your portal...</p>
          </div>
        </div>
      </div>
    </div>
  );
}