import DefaultPageLayout from "@/components/layouts/DefaultPageLayout/DefaultPageLayout";
import HomeScreen from "@/components/screens/HomeScreen/HomeScreen";
import { FC } from "react";
import { HomePageProps } from "./HomePage.types";


const HomePage: FC<HomePageProps> = (props) => {
  return (
    <DefaultPageLayout>
      <HomeScreen />
    </DefaultPageLayout>
  );
};

export default HomePage;
