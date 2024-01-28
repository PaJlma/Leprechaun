import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRouterProps, IRoutes } from "./AppRouter.types";
import HomePage from "../pages/HomePage/HomePage";
import VideoPage from "../pages/VideoPage/VideoPage";

const AppRouter: FC<AppRouterProps> = ({ ...props }) => {
  const routes: IRoutes = {
    "/": <HomePage />,
    "/video/:id": <VideoPage />,
  };

  return (
    <Routes {...props}>
      {Object.entries(routes).map(([key, value]) => (
        <Route path={key} element={value} key={key} />
      ))}
    </Routes>
  );
};

export default AppRouter;
