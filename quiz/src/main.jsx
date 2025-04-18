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
import { ToastContainer } from "react-toastify";
import "yet-another-react-lightbox/styles.css";
import i18n from "./utils/i18n";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HeroUIProvider>
        <Toaster position="top-right" />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Layout />
      </HeroUIProvider>
    </PersistGate>
  </Provider>
);
