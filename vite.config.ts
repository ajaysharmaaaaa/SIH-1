import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
    process: {
      env: {},
      stdout: { isTTY: false },
      stderr: { isTTY: false },
      platform: 'browser',
      version: '',
      versions: { node: '' },
      cwd: () => '/',
      nextTick: (cb: Function) => setTimeout(cb, 0)
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
