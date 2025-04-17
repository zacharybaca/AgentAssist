import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, "VITE_");

  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
      "process.env": {
        VITE_APP_ENV: JSON.stringify(env.VITE_APP_ENV),
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
      },
    },
    server: {
      proxy:
        mode === "development"
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
