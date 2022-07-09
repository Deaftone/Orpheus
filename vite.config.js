import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
// import path from 'path'
// import ViewLauncherVuePlugin from '@view-launcher/rollup-plugin-vue'
export default defineConfig(() => {
  // load the .env file
  // you may want to create one like `.env.development.local`
  // const env = loadEnv(mode, __dirname)

  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          nested: resolve(__dirname, 'splashscreen.html'),
        },
        output: {
          inlineDynamicImports: true,
        },
      },
    },
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    // base: path.resolve(__dirname, './dist/'),
    plugins: [
      /*       ViewLauncherVuePlugin({
        entry: path.resolve(__dirname, 'src/main.js'),
        theme: 'dark',
        editor: env.VITE_EDITOR || 'vscode',
      }), */
      vue(),

    ],
    define: {
      'process.env': {},
    },
  }
})
