const TailwindIndicator = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const screenOrientation = window.screen.orientation.type;
  const pixelRatio = window.devicePixelRatio;

  const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  };

  const currentBreakpoint = Object.entries(breakpoints)
    .reverse()
    .find(([, value]) => screenWidth >= value)?.[0];

  return (
    <div className="fixed z-50 flex items-center justify-center w-auto h-6 p-3 font-mono text-xs text-white bg-gray-800 rounded-full bottom-1 left-1">
      <div>
        <span className="mr-2">{currentBreakpoint}</span>
        <span className="mr-2">
          {screenWidth} x {screenHeight}
        </span>
        <span className="mr-2">
          Orientation:{' '}
          {screenOrientation
            .replace('portrait-primary', 'Portrait')
            .replace('landscape-primary', 'Landscape')}
        </span>
        <span>Pixel Ratio: {pixelRatio}</span>
      </div>
    </div>
  );
};

export default TailwindIndicator;
