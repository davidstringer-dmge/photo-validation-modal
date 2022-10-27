import classNames from "classnames";
import { MouseEventHandler } from "react";

import closeUrl from "../assets/cancel.svg";
import guidelineUrl from "../assets/guideline.jpg";

import s from "./HelpSection.module.css";

type HelpSectionProps = {
  onClose?: MouseEventHandler;
};

export const HelpSection = (props: HelpSectionProps) => {
  return (
    <div className={classNames(s.container, s.scrollGradient)}>
      <div className={s.guidelines}>
        <button className={s.closeButton} onClick={props.onClose}>
          <img src={closeUrl} />
        </button>
        <h1>Photo Guidelines</h1>
        <p>
          For your photo to be validated properly, please follow the guidelines
          below:
        </p>
        <ul>
          <li>Picture must be in JPG format</li>
          <li>The file has to be less than 2MB in size</li>
          <li>Taken within the last 6 months</li>
          <li>Taken against a plain cream or light grey background</li>
          <li>Clear and in focus</li>
          <li>Without any creases or tears</li>
          <li>Unmarked on both sides</li>
          <li>Unaltered by computer software</li>
          <li>Be in clear contrast to the background</li>
          <li>Be facing forward and looking straight at the camera</li>
          <li>Be a close-up of your full head and upper shoulders</li>
          <li>Have a neutral expression and mouth closed</li>
          <li>
            Have your eyes open, visible and free from reflection or glare from
            glasses
          </li>
          <li>Not have hair in front of your eyes</li>
          <li>Not have anything covering your face</li>
          <li>Not have any 'red eye'</li>
          <li>Not have any shadows on your face or behind you</li>
        </ul>
      </div>
      <div className={s.example}>
        <h2>Example</h2>
        <img className={s.exampleImage} src={guidelineUrl} width="200px" />
      </div>
    </div>
  );
};
