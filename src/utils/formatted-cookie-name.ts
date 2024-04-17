const formattedCookieName = (formattedIslandName: string) => {
  const cookieName = formattedIslandName
    ? `ripemetrics_chatbot_${formattedIslandName}`
    : 'ripemetrics_chatbot';
  return cookieName;
};

export default formattedCookieName;
