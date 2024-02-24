// src/hooks/useDynamicWebComponent.js
import { useEffect } from 'preact/hooks';

/**
 * If there is not an element with the island name, automatically insert islandName
 * as an element at the end of the body allowing the user to not have to manually
 * add the island to the body
 */

export const useDynamicWebIsland = (islandName: string) => {
  useEffect(() => {
    if (!document.querySelector(islandName)) {
      const element = document.createElement(islandName);
      document.body.appendChild(element);
    }
  }, [islandName]);
};
