import axios from "axios";
import { GetAccount, Login, Logout, Register, UseAuth } from "./useAuth.types";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { IAccount } from "@/types/interfaces/account.interface";
import { TTokenPayload } from "@/types/tokenPayload.types";
import { useDispatch } from "react-redux";
import { accountSlice } from "@/store/slices/account.slice";
import { useAppSelector } from "../redux/redux";

const useAuth: UseAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useAppSelector((state) => state.account);

  const getAccount: GetAccount = () => {
    if (Object.values(account).every((value) => value === null)) {
      return null;
    }

    return account;
  };

  const register: Register = async (payload, params?) => {
    const response = await axios.post<string>("http://localhost:5000/auth/registration", payload, {
      withCredentials: true,
    });

    sessionStorage.setItem("access", response.data);

    const { iat, exp, ...account } = jwtDecode<TTokenPayload<IAccount>>(response.data);

    dispatch(accountSlice.actions.login(account));

    params?.redirect && navigate("/");
  };

  const login: Login = async (payload, params?) => {
    const response = await axios.post<string>("http://localhost:5000/auth/login", payload, {
      withCredentials: true,
    });

    sessionStorage.setItem("access", response.data);

    const { iat, exp, ...account } = jwtDecode<TTokenPayload<IAccount>>(response.data);

    dispatch(accountSlice.actions.login(account));

    params?.redirect && navigate("/");
  };

  const logout: Logout = async (params?) => {
    await axios.delete(`http://localhost:5000/auth/logout/${account._id}`, { withCredentials: true });

    sessionStorage.removeItem("access");

    dispatch(accountSlice.actions.logout());

    params?.redirect && navigate("/");
  };

  return { getAccount, register, login, logout };
};

export default useAuth;
