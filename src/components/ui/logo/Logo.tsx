import React from "react";
import Image from "next/image";
import Hero from "@/images/Hero4.png";
import style from "./Logo.module.scss";
const Logo = () => {
  return (
    <div className={style.container}>
      <Image src={Hero} alt="Image not found" width={40} height={40} />
      <h2>Admin Panel</h2>
    </div>
  );
};

export default Logo;
