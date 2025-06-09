import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    allowedHosts: ['iwms.rostek.space'], // allow all incoming hosts
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  preview: {
    port: 8080,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: ['iwms.rostek.space'], // allow all incoming hosts
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['zod'],
  },
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ['module', 'main'],
    }
  },
}));
