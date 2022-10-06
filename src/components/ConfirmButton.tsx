import React, { FC, MouseEventHandler } from "react";
import classes from "./ConfirmButton.module.css";

import checkUrl from "../assets/check.svg";

interface Props {
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

export const ConfirmButton: FC<Props> = ({ className, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={classes.container}>
      <img src={checkUrl} />
    </button>
  );
};
