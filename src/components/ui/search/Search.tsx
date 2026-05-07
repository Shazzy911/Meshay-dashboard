import React from "react";
import { FaSearch } from "react-icons/fa";
import style from "./Search.module.scss";
const Search = () => {
  return (
    <div className={style.container}>
      <FaSearch className={style.search_icon} />
      <input type="text" placeholder="Search Songs, Artist, Albums" />
    </div>
  );
};

export default Search;
