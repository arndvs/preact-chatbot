interface MarektingUserMessageProps {
  userMessage: string;
}

const MarketingUserMessage = ({ userMessage }: MarektingUserMessageProps) => {
  return (
    <div className="flex flex-col space-y-1.5 px-3 items-end pb-2">
      <div className="flex items-center gap-1.5 justify-end">
        <div class="text-xs">
          <p class="pb-1 text-slate-500 font-xs">You</p>
        </div>
      </div>
      <div className="inline-flex flex-col gap-2 px-3 py-3 font-normal text-white bg-[#ff750a] rounded-tr-sm shadow-sm rounded-xl">
        <p>{userMessage}</p>
      </div>
    </div>
  );
};

export default MarketingUserMessage;
