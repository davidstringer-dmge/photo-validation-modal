import classNames from "classnames";
import classes from "./Banner.module.css";
import infoUrl from "../assets/info.svg";

type BannerProps = {
  className?: string;
};

export const Banner = (props: BannerProps) => {
  return (
    <div className={classNames(props.className, classes.container)}>
      <img className={classes.icon} src={infoUrl} />
      <p>
        Please adjust your photo to match the requirements closely. Press the
        help button below for guidelines.
      </p>
    </div>
  );
};
