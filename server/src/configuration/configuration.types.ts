export interface IConfiguration {
  port: number;
  mongoUri: string;
  accessSecret: string;
  refreshSecret: string;
}

interface IGetConfigurationReturns {
  app: IConfiguration;
}

export type TGetConfiguration = () => IGetConfigurationReturns;
