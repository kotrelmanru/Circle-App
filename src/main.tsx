import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import store from "./store/store.ts";



const darkTheme = createTheme({
   palette: {
      mode: "dark",
   },
});

ReactDOM.createRoot(document.getElementById("root")!).render(

      <Provider store={store}>
       <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App />
         </ThemeProvider>
      </Provider>

);
