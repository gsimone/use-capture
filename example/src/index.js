import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";

function Container({ children }) {
  return <div className="canvas-container">{children}</div>;
}

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
