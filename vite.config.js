import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://b10-a11-server-side-chi.vercel.app",
        changeOrigin: true,
        secure: false,
        withCredentials: true,
      },
    },
  },
});
