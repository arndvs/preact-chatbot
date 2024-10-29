import { useEffect, useState } from 'preact/hooks';

const TailwindIndicator = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [screenOrientation, setScreenOrientation] = useState(
    window.screen.orientation.type
  );
  const [pixelRatio, setPixelRatio] = useState(window.devicePixelRatio);

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

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
      setScreenOrientation(window.screen.orientation.type);
      setPixelRatio(window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed z-50 flex items-center justify-center w-auto h-6 p-3 font-mono !text-xs text-white bg-gray-800 rounded-full bottom-1 left-1">
      <div>
        <span className="mr-2">{currentBreakpoint}</span>
        <span className="mr-2">
          {screenWidth} x {screenHeight}
        </span>

        <span className="mr-2">
          Orientation:
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
