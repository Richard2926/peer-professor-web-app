import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "index.css";
import App from "App";
import reportWebVitals from "reportWebVitals";
import configureStore from "redux/configureStore";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import interceptors from "services/interceptors";
import theme from "theme/index";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

interceptors(store);
reportWebVitals();
