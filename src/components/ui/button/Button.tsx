"use client";
import React from "react";
import styles from "./Button.module.scss";
import { useRouter } from "next/navigation";

type ButtonProp = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
}; // This will allow to have acceopt all the button Attribute..
type ButtonType = ButtonProp & {
  style?: React.CSSProperties;

  // borderRadius?: Record<string, number>; // Key should be String ==> Value can be Number...
  text: string;
  // href?: string | unknown,
  href?: string;
  // clickFunc: () => void;
};

const Button = ({ text, href = "/", style }: ButtonType) => {
  const router = useRouter();

  return (
    <button
      className={styles.container}
      style={style}
      onClick={() => router.push(href)}
    >
      {text}
    </button>
  );
};

export default Button;
