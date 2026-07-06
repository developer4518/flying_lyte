import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    allowedHosts: ["tour-olympic-strategy-exploring.trycloudflare.com"],
  },

  build: {
    target: "es2015",
    cssTarget: "chrome61",
    chunkSizeWarningLimit: 1800,
  },

  esbuild: {
    target: "es2015",
  },

  optimizeDeps: {
    esbuildOptions: {
      target: "es2015",
    },
  },
});
