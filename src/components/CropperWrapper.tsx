import { CropperFade, CropperRef } from "react-advanced-cropper";
import {
  getAbsoluteZoom,
  getZoomFactor,
} from "advanced-cropper/extensions/absolute-zoom";
import classNames from "classnames";

import helpUrl from "../assets/help.svg";

import { Spinner } from "./Spinner";
import { Navigation } from "./Navigation";
import { IconButton } from "./IconButton";

import s from "./CropperWrapper.module.css";

export interface CropperWrapperProps {
  cropper?: CropperRef;
  loading: boolean;
  loaded: boolean;
  validating?: boolean;
  className?: string;
  onHelp?: () => void;
  children?: JSX.Element;
}

export const CropperWrapper = ({
  cropper,
  loaded,
  loading,
  children,
  className,
  validating,
  onHelp,
}: CropperWrapperProps) => {
  const state = cropper!.getState();
  const settings = cropper!.getSettings();
  const absoluteZoom = getAbsoluteZoom(state, settings);

  const onZoom = (value: number, transitions?: boolean) => {
    cropper!.zoomImage(getZoomFactor(state, settings, value), {
      transitions: !!transitions,
    });
  };

  const shouldSpin = validating || loading;

  return (
    <div className={classNames(className)}>
      <CropperFade
        visible={state && loaded}
        className={"advanced-cropper-wrapper__fade"}
      >
        {children}
        <IconButton
          iconUrl={helpUrl}
          onClick={onHelp}
          className={s.helpButton}
        />
        <Navigation
          className={s.navigation}
          zoomAmount={absoluteZoom * 100}
          onZoomChange={(zoomAmount) => onZoom(zoomAmount / 100, false)}
        />
      </CropperFade>
      <Spinner
        className={classNames(s.spinner, {
          [s["spinner--visible"]]: shouldSpin,
        })}
      />
    </div>
  );
};
