import { useState } from 'preact/hooks';
import MarketingBubbleButton from 'src/components/internal-components/marketing-example/marketing-bubble-button';
import MarketingModal from 'src/components/internal-components/marketing-example/marketing-modal';

interface MarketingExampleProps {
  islandName: string;
}

const MarketingExample = ({ islandName }: MarketingExampleProps) => {
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

export default MarketingExample;
