const LoadingUI = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-pulse">
      <div className="relative">
        {/* ANIMATED GRADIENT BACKGROUND */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* MAIN LOADING CARD */}
        <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl p-12 md:p-16 shadow-2xl">
          {/* SPINNING LOADER */}
          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20">
              {/* OUTER RING */}
              <div className="absolute inset-0 rounded-full border-5 border-purple-500/20" />

              {/* SPINNING GRADIENT RING */}
              <div className="absolute inset-0 rounded-full border-5 border-transparent border-t-purple-500 border-r-pink-500 animate-spin" />

              {/* CENTER DOT */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500 animate-pulse" />
            </div>
          </div>

          {/* LOADING TEXT */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">Loading Events</h2>

            <p className="text-sm md:text-base text-muted-foreground">
              Discovering amazing experiences for you
            </p>
          </div>

          {/* LOADING DOTS ANIMATION */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.10s]" />
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
          </div>
        </div>

        {/* FLOATING PARTICLES */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-purple-400/80 animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-2 h-2 rounded-full bg-pink-400/80 animate-ping [animation-delay:0.5s]" />
          <div className="absolute bottom-1/4 left-3/4 w-2 h-2 rounded-full bg-blue-400/80 animate-ping [animation-delay:1s]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingUI;
