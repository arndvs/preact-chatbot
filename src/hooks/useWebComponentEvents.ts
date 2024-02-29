import { useEffect } from 'preact/hooks';

/**
 * Used to render the preact island component in the web component
 */

export const useWebComponentEvents = (name: string, parent?: string) => {
  useEffect(() => {
    const event = new CustomEvent('web-component-mount', {
      detail: { target: name, parent },
      bubbles: true
    });

    dispatchEvent(event);

    return () => {
      const event = new CustomEvent('web-component-unmount', {
        detail: { target: name, parent },
        bubbles: true
      });

      dispatchEvent(event);
    };
  }, [name]);
};
