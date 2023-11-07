import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick, ...rest }: ButtonProps) => {
  return (
    <button
      type="button"
      className={styles["button"]}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
