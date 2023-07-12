import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    host: "0.0.0.0",
    proxy: {
      '^/server/.*': {
        target: 'http://54.151.125.63:8000/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/server/, ''),
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#27a43a',
          // 'primary-color': '#f61',
        },
        javascriptEnabled: true
      }
    }
  }
})

