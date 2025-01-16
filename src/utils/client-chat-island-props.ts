const ClientChatIslandProps = () => {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const urlEnv = urlParams.get('env');

  const storeId = document.currentScript?.getAttribute('chatbotId') as
    | string
    | undefined;
  const domain = document.currentScript?.getAttribute('domain') as
    | string
    | undefined;
  const islandType = document.currentScript?.getAttribute('islandType') as
    | string
    | undefined;

  // First check URL param, then fallback to script attribute
  const env =
    urlEnv || (document.currentScript?.getAttribute('env') as string | null);

  return { storeId, domain, islandType, env };
};

export default ClientChatIslandProps;
