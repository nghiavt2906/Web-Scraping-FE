import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

import App from "./App";

import store from "./store";

import "bootstrap/scss/bootstrap.scss";
import "react-toastify/scss/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
