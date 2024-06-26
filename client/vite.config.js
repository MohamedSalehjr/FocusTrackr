
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __Backend_ENV__: process.env.VITE_BACKEND_URL,
    __Clerk_ENV__: process.env.VITE_CLERK_PUBLISHABLE_KEY
  }
})
