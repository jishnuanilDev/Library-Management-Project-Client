import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If you were using any tailwind or flowbite-related configurations, remove them
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", 
    assetsDir: "assets", // Organizes assets properly
    emptyOutDir: true, // Clears the directory before building
  },
});
