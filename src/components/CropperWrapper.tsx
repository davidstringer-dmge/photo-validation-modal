import React, { FC } from "react";
import { CropperFade, CropperRef } from "react-advanced-cropper";
import { Spinner } from "./Spinner";

import classNames from "classnames";

import classes from "./CropperWrapper.module.css";

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
  const state = cropper?.getState();

  const shouldSpin = validating || loading;

  return (
    <div className={classNames(className)}>
      <CropperFade
        visible={state && loaded}
        className={"advanced-cropper-wrapper__fade"}
      >
        {children}
      </CropperFade>
      <Spinner
        className={classNames(classes.spinner, {
          [classes["spinner--visible"]]: shouldSpin,
        })}
      />
    </div>
  );
};
