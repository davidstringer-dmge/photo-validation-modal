import classNames from "classnames";
import classes from "./Banner.module.css";
import infoUrl from "../assets/info.svg";

export enum BannerType {
  INFO = "info",
  WARNING = "warning",
}

export const BANNER_MESSAGES: { [bannerMessageType: string]: string } = {
  // generic error codes
  GENERAL:
    "Please adjust your photo to match the requirements closely. Press the help button below for guidelines.",
  GENERAL_ERROR:
    "The photo is invalid. Press the help button below for guidelines.",
  // specific error codes
  EYES_NOT_OPEN: "Eyes are not open.",
  FACE_NOT_CENTERED: "Face is not centered.",
  CHIN_TOO_FAR: "Chin is too close to the center.",
  CHIN_TOO_CLOSE: "Chin is too close to the edge",
  HEAD_TOO_FAR: "Head is too close to the center.",
  HEAD_TOO_CLOSE: "Head is too close to the edge.",
  LEFT_SIDE_TOO_CLOSE: "Left side is too close to the edge.",
  RIGHT_SIDE_TOO_CLOSE: "Right side is too close to the edge.",
  TOO_MANY_FACES: "There should only be one person in the photo.",
  COULD_NOT_FIND_FACE: "Could not find a person in the photo.",
  FACING_SIDEWAYS_TOO_MUCH: "Person is facing sideways too much.",
  TILTING_SIDEWAYS_TOO_MUCH: "Person is tilting sideways too much.",
  FACING_UP_OR_DOWN_TOO_MUCH: "Person is facing up or down too much.",
  // transitions
  VALIDATING: "Validating the photo. Please wait...",
};

type BannerProps = {
  type?: BannerType;
  messages: string[];
  className?: string;
};

export const Banner = ({
  type = BannerType.INFO,
  className,
  messages,
}: BannerProps) => {
  return (
    <div
      data-testid="banner"
      className={classNames(
        className,
        classes.banner,
        classes[`banner--${type}`]
      )}
    >
      <img className={classes.icon} src={infoUrl} />
      <strong>{messages.join(" ")}</strong>
    </div>
  );
};
