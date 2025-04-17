import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load env variables from `.env`, `.env.development`, or `.env.production`
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV), // Optional: your custom env
    },
    server: {
      proxy: mode === "development"
        ? {
            "/api": {
              target: "http://localhost:9000",
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },
  };
});
