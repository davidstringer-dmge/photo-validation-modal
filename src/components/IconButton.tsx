import type { MouseEventHandler } from "react";
import classNames from "classnames";

import s from "./IconButton.module.css";

interface IconButtonProps {
  iconUrl: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  className?: string;
  zoomOnHover?: boolean;
}

export const IconButton = ({
  zoomOnHover,
  className,
  disabled,
  onClick,
  iconUrl,
}: IconButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    onClick={(e) => {
      e.currentTarget.blur();
      onClick?.(e);
    }}
    className={classNames(className, s.iconButton, {
      [s.disabled]: disabled,
      [s.zoomOnHover]: zoomOnHover,
    })}
  >
    <img src={iconUrl} />
  </button>
);
