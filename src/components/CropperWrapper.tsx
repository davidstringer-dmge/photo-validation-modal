import { CropperFade, CropperRef } from "react-advanced-cropper";
import {
  getZoomFactor,
  getAbsoluteZoom,
} from "advanced-cropper/extensions/absolute-zoom";
import classNames from "classnames";

import helpUrl from "../assets/help.svg";

import { Spinner } from "./Spinner";
import { Navigation } from "./Navigation";
import { IconButton } from "./IconButton";

import s from "./CropperWrapper.module.css";

export interface CropperWrapperProps {
  // supplied by advanced-cropper
  cropper?: CropperRef;
  loading: boolean;
  loaded: boolean;
  validating?: boolean;
  className?: string;
  children?: JSX.Element;

  // custom
  onHelp?: () => void;
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

  const showSpinner = validating || loading;

  return (
    <div className={classNames(className)}>
      <CropperFade
        visible={state && loaded}
        className="advanced-cropper-wrapper__fade"
      >
        {children}
        <IconButton
          iconUrl={helpUrl}
          onClick={onHelp}
          className={s.helpButton}
        />
        <Navigation
          className={s.navigation}
          zoomValue={absoluteZoom}
          onZoom={onZoom}
        />
      </CropperFade>
      <Spinner
        className={classNames(s.spinner, {
          [s["spinner--hide"]]: !showSpinner,
        })}
      />
    </div>
  );
};
