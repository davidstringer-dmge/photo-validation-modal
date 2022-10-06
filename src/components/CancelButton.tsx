import React, { FC } from "react";
import classes from "./ConfirmButton.module.css";

import checkUrl from "../assets/check.svg";

interface Props {
  className?: string;
}

export const CancelButton: FC<Props> = ({ className }) => {
  return (
    <button className={classes.container}>
      <img src={checkUrl} />
    </button>
  );
};
