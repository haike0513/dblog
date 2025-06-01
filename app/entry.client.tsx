// react router template

// import React from "react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
// import { HydratedRouter } from "react-router/dom";
import App  from "./App.tsx";
declare global {
  interface Window {
    __INITIAL_STATE__?: any;
  }
}
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      {/* <HydratedRouter /> */}
      <App />
    </StrictMode>
  );
});
