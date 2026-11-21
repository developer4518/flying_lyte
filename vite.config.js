import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_API_BASE_URL: packageApiTarget } = loadEnv(mode, process.cwd(), "VITE_API_BASE_URL");

  return {
    plugins: [react(), tailwindcss()],

    server: {
      allowedHosts: ["tour-olympic-strategy-exploring.trycloudflare.com"],
      // The public catalogue is also browsable from the local staging preview.
      proxy: packageApiTarget ? {
        "/api/package/packages/": {
          target: packageApiTarget,
          changeOrigin: true,
        },
        "/api/package/gallery/": {
          target: packageApiTarget,
          changeOrigin: true,
        },
      } : undefined,
    },

    build: {
      target: "es2015",
      cssTarget: "chrome61",
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            query: ["@tanstack/react-query"],
            icons: ["lucide-react"],
          },
        },
      },
    },

    esbuild: {
      target: "es2015",
    },

    optimizeDeps: {
      esbuildOptions: {
        target: "es2015",
      },
    },
  };
});
