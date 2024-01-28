import { IAccount } from "@/types/interfaces/account.interface";

export interface RegistrationPayload {
  login: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface GeneralParameters {
  redirect?: boolean;
}

export interface RegisterParameters extends GeneralParameters {}

export interface LoginParameters extends GeneralParameters {}

export interface LogoutParameters extends GeneralParameters {}

export type GetAccount = () => IAccount | null;

export type Register = (payload: RegistrationPayload, params?: RegisterParameters) => Promise<void>;

export type Login = (payload: LoginPayload, params?: LoginParameters) => Promise<void>;

export type Logout = (params?: LogoutParameters) => Promise<void>;


export interface UseAuthReturns {
  getAccount: GetAccount;
  register: Register;
  login: Login;
  logout: Logout;
}

export type UseAuth = () => UseAuthReturns;
