import type { MouseEventHandler } from "react";
import classNames from "classnames";

import s from "./IconButton.module.css";

interface IconButtonProps {
  iconUrl: string;
  onClick?: MouseEventHandler;
  className?: string;
}

export const IconButton = ({
  className,
  onClick,
  iconUrl,
}: IconButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames(className, s.iconButton)}
  >
    <img src={iconUrl} />
  </button>
);
