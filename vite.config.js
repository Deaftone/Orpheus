import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
const internalIp = require('internal-ip')
const { resolve } = require('path')
// import path from 'path'
// import ViewLauncherVuePlugin from '@view-launcher/rollup-plugin-vue'
export default defineConfig(() => {
  // load the .env file
  // you may want to create one like `.env.development.local`
  // const env = loadEnv(mode, __dirname)
  const host = internalIp.v4
  return {
    build: {
      target: ['es2021', 'chrome97', 'safari13'],
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      sourcemap: !!process.env.TAURI_DEBUG,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
          // nested: resolve(__dirname, 'splashscreen.html')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      host: '0.0.0.0', // listen on all addresses
      port: 5173,
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host,
        port: 5183
      },
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..']
      }
    },
    // base: path.resolve(__dirname, './dist/'),
    plugins: [
      /*       ViewLauncherVuePlugin({
        entry: path.resolve(__dirname, 'src/main.js'),
        theme: 'dark',
        editor: env.VITE_EDITOR || 'vscode',
      }), */
      vue(),
      Layouts({
        defaultLayout: 'Default'
      })

    ],
    define: {
      'process.env': {}
    }
  }
})
