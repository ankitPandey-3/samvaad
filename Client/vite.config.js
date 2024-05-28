import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: createProxy({
      '/api': 'https://video-chat-application-mern.onrender.com'
    })
  }

})
