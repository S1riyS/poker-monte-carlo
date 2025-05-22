// vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
});
