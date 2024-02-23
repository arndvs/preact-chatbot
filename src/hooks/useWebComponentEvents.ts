import { useEffect } from 'preact/hooks';

export const useWebComponentEvents = (name: string, parent?: string) => {
  console.log('uWCE event name', name);
  console.log('uWCE event parent', parent);
  console.log('useWebComponentEvents mounted');
  useEffect(() => {
    const event = new CustomEvent('web-component-mount', {
      detail: { target: name, parent },
      bubbles: true
    });
    console.log('uWCE event - web-component-mount', event);
    dispatchEvent(event);

    return () => {
      const event = new CustomEvent('web-component-unmount', {
        detail: { target: name, parent },
        bubbles: true
      });
      console.log(event);
      dispatchEvent(event);
    };
  }, [name]);
};
