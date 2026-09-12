import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    // Must match your GitHub repo name for project-site Pages deploys
    // (https://<user>.github.io/<repo>/). Leave as '/' if you deploy to a
    // custom domain or a <user>.github.io root repo instead.
    base: '/lexcorp/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR can be disabled via DISABLE_HMR=true if you need to avoid
      // reload flicker while an agent/tool is editing files live.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
