import React, { FC, MouseEventHandler } from "react";
import classes from "./ConfirmButton.module.css";

import checkUrl from "../assets/check.svg";

interface Props {
  className?: string;
  onClick?: MouseEventHandler;
}

export const ConfirmButton: FC<Props> = ({ className, onClick }) => {
  return (
    <button onClick={onClick} className={classes.container}>
      <img src={checkUrl} />
    </button>
  );
};
