<script>
import Player from '@/components/Player/Player.vue'
import NewPlayer from '@/components/Player/NewPlayer.vue'

import MenuBar from '@/components/Main/MenuBar.vue'
import TitleBar from '@/components/Main/TitleBar.vue'
import RightSidebar from '@/components/Main/RightSidebar.vue'
import LeftSidebar from '@/components/Main/LeftSidebar.vue'
import ConnectionModal from '@/components/Modal/ConnectionModal.vue'

export default {

  components: {
    Player,
    TitleBar,
    MenuBar,
    RightSidebar,
    LeftSidebar,
    NewPlayer,
    ConnectionModal
  },
  setup () {
    function isTauri () {
      if (window.__TAURI__) {
        return true
      } return false
    }
    /*     function handleScroll () {
      console.log('Got scroll')
      const scrollBtn = this.$refs.scrollToTop

      if (window.scrollY > 0) {
        scrollBtn.classList.remove('invisible')
      } else {
        scrollBtn.classList.add('invisible')
      }
    }
    function scrollTop () {
      console.log('test')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } */
    /*     onBeforeMount(() => {
      window.removeEventListener('scroll', handleScroll)
    }) */
    return {
      // scrollTop,
      isTauri
    }
  }
}
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <TitleBar v-if="isTauri()" />
    <div class="flex flex-col flex-grow w-full h-full overflow-hidden sm:flex-row">
      <div class="flex-grow-0 flex-shrink hidden p-3 md:inline-flex bg-neutral md:visible">
        <div class="sticky top-0 flex rounded-xl">
          <LeftSidebar />
        </div>
      </div>
      <div class="flex flex-col justify-between w-full">
        <header>
          <MenuBar />
        </header>
        <main
          role="main"
          class="flex-1 overflow-y-scroll scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500 hover:scrollbar-thumb-green-700"
        >
          <router-view v-slot="{ Component }">
            <Suspense>
              <component :is="Component" />
              <template #fallback>
                <h1>test</h1>
              </template>
            </Suspense>
          </router-view>
        </main>
      </div>
      <div
        class="flex flex-col w-64 bg-neutral"
        v-if="false"
      >
        <RightSidebar />
      </div>
    </div>
    <footer class="flex text-center bg-base-200">
      <NewPlayer />
    </footer>
  </div>
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
