<script>
import { invoke } from '@tauri-apps/api'
import { inject, onMounted, onUnmounted } from 'vue'
export default {
  components: {
  },

  setup () {
    const deaftone = inject('$deaftone')
    const settings = inject('$settings')
    const router = inject('$router')
    const player = inject('$player')

    console.log('Loading splash')
    router.push({ path: '/' })

    function loaded () {
      console.log('Splash removed')
      invoke('close_splashscreen')
    }

    /*     document.addEventListener('DOMContentLoaded', () => {
      // This will wait for the window to load, but you could
      // run this function on whatever trigger you want
      if (isTauri()) { loaded() }
    }) */

    onUnmounted(() => {
      deaftone.hasInit = false
    })
    onMounted(async () => {
      if (!deaftone.hasInit) {
        await deaftone.init()
        loaded()
        try {
          const status = await deaftone.testConnection(await settings.get('server'))
          if (status.status === 200) {
            console.log('Connected to sesrver')
            setTimeout(() => {
              // player.resume()
              router.push({ path: '/home' })
            }, 1000)
          } else {
            console.log('Failed to connect')
            router.push({ path: '/init' })
          }
        } catch (e) {
          router.push({ path: '/init' })
        }
      }
    })
  }
}
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>

<style>
:root {
  --slider-connect-bg: hsl(var(--p));
  --slider-handle-ring-color: hsl(var(--af));
  --slider-handle-bg: hsl(var(--pf));
  --slider-bg: hsl(var(--b3));
  --slider-handle-width: 13px;
  --slider-handle-height: 13px;
  --slider-height: 8px;
  --slider-handle-ring-width: 3px;
  --slider-tooltip-radius: 3px;

}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
