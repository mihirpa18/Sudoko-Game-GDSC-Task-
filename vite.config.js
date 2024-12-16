import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external access via IPv4 (sets the host to 0.0.0.0)
    port: 3000, // Optional: Specify a port (default is 5173, but 3000 is more common)
  },
})
