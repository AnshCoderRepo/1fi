import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api-mobile": {
        target: "https://api.mobileapi.dev",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-mobile/, ""),
        configure: (proxy) => {
          proxy.on("error", (err, req, res) => {
            // Silently handle proxy lookup/DNS errors and respond with 503 so client falls back gracefully
            if (res && !res.headersSent) {
              res.writeHead(503, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Proxy unavailable", fallback: true }));
            }
          });
        },
      },
    },
  },
});
