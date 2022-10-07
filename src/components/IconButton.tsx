import type { MouseEventHandler } from "react";
import classNames from "classnames";

import s from "./IconButton.module.css";

interface IconButtonProps {
  iconUrl: string;
  onClick?: MouseEventHandler;
  className?: string;
  zoomOnHover?: boolean;
}

export const IconButton = ({
  zoomOnHover,
  className,
  onClick,
  iconUrl,
}: IconButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={classNames(className, s.iconButton, {
      [s.zoomOnHover]: zoomOnHover,
    })}
  >
    <img src={iconUrl} />
  </button>
);
