<script>
import { inject, onMounted } from 'vue'

export default {
  components: {
  },

  setup () {
    const deaftone = inject('$deaftone')
    onMounted(async () => {
      if (!deaftone.hasInit) {
        await deaftone.init()
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
