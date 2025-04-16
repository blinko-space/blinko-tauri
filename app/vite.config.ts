import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
import tailwindcss from '@tailwindcss/vite'
const host = process.env.TAURI_DEV_HOST || 'localhost';
const EXPRESS_PORT = 1111;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, '../shared')
    }
  },
  build: {
    watch: {},
    outDir: "dist",
    emptyOutDir: true,
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: EXPRESS_PORT,
    strictPort: false,
    host: host || false,
    hmr: {
      host: host,
      port: 2546,
      clientPort: 2546
    },
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
});
