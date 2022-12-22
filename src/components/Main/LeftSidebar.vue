<script>
export default {
  setup () {
    const routes = [
      { name: 'Home', route: '/', icon: 'home' },
      { name: 'Artists', route: '/ArtistList', icon: 'microphone-alt' },
      { name: 'Albums', route: '/AlbumDetails', icon: 'compact-disc' }
    ]
    return {
      routes
    }
  }
}
</script>

<template>
  <nav class="h-full ">
    <div
      v-for="route in routes"
      :key="route.name"
      :data-tip="route.name"
      @click="$router.push({ path: route.route })"
      class="relative flex items-center justify-center w-12 h-12 mx-auto mt-2 mb-2 text-green-500 transition-all duration-300 ease-linear bg-gray-400 shadow-lg cursor-pointer tooltip tooltip-right hover:bg-green-600 dark:bg-base-100 hover:text-white hover:rounded-xl rounded-3xl hover:bg-primary"
    >
      <font-awesome-icon
        :icon="route.icon"
        class=""
        color="gray"
      />
    </div>
    <div class="divider" />

    <div class="absolute bottom-0 w-full text-center">
      <div
        @click="$router.push({ path: '/Settings' })"
        data-tip="Settings"
        class="relative flex items-center justify-center w-12 h-12 mx-auto mt-2 mb-2 text-green-500 align-bottom transition-all duration-300 ease-linear bg-gray-400 shadow-lg cursor-pointer tooltip tooltip-right hover:bg-green-600 dark:bg-base-100 hover:text-white hover:rounded-xl rounded-3xl hover:bg-primary"
      >
        <font-awesome-icon
          icon="cog"
          color="gray"
        />
      </div>
    </div>
  </nav>
</template>
