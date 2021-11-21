import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import messaging from "../src/firebaseConfig";
import { store, persistor } from "./store";
import { App } from "./app/views/index";
import "antd/dist/antd.css";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
      messaging.onMessage((payload) => {
        console.log("onMessage: ", payload);
      });
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
