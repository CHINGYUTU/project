import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  server:{
    host: '0.0.0.0',
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
      },
      '/admin': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
      },
      '/pic': {
        target: 'https://image.11236027.me/api/index.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pic/, '')
      }
    }
  },
  build: {
    outDir: 'dist', // 输出目录
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
})
