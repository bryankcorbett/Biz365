import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  publicDir: "./static",
  base: "./",
  css: {
    postcss: './postcss.config.js',
  },
  define: {
    // Force rebuild when environment variables change
    __BUILD_TIMESTAMP__: JSON.stringify(new Date().toISOString()),
    __GIT_COMMIT__: JSON.stringify(process.env.GIT_COMMIT || 'unknown'),
    __GIT_BRANCH__: JSON.stringify(process.env.GIT_BRANCH || 'unknown'),
  },
  build: {
    // Force no-cache rebuild if NEXT_PUBLIC_* changed
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    }
  }
}));



