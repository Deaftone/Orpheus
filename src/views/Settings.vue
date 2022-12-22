<script>
import { ref } from 'vue'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

export default {
  setup (props) {
    const disabled = ref(false)
    async function update () {
      disabled.value = true
      try {
        const { shouldUpdate, manifest } = await checkUpdate()
        if (shouldUpdate) {
          // display dialog
          await installUpdate()
          // install complete, restart app
          await relaunch()
        }
      } catch (error) {
        disabled.value = false
        console.log(error)
      }
    }
    return { update, disabled }
  }
}
</script>

<template>
  <div class="flex flex-col flex-1 pt-10 pb-10 pl-24 pr-24 m-10 rounded-md shadow-md mr-36 ml-36 h-1/2 bg-neutral">
    <h1 class="font-bold">
      Server settings
    </h1>
    <div class="divider" />
    <div class="flex form-control">
      <label class="flex label">
        <span class="label-text">Server address</span>
      </label>
      <label class="input-group">
        <input
          type="text"
          placeholder="http://localhost:3030"
          class="input input-bordered"
        >
      </label>
    </div>
    <div class="flex form-control">
      <label class="flex label">
        <span class="label-text">Server type</span>
      </label>
      <select class="w-full max-w-xs select select-bordered">
        <option
          disabled
          selected
        >
          Deaftone
        </option>
        <option>Subsonic</option>
        <option>Navidrome</option>
      </select>
    </div>
    <div class="flex justify-center">
      <button class="btn btn-primary">
        Save
      </button>
    </div>
    <div class="divider" />
    <button
      :class="{'btn-disabled': disabled}"
      class="btn btn-primary"
      @click="update()"
    >
      Update
    </button>
  </div>
</template>

<style scoped>

</style>
