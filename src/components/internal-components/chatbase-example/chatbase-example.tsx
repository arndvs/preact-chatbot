import { FC } from 'preact/compat';
import { useState } from 'preact/hooks';
import ChatBubbleButton from 'src/components/chat/chatbot/chat-bubble-button';
import ChatbaseBubbleButton from 'src/components/internal-components/chatbase-example/chatbase-bubble-button';
import ChatbaseModal from 'src/components/internal-components/chatbase-example/chatbase-modal';
import { Box } from 'src/components/ui';
import useClassNames from 'src/hooks/useClassNames';
import { useWebComponentEvents } from 'src/hooks/useWebComponentEvents';

interface ChatbaseExampleProps {
  islandName: string;
}

const ChatOverlay: FC<{ name: string; parent: string }> = ({
  children,
  name,
  parent
}) => {
  useWebComponentEvents(name, parent);

  // @ts-ignore types are wrong
  return <WebComponentPortal name={name}>{children}</WebComponentPortal>;
};

const ChatbaseExample = ({ islandName }: ChatbaseExampleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-start w-full">
        <ChatbaseBubbleButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <ChatbaseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        islandName={islandName}
      />
    </>
  );
};

export default ChatbaseExample;
