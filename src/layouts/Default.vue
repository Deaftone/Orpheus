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
  <div class="flex h-screen min-h-screen flex-col">
    <!-- Menu bar -->
    <header class=" bg-red-50">
      <TitleBar v-if="isTauri()" />
    </header>
    <div class="flex flex-1 flex-row overflow-y-hidden">
      <div class="flex flex-1 flex-col">
        <!-- Header bar -->
        <header class="w-full ">
          <MenuBar />
        </header>
        <!-- main container -->
        <main
          id="main"
          class="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500"
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

      <nav class="order-first overflow-y-auto bg-neutral ">
        <LeftSidebar />
      </nav>

      <!--       <aside class="overflow-y-auto bg-yellow-100 sm:w-32">
        Right Sidebar
      </aside> -->
    </div>
    <footer class="bg-gray-100">
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
