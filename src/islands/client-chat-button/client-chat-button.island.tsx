import 'src/styles/global.css';
import 'src/styles/reset.css';

import { createIslandWebComponent } from 'preact-island';

import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';
import ClientChatButtonComponent from 'src/components/client-components/client-chat-button-component';
import { useEffect, useRef } from 'preact/hooks';

const islandName = 'client-chat-button-island';

const storeId = document.currentScript?.getAttribute('data-store-id') as
  | string
  | undefined;

export const ClientChatButtonIsland = () => {
  useWebComponentEvents(islandName);

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

  return (
    <ClientChatButtonComponent
      islandName={islandName}
      data-testid="ClientChatButtonIsland"
      storeId={storeId}
    />
  );
};

console.log('document.currentScript', document.currentScript);
const island = createIslandWebComponent(islandName, ClientChatButtonIsland);
island.render({
  selector: islandName
});
