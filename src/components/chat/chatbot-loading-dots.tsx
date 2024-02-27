import React from 'react';

const ChatbotLoadingDots = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        width="50px"
        height="21px"
        viewBox="0 0 132 58"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="30"
          r="13"
          fill="#fff"
          style={{ animation: 'load 1s infinite' }}
        />
        <circle
          cx="65"
          cy="30"
          r="13"
          fill="#fff"
          style={{ animation: 'load 1s infinite', animationDelay: '0.2s' }}
        />
        <circle
          cx="105"
          cy="30"
          r="13"
          fill="#fff"
          style={{ animation: 'load 1s infinite', animationDelay: '0.4s' }}
        />
      </svg>
      <style>
        {`
          @keyframes load {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChatbotLoadingDots;
