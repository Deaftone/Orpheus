<script>
import VLazyImage from 'v-lazy-image'
import imgUrl from '@/assets/logo.png'
import { ref } from 'vue'
export default {
  components: { VLazyImage },
  setup () {
    const routes = [
      { name: 'Home', route: '/home', icon: 'home' },
      { name: 'Artists', route: '/ArtistList', icon: 'microphone-alt' },
      { name: 'Albums', route: '/AlbumDetails', icon: 'compact-disc' }
    ]
    const expanded = ref(false)

    function expand () {
      expanded.value = !expanded.value
    }
    return {
      routes,
      imgUrl,
      expand,
      expanded
    }
  }
}
</script>

<template>
  <div
    class="flex h-full flex-col gap-3 overflow-hidden p-3 transition-[width] duration-500 ease-in-out "
    :class="expanded ? 'w-48' : 'w-[72px]' "
  >
    <div
      @click="expand"
      class="flex justify-center"
    >
      <VLazyImage
        :src="imgUrl"
        :src-placeholder="imgUrl"
        class="h-12 w-12 rounded-3xl"
      />
    </div>
    <div class="divider" />
    <div
      v-for="route in routes"
      :key="route.name"
      :data-tip="route.name"
      @click="$router.push({ path: route.route })"
    >
      <div
        class="flex h-12 cursor-pointer items-center justify-start rounded bg-base-100 transition-all duration-500 ease-in-out hover:rounded-xl hover:bg-neutral-content"
        :class="expanded ? 'w-[168px] ' : 'w-[48px]' "
      >
        <font-awesome-icon
          :icon="route.icon"
          class="w-12 justify-center"
          color="gray"
        />
        <div
          class="fixed block pl-5 opacity-0 duration-500 ease-in-out "
          :class="expanded ? 'visible opacity-100' : 'h duration-300' "
        >
          <p
            class="pl-[48px] font-bold "
          >
            {{ route.name }}
          </p>
        </div>
      </div>
    </div>

    <div
      @click="$router.push({ path: '/Settings' })"
      data-tip="Settings"
      class="mt-auto flex h-12 cursor-pointer items-center justify-start rounded bg-base-100 duration-500 ease-in-out hover:rounded-xl hover:bg-neutral-content"
      :class="expanded ? 'w-[168px] ' : 'w-[48px]' "
    >
      <font-awesome-icon
        icon="cog"
        color="gray"
        class="w-12 justify-center"
      />
      <div
        class="fixed block pl-5 opacity-0 duration-500 ease-in-out"
        :class="expanded ? 'visible opacity-100' : 'h duration-300' "
      >
        <p
          class="pl-[48px] font-bold "
        >
          Settings
        </p>
      </div>
    </div>
  </div>
</template>
<style>
  .h {
    font-size: 0px;
  }
</style>
