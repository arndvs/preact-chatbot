import { useChatbotContext } from 'src/hooks/useChatbotContext';

interface ChatbotSelectButtonProps {
  options: {
    id: string;
    name: string;
    handler: () => void;
  }[];
}

const ChatbotSelectButton = ({ options }: ChatbotSelectButtonProps) => {
  const { brandColor } = useChatbotContext();

  const borderColorClass = `border-${brandColor}`;
  const hoverBgColorClass = `hover:bg-${brandColor}`;

  return (
    <div className="">
      <div className="">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={option.handler}
            className={`rounded px-1 py-1 bg-white hover:text-white text-base m-1 text-black font-semibold border ${borderColorClass} ${hoverBgColorClass}`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatbotSelectButton;
