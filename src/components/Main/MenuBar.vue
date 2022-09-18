<script>
import ThemeSwitcher from '../Util/ThemeSwitcher.vue'
import SearchBox from '../Util/SearchBox.vue'

export default {
  name: 'MenuBar',
  components: {
    SearchBox,
    ThemeSwitcher
  }
}
</script>

<template>
  <div
    id="menuBar"
    style="padding:2px"
    class="navbar bg-base-100 text-neutral-content"
  >
    <div class="flex-1 lg:flex">
      <span class="text-lg font-bold">
        <button
          class="px-4 py-2 font-bold text-gray-800 co"
          @click="$router.go(-1)"
        >
          <font-awesome-icon
            icon="arrow-left"
            color="gray"
          />
        </button>
        <button
          class="px-4 py-2 font-bold text-gray-800 co"
          @click="$router.go(1)"
        >
          <font-awesome-icon
            icon="arrow-right"
            color="gray"
          />
        </button>
      </span>
    </div>
    <div class="flex-1 lg:flex-none">
      <!-- <SearchBox /> -->
    </div>
    <div class="flex-1 lg:flex-none">
      <ThemeSwitcher />
    </div>
  </div>
</template>
