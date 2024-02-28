import { useMemo } from 'preact/hooks';

// Custom hook to concatenate class names
function useClassNames(...classes: string[]) {
  // Use useMemo to only recompute the classNames when classes change
  const classNames = useMemo(() => {
    return classes.filter(Boolean).join(' ');
  }, [classes]);

  return classNames;
}

export default useClassNames;
