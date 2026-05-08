import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// GitHub Pages needs a port during build, but doesn't use it for serving.
// We'll default to 5173 if the environment variable is missing.
const port = Number(process.env.PORT) || 5173;

// For GitHub Pages, this should be your repo name: '/iYOUnic_Website_V2.2/'
// We use a fallback so it doesn't crash during local builds.
const basePath = process.env.BASE_PATH || '/iYOUnic_Website_V2.2/';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    // Only run the Replit error overlay in development
    process.env.NODE_ENV !== "production" && runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ].filter(Boolean), // Filters out the false/undefined plugins
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    // Changing this to just 'dist' makes deployment much easier
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
