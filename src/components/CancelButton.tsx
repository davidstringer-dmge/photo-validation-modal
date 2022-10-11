import { MouseEventHandler } from "react";
import classNames from "classnames";

import cancelUrl from "../assets/cancel.svg";

import s from "./CancelButton.module.css";
import { IconButton } from "./IconButton";

interface CancelButtonProps {
  className?: string;
  onClick?: MouseEventHandler;
}

export const CancelButton = ({ className, onClick }: CancelButtonProps) => {
  return (
    <IconButton
      className={classNames(className, s.container)}
      zoomOnHover={true}
      iconUrl={cancelUrl}
      onClick={onClick}
    />
  );
};
