const formattedIslandName = (islandName: string) => {
  const formattedIslandName = islandName.replace(/-/g, '_');
  return formattedIslandName;
};

export default formattedIslandName;
