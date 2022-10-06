import React, { FC, MouseEventHandler } from "react";
import classes from "./CancelButton.module.css";

import cancelUrl from "../assets/cancel.svg";

interface Props {
  className?: string;
  onClick?: MouseEventHandler;
}

export const CancelButton: FC<Props> = ({ className, onClick }) => {
  return (
    <button className={classes.container} onClick={onClick}>
      <img src={cancelUrl} />
    </button>
  );
};
