import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'app_icon_192x192.png',
        'app_icon_512x512.png'
      ],
      manifest: {
        short_name: 'Planner',
        name: 'Daily Activity Planner',
        icons: [
          {
            src: '/app_icon_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/app_icon_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#1976d2',
        background_color: '#ffffff'
      }
    })
  ],
  build: {
    outDir: 'dist' 
  }
})
