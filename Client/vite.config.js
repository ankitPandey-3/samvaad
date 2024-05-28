import { defineConfig } from 'vite'
import { createProxy } from 'http-proxy-middleware'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: createProxy({
      '/api': {
        target: 'https://video-chat-application-mern.onrender.com', // Replace with your backend URL
        changeOrigin: true,
        secure: false, // Set to false if your backend has self-signed SSL certificates
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    })
  }

})
