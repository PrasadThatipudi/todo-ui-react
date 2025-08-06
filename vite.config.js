import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/todo-app": {
        target: "https://todo-app-jvru.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/todo-app/, ""),
      },
    },
  },
});
