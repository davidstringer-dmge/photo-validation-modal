import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.tsx"),
      name: "MyLib",
      // The proper extensions will be added
      fileName: "my-lib",
    },
    rollupOptions: {},
  },
  define: {
    // React requires this to be replaced to build properly in production
    "process.env.NODE_ENV": `"${process.env.NODE_ENV ?? "development"}"`,
  },
});
