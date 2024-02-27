import React from 'react';
import BotHeaderCloseChatButton from './chatbot-header-close-chat-button';
import BotHeaderResetChatButton from './chatbot-header-reset-chat-button';

const BotHeader = ({ storeName, storeLogo, brandColor, toggleChat }) => {
  return (
    <div className="px-4 py-3 bg-white border-b border-gray-100 shrink-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-x-3">
          <img
            src={storeLogo}
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: brandColor }}
          />
          <div className="ml-2 text-sm font-medium leading-4 truncate">
            {storeName} Chat
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {/* <BotHeaderResetChatButton /> */}
          <BotHeaderCloseChatButton
            brandColor={brandColor}
            toggleChat={toggleChat}
          />
        </div>
      </div>
    </div>
  );
};

export default BotHeader;
