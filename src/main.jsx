import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/router.jsx";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster />
  </StrictMode>
);
