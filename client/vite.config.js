import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // fix loi caught ReferenceError: global is not defined
  define: {
    "global" : 'window'
  }
})
