import { ReactElement, ReactNode } from "react";
import { RoutesProps } from "react-router-dom";

export interface AppRouterProps extends RoutesProps {}

export interface IRoutes extends Record<string, ReactNode | ReactElement> {}
