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
        const { shouldUpdate } = await checkUpdate()
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
  <div class="m-10 mx-36 flex h-1/2 flex-1 flex-col rounded-md bg-neutral py-10 px-24 shadow-md">
    <h1 class="font-bold">
      Server settings
    </h1>
    <div class="divider" />
    <div class="form-control flex">
      <label class="label flex">
        <span class="label-text">Server address</span>
      </label>
      <label class="input-group">
        <input
          type="text"
          placeholder="http://localhost:3030"
          class="input-bordered input"
        >
      </label>
    </div>
    <div class="form-control flex">
      <label class="label flex">
        <span class="label-text">Server type</span>
      </label>
      <select class="select-bordered select w-full max-w-xs">
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
      <button class="btn-primary btn">
        Save
      </button>
    </div>
    <div class="divider" />
    <button
      :class="{'btn-disabled': disabled}"
      class="btn-primary btn"
      @click="update()"
    >
      Update
    </button>
  </div>
</template>

<style scoped>

</style>
