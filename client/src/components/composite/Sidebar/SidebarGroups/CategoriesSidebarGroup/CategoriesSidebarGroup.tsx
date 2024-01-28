import { FC } from "react";
import SidebarGroup from "../../SidebarGroup/SidebarGroup";
import { CategoriesSidebarGroupProps } from "./CategoriesSidebarGroup.types";
import Tablet from "@/components/ui/Tablet/Tablet";
import GamesSVG from "@/assets/svgs/controller.svg?react";
import MusicSVG from "@/assets/svgs/note.svg?react";
import MemesSVG from "@/assets/svgs/smile-dizzy.svg?react";
import BroadcastsSVG from "@/assets/svgs/broadcasts.svg?react";
import SportSVG from "@/assets/svgs/basketball.svg?react";
import PetsSVG from "@/assets/svgs/paw.svg?react";
import NatureSVG from "@/assets/svgs/leaf.svg?react";
import BlogsSVG from "@/assets/svgs/camera.svg?react";

const CategoriesSidebarGroup: FC<CategoriesSidebarGroupProps> = (props) => {
  return (
    <SidebarGroup title="Категории">
      <Tablet icon={<GamesSVG />} to="/categories/games">
        Игры
      </Tablet>
      <Tablet icon={<MusicSVG />} to="/categories/music">
        Музыка
      </Tablet>
      <Tablet icon={<MemesSVG />} to="/categories/memes">
        Мемы
      </Tablet>
      <Tablet icon={<BroadcastsSVG />} to="/categories/broadcasts">
        Прямые эфиры
      </Tablet>
      <Tablet icon={<SportSVG />} to="/categories/sport">
        Спорт
      </Tablet>
      <Tablet icon={<PetsSVG />} to="/categories/pets">
        Питомцы
      </Tablet>
      <Tablet icon={<NatureSVG />} to="/categories/nature">
        Природа
      </Tablet>
      <Tablet icon={<BlogsSVG />} to="/categories/blogs">
        Блоги
      </Tablet>
    </SidebarGroup>
  );
};

export default CategoriesSidebarGroup;
