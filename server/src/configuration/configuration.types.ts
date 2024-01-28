export interface IConfiguration {
  port: number;
  mongoUri: string;
  accessSecret: string;
  refreshSecret: string;
  accessExpires: string;
  refreshExpires: string;
}

interface IGetConfigurationReturns {
  app: IConfiguration;
}

export type TGetConfiguration = () => IGetConfigurationReturns;
