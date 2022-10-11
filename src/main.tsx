import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

const baseId = "dmg-photo-validation";
const reactRootId = `${baseId}-root`;

interface ListenForValidationArgs {
  fieldIds: string[];
}

export const validatePhotoFields = ({ fieldIds }: ListenForValidationArgs) => {
  for (const fieldId of fieldIds) {
    const field = document.getElementById(fieldId);
    if (field?.tagName !== "INPUT" || field.getAttribute("type") !== "file") {
      throw new Error(`Given field id is not a file input type: ${fieldId}.`);
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
