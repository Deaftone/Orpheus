<script>
import { appWindow } from '@tauri-apps/api/window'
export default {
  name: 'TitleBar',
  setup () {
    function close () {
      appWindow.close()
    }
    function toggleMaximize () {
      appWindow.toggleMaximize()
    }
    function minimize () {
      appWindow.minimize()
      // appWindow.res
    }

    return {
      close,
      toggleMaximize,
      minimize
    }
  }
}
</script>

<template>
  <div
    id="titleBar"
    data-tauri-drag-region
    class="pt-1 pb-5 titlebar bg-neutral text-primary"
  >
    <font-awesome-icon
      id="minIcon"
      class="cursor-pointer text-primary titlebar-button hover:text-primary-focus"
      icon="window-minimize"
      color="gray"
      @click="minimize"
    />
    <font-awesome-icon
      class="cursor-pointer text-primary titlebar-button hover:text-primary-focus"
      icon="window-maximize"
      color="gray"
      @click="toggleMaximize"
    />
    <font-awesome-icon
      class="cursor-pointer text-primary titlebar-button hover:text-primary-focus"
      icon="window-close"
      color="gray"
      @click="close"
    />
  </div>
</template>

<style scoped>
.titlebar {
  height: 20px;
  user-select: none;
  display: flex;
  justify-content: flex-end;

}
.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 15px;
}
</style>
