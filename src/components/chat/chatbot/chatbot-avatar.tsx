import { useChatbotContext } from 'src/hooks/useChatbotContext';

interface ChatbotAvatarProps {
  className?: string;
}

const ChatbotAvatar = ({ className }: ChatbotAvatarProps) => {
  const { storeLogo, profilePicture } = useChatbotContext();

  // Determine the Profile Picture based on conditions
  const profilePic =
    profilePicture != null && profilePicture !== ''
      ? profilePicture
      : storeLogo;

  return (
    <img
      src={profilePic}
      className={className}
      //   className="w-8 h-8 mr-2 rounded-full"
    />
  );
};

export default ChatbotAvatar;
