import classNames from "classnames";

import zoomInUrl from "../assets/zoomIn.svg";
import zoomOutUrl from "../assets/zoomOut.svg";

import { IconButton } from "./IconButton";
import s from "./Navigation.module.css";

// note: `zoomValue` is between 0 and 1

type NavigationProps = {
  zoomValue: number;
  className?: string;
  disabled?: boolean;
  onZoom?: (zoomValue: number, transition?: boolean) => void;
};

export const Navigation = ({
  zoomValue,
  className,
  disabled,
  onZoom,
}: NavigationProps) => {
  const onZoomIn = () => {
    const zoomAmount = Math.min(1, zoomValue + 0.25);
    onZoom?.(zoomAmount, true);
  };

  const onZoomOut = () => {
    const zoomAmount = Math.max(0, zoomValue - 0.25);
    onZoom?.(zoomAmount, true);
  };

  return (
    <div className={classNames(className, s.navigation)}>
      <IconButton
        className={s.zoomButton}
        iconUrl={zoomOutUrl}
        onClick={onZoom && onZoomOut}
        disabled={disabled}
        zoomOnHover={true}
      />
      <input
        disabled={disabled}
        className={s.slider}
        type="range"
        min="0"
        max="100"
        value={zoomValue * 100}
        onInput={(event) => {
          const zoomValue = Number(event.currentTarget.value);
          onZoom?.(zoomValue / 100);
        }}
      />
      <IconButton
        className={s.zoomButton}
        iconUrl={zoomInUrl}
        onClick={onZoom && onZoomIn}
        disabled={disabled}
        zoomOnHover={true}
      />
    </div>
  );
};
