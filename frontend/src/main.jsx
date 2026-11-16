import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/store/store.js";
import "./app/styles/_globals.scss";
import { AuthProvider } from "./shared/context/AuthContext.jsx";
import {FavouritesProvider} from "./shared/context/FavouritesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <FavouritesProvider>
              <App />
          </FavouritesProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
