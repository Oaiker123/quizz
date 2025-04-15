import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "sonner";
import Layout from "./layout.jsx";
import { Provider } from "react-redux";
import { store, persistor } from './redux/store';
import 'nprogress/nprogress.css';
import { PersistGate } from 'redux-persist/integration/react'
import 'react-perfect-scrollbar/dist/css/styles.css';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HeroUIProvider>
        <Toaster position="top-right" />
        <Layout />
      </HeroUIProvider>
    </PersistGate>
  </Provider>
);
