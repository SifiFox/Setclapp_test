import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": resolve("./src/components"),
      "@hooks": resolve("./src/hooks"),
      "@utils": resolve("./src/utils"),
      "@constants": resolve("./src/constants"),
      "@": resolve("./src"),
    },
  },
});
