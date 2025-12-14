import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  base: "/",        // 🔥 REQUIRED FOR NETLIFY
  build: {
    outDir: "dist", // 🔥 REQUIRED
  },
})
