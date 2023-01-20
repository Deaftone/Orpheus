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
    class="flex flex-col items-left h-full p-3 transition-[width] duration-300 ease-in-out gap-3 overflow-hidden"
    :class="expanded ? 'w-48' : 'w-[72px]' "
  >
    <div
      @click="expand"
      class="flex justify-center"
    >
      <VLazyImage
        :src="imgUrl"
        :src-placeholder="imgUrl"
        class="w-12 h-12 rounded-3xl"
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
        class="flex items-center justify-start h-12 transition-[width] duration-300 ease-in-out rounded cursor-pointer hover:text-white hover:rounded-xl hover:bg-neutral-content bg-base-300"
        :class="expanded ? 'w-[168px] ' : 'w-[48px]' "
      >
        <font-awesome-icon
          :icon="route.icon"
          class="justify-center w-12"
          color="gray"
        />
        <div
          class="pl-5"
          :class="expanded ? 'visible' : 'hidden' "
        >
          <span
            class="font-bold "
          >{{ route.name }}</span>
        </div>
      </div>
    </div>

    <div
      @click="$router.push({ path: '/Settings' })"
      data-tip="Settings"
      class="flex items-center justify-start h-12 mt-auto duration-200 rounded cursor-pointer hover:text-white hover:rounded-xl hover:bg-neutral-content bg-base-300"
      :class="expanded ? 'w-[168px] ' : 'w-[48px]' "
    >
      <font-awesome-icon
        icon="cog"
        color="gray"
        class="justify-center w-12"
      />
      <div
        class="pl-5 duration-300 delay-300 "
        :class="expanded ? 'visible' : 'hidden' "
      >
        <span
          class="w-full font-bold"
        >Settings</span>
      </div>
    </div>
  </div>
</template>
