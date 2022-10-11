import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";

const baseId = "dmg-photo-validation";
const scriptId = `${baseId}-lib`;
const reactRootId = `${baseId}-root`;

try {
  const fieldId = document
    .getElementById(scriptId)
    ?.getAttribute("data-field-id");

  if (!fieldId) {
    throw new Error(
      "Could not find the 'data-field-id' attribute in the script tag."
    );
  }

  const field = document.getElementById(fieldId);
  if (field?.tagName !== "INPUT" || field.getAttribute("type") !== "file") {
    throw new Error("Given field is not a file input type.");
  }

  let rootElement = document.getElementById(reactRootId) as HTMLElement;
  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = reactRootId;
    document.body.insertBefore(rootElement, null);
  }

  ReactDOM.render(
    <React.StrictMode>
      <App fieldId={fieldId} />
    </React.StrictMode>,
    rootElement
  );
} catch (error) {
  console.error(error);
}
