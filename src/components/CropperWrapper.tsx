import React, { FC } from "react";
import { CropperFade, CropperRef } from "react-advanced-cropper";
import {
  getAbsoluteZoom,
  getZoomFactor,
} from "advanced-cropper/extensions/absolute-zoom";
import { Spinner } from "./Spinner";

import classNames from "classnames";
import helpUrl from "../assets/help.svg";

import classes from "./CropperWrapper.module.css";
import { Navigation } from "./Navigation";

export interface CropperWrapperProps {
  cropper?: CropperRef;
  loading: boolean;
  loaded: boolean;
  validating?: boolean;
  className?: string;
}

export const CropperWrapper: FC<CropperWrapperProps> = ({
  cropper,
  loaded,
  loading,
  children,
  className,
  validating,
}) => {
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
        <button
          className={classes.helpButton}
          onClick={() => console.log("adwdadad")}
        >
          <img src={helpUrl} />
        </button>
        <Navigation
          className={classes.navigation}
          zoomAmount={absoluteZoom * 100}
          onZoomChange={(zoomAmount) => onZoom(zoomAmount / 100, false)}
        />
      </CropperFade>
      <Spinner
        className={classNames(classes.spinner, {
          [classes["spinner--visible"]]: shouldSpin,
        })}
      />
    </div>
  );
};
