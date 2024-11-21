import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.VITE_FORTNITE_API_KEY': JSON.stringify(env.VITE_FORTNITE_API_KEY)
    },
    server: {
      open: true,
      host: true
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['axios', 'lucide-react']
          }
        }
      }
    }
  };
});