import React from "react";
import { Router, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";

import history from "./utilities/history";
import PrivateRoute from "./utilities/privateRoute";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
require("dotenv").config();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#58a5f0",
      main: "#FA2D2D",
      dark: "#004c8c",
    },
    secondary: {
      light: "#ffd95a",
      main: "#f9a825",
      dark: "#c17900",
      contrastText: "#212121",
    },
    background: {
      default: "#f0f0f0",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Router history={history}>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/chat" component={Chat} />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
