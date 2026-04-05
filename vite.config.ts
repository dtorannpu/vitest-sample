/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    tsconfigPaths: true,
  },

  test: {
    globals: true,
    environment: "jsdom",
    include: ["__tests__/**/*.test.{ts,tsx}"],
  },
});
