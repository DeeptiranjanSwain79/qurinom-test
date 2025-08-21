import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";
import { AuthContextProvider } from "./contexts/Auth.context";
import { NavbarContextProvider } from "./contexts/Navbar.context";
import {
  authRoutes,
  commonRoutes,
  type RouteType,
} from "./utils/Routes";
import { red, yellow1 } from "./utils/themes";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: red,
    },
    secondary: {
      main: yellow1,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", "Open Sans", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Roboto",
          "Helvetica",
          "Arial",
          "Open Sans",
          "Philosopher",
          "Noto Sans",
        ],
      },
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <NavbarContextProvider>
          <CssBaseline />
          <Toaster position="top-center" reverseOrder={false} />
          <Router>
            <Routes>
              {/* Common Routes */}
              {commonRoutes.map((item: RouteType) => {
                return (
                  <Route
                    path={item.path}
                    element={item.element}
                    key={item.path}
                  />
                );
              })}

              {/* Auth routes */}
              {authRoutes.map((item: RouteType) => {
                return (
                  <Route
                    path={item.path}
                    element={item.element}
                    key={item.path}
                  />
                );
              })}
            </Routes>
          </Router>
        </NavbarContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
