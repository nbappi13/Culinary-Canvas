import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router/router";
import "./index.css";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
