import { useState } from 'preact/hooks';
import MarketingBubbleButton from 'src/components/internal-components/marketing-chatbot/marketing-bubble-button';
import MarketingModal from 'src/components/internal-components/marketing-chatbot/marketing-modal';

interface MarketingChatbotProps {
  islandName: string;
}

const MarketingChatbotComponent = ({ islandName }: MarketingChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-start w-full">
        <MarketingBubbleButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <MarketingModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        islandName={islandName}
      />
    </>
  );
};

export default MarketingChatbotComponent;
