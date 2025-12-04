import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// Plugin to copy .htaccess and _redirects to dist folder after build
const copyHtaccessPlugin = () => {
  return {
    name: 'copy-htaccess',
    closeBundle() {
      try {
        // Copy .htaccess for Apache servers
        copyFileSync(
          resolve(__dirname, 'htaccess'),
          resolve(__dirname, 'dist', '.htaccess')
        )
        console.log('✓ Copied .htaccess to dist folder')
      } catch (error) {
        console.warn('⚠ Could not copy .htaccess:', error.message)
      }
      try {
        // Copy _redirects for Netlify
        copyFileSync(
          resolve(__dirname, '_redirects'),
          resolve(__dirname, 'dist', '_redirects')
        )
        console.log('✓ Copied _redirects to dist folder')
      } catch (error) {
        console.warn('⚠ Could not copy _redirects:', error.message)
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), copyHtaccessPlugin()],
  server: { port: 5173 }
});
