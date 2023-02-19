import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { ToastContainer } from "react-toastify";
import { theme } from "./theme";
import { store } from "./store";
import { setAuthUserByToken } from "./pages/auth/store/actions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

var token = localStorage.getItem("token");
if (token) {
  setAuthUserByToken(token, store.dispatch);
}
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ToastContainer
          autoClose={500}
          position="top-right"
          closeOnClick
          hideProgressBar={true}
        />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
