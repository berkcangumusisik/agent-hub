import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base path differs per deploy target:
//   - GitHub Pages (project site): VITE_BASE=/agent-hub/  (set in the deploy workflow)
//   - Coolify / custom domain / local: defaults to "/"
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/",
});
