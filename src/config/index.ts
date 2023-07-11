export const getServerConfig = () => {
  return {
    baseUrl: `${process.env.SERVER_DEV_ROOT}:${process.env.PORT}`,
  };
};
