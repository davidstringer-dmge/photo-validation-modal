import classNames from "classnames";

import zoomInUrl from "../assets/zoomIn.svg";
import zoomOutUrl from "../assets/zoomOut.svg";

import classes from "./Navigation.module.css";

type NavigationProps = {
  className?: string;
  onZoomChange?: (amount: number, transitions?: boolean) => void;
  zoomAmount: number;
};

export const Navigation = (props: NavigationProps) => {
  const onZoomIn = () => {
    const convertZoom = props.zoomAmount / 100;
    const zoomAmount = Math.min(1, convertZoom + 0.25);
    props.onZoomChange?.(zoomAmount * 100, true);
  };

  const onZoomOut = () => {
    const convertZoom = props.zoomAmount / 100;
    const zoomAmount = Math.max(0, convertZoom - 0.25);
    props.onZoomChange?.(zoomAmount * 100, true);
  };

  return (
    <div className={classNames(props.className, classes.container)}>
      <button className={classes.button} onClick={onZoomOut}>
        <img src={zoomOutUrl} />
      </button>
      <input
        onInput={(event) =>
          props.onZoomChange?.(Number(event.currentTarget.value))
        }
        className={classes.slider}
        type="range"
        min="0"
        max="100"
        value={props.zoomAmount}
      />
      <button className={classes.button} onClick={onZoomIn}>
        <img src={zoomInUrl} />
      </button>
    </div>
  );
};
