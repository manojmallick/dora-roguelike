import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: ".",
  build: {
    rollupOptions: {
      input: resolve(projectRoot, "public/index.html")
    }
  },
  server: {
    open: "/public/index.html"
  }
});
