import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "sonner";
import Layout from "./layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <Toaster position="top-right" />
      <Layout/>
    </HeroUIProvider>
  </StrictMode>
);
