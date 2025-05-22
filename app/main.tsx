// import React from "react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
// import { HydratedRouter } from "react-router/dom";
import App  from "./App.tsx";
import "./styles.css";

startTransition(() => {
  hydrateRoot(
    document,
      <App />
    // <StrictMode>
    //   <HydratedRouter />
    // </StrictMode>
  );
});
