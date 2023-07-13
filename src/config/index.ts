export const getServerConfig = () => {
  return {
    baseUrl: `http://localhost:${process.env.PORT}`,
  };
};

export const fillBaseUrl = (path: string) => {
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return getServerConfig().baseUrl + path;
};
