import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Small assets inlined as base64 (avoids tiny HTTP requests)
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        // Manual chunk splitting for long-term browser caching.
        //
        // Only list packages src/ actually imports. ADO-427 found a 'three'
        // entry for three/@react-three even though nothing imported them: the
        // emitted chunk held react-dom (dragged in transitively), so 174 KB of
        // React was shipped under a misleading name while `react-vendor` was
        // only 12 KB. react-dom is named explicitly here so it stays in the
        // long-lived vendor chunk instead of being rebuilt with app code.
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-dom/client', 'scheduler'],
          'router': ['react-router-dom'],
          'mui': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'mui-icons': ['@mui/icons-material'],
          'motion': ['framer-motion'],
          'helmet': ['react-helmet-async'],
        },
      },
    },

    sourcemap: false,
    target: 'es2020',
    chunkSizeWarningLimit: 600,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
  },
})
