import { useState } from 'preact/hooks';
import OtherBubbleButton from 'src/components/internal-components/other-example/other-bubble-button';
import OtherModal from 'src/components/internal-components/other-example/other-modal';

interface OtherExampleProps {
  islandName: string;
}

const OtherExample = ({ islandName }: OtherExampleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-start w-full">
        <OtherBubbleButton
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <OtherModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        islandName={islandName}
      />
    </>
  );
};

export default OtherExample;
