interface MarektingBotMessageProps {
  botMessage: string;
}

const MarketingBotMessage = ({ botMessage }: MarektingBotMessageProps) => {
  return (
    <div className="flex-1 min-w-0 mt-1">
      <div className="text-xs">
        <p className="pb-1 text-slate-500 font-xs"> Ignite Fitness</p>
      </div>
      <div className="flex justify-start mr-8">
        <div className="mb-3 max-w-prose overflow-auto rounded-lg px-4 py-3 group-[.cb-dark]:bg-[#3f3f46] group-[.cb-light]:bg-[#f1f1f0] group-[.cb-dark]:text-white group-[.cb-light]:text-black">
          <div className="flex flex-col items-start gap-4 break-words">
            <div className="w-full prose text-left break-words text-inherit dark:prose-invert">
              <p>{botMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingBotMessage;
