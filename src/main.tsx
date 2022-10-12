import React from "react";
import ReactDOM from "react-dom";

// import external CSS resources
import "react-advanced-cropper/dist/style.css";
import "@fontsource/lato";

import App from "./App";

import "./variables.css";

const baseId = "dmg-photo-validation";
const reactRootId = `${baseId}-root`;

interface ListenForValidationArgs {
  fieldIds: string[];
}

export const validatePhotoFields = ({ fieldIds }: ListenForValidationArgs) => {
  for (const fieldId of fieldIds) {
    const field = document.getElementById(fieldId);
    if (field?.tagName !== "INPUT" || field.getAttribute("type") !== "file") {
      console.error(`Given field id is not a file input type: ${fieldId}.`);
      return;
    }
  }

  let rootElement = document.getElementById(reactRootId) as HTMLElement;
  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = reactRootId;
    document.body.insertBefore(rootElement, null);
  }

  ReactDOM.render(
    <React.StrictMode>
      <App fieldIds={fieldIds} />
    </React.StrictMode>,
    rootElement
  );
};
