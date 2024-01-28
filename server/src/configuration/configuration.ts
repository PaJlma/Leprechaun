import { TGetConfiguration } from "./configuration.types";

export const getConfiguration: TGetConfiguration = () => ({
  app: {
    port: parseInt(process.env.PORT),
    mongoUri: process.env.MONGO_URI,
    accessSecret: process.env.ACCESS_SECRET,
    refreshSecret: process.env.REFRESH_SECRET,
    accessExpires: process.env.ACCESS_EXPIRES, 
    refreshExpires: process.env.REFRESH_EXPIRES, 
  },
});
