const ClientChatIslandProps = () => {
  const storeId = document.currentScript?.getAttribute('chatbotId') as
    | string
    | undefined;
  const domain = document.currentScript?.getAttribute('domain') as
    | string
    | undefined;
  const islandType = document.currentScript?.getAttribute('islandType') as
    | string
    | undefined;
  const env = document.currentScript?.getAttribute('env') as string | null;

  return { storeId, domain, islandType, env };
};

export default ClientChatIslandProps;
