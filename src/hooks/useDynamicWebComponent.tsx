// src/hooks/useDynamicWebComponent.js
import { useEffect, useRef } from 'preact/hooks';

/**
 * If there is not an element with the island name, automatically insert islandName
 * as an element at the end of the body allowing the user to not have to manually
 * add the island to the body
 */

export const useDynamicWebIsland = (islandName: string) => {
  // useRef to ensure element is appended only once
  const islandAppended = useRef(false);

  useEffect(() => {
    // Append element only once
    if (!islandAppended.current) {
      const appendElement = () => {
        // Check if the element with the specified name already exists
        if (!document.querySelector(islandName)) {
          // If it doesn't exist, create a new element
          const element = document.createElement(islandName);
          // Find the <body> tag
          const body = document.querySelector('body');
          // Check if the body exists (DOM might not be ready yet)
          if (body && body.lastElementChild) {
            // Insert the newly created element right before the closing </body> tag
            body.insertBefore(element, body.lastElementChild.nextSibling);
          } else {
            // If body is not found, log an error
            console.error(
              'Body element not found. Make sure the DOM is ready.'
            );
          }
        }
      };

      // Execute appendElement function when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', appendElement);
      } else {
        appendElement();
      }

      // Mark as appended to prevent further appending
      islandAppended.current = true;
    }
  }, [islandName]);
};
