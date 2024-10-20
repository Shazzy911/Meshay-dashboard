import style from "./TopBar.module.scss";
import Logo from "@/components/ui/logo/Logo";
import Search from "@/components/ui/search/Search";
import { FaBell, FaUserAlt } from "react-icons/fa";
import Menu from "../menu/Menu";

const TopBar = () => {
  return (
    <header className={style.container}>
      <Logo />
      <div className={style.top_search}>
        <Search />
      </div>
      <section className={style.icons_container}>
        <div className={style.icons}>
          <FaBell />
        </div>
        <div className={`${style.icons} ${style.user}`}>
          <FaUserAlt />
        </div>
        <div className={`${style.icons} ${style.menu}`}>
          <Menu />
        </div>
      </section>
    </header>
  );
};

export default TopBar;
