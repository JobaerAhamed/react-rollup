import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const targetDivId = "cool-lib-root";

let reactRendered = false;

function RenderReact(element: HTMLElement) {
  const root = ReactDOM.createRoot(element);
  if (!reactRendered) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
  reportWebVitals();
  reactRendered = true;
}

(() => {
  let targetDiv = document.getElementById(targetDivId);
  if (targetDiv) {
    RenderReact(targetDiv);
  } else {
    targetDiv = document.createElement("div");
    targetDiv.id = targetDivId;
    document.body.prepend(targetDiv);

    RenderReact(targetDiv);
  }
})();
