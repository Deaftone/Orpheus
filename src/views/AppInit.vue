<script>
import axios from 'axios'
import { ref, inject, onMounted } from 'vue'
import TitleBar from '../components/Main/TitleBar.vue'
import axiosTauriAdapter from 'axios-tauri-adapter'

export default {
  name: 'AppInit',
  components: {
    TitleBar
  },
  props: {
    msg: String
  },
  setup () {
    const address = ref('')
    const selected = ref('A')
    const deaftone = inject('$deaftone')
    const settings = inject('$settings')
    const router = inject('$router')
    const iAxios = axios.create({
      adapter: window.__TAURI__ ? axiosTauriAdapter : null,
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' }
    })
    const options = ref([
      { text: 'Deaftone', value: 'A' },
      { text: 'Subsonic', value: 'B' }
    ])
    function goHome () {
      this.$router.push({ path: '/home' })
      console.log(this)
    }
    onMounted(async () => {
      console.log(`Addresss ${await settings.get('server')
    }`)
    })
    async function connect () {
      try {
        const status = await iAxios.get(address.value)
        if (status.status === 200) {
          settings.set('server', address.value).then(async () => {
            console.log('Set server address')
            await deaftone.init()
            router.push({ path: '/home' })
          })
        }
      } catch (error) {
        console.log('Failed to connect to server')
        router.push({ path: '/init' })
      }

      console.log(status)
      console.log(selected.value)
      console.log(address.value)
    }
    return {
      goHome,
      connect,
      selected,
      options,
      address
    }
  }
}
</script>

<template>
  <TitleBar />
  <!--   <div
    class="grid justify-center"
  >
    <a>test</a>

    <button
      class="btn btn-primary"
      @click="$router.push({ path: '/home' })"
    />
  </div> -->
  <!--   <div class="flex flex-col items-center justify-center flex-1 h-full pt-10 pb-10 pl-24 pr-24 m-10 rounded-md shadow-md mr-36 ml-36 bg-neutral w-ful">
    <h1 class="font-bold">
      Setup
    </h1>
    <div class="divider" />
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

      <div class="flex form-control">
        <label class="flex label">
          <span class="label-text">Server address</span>
        </label>
        <input
          type="text"
          placeholder="Server address"
          class="w-full max-w-xs input input-bordered"
        >
      </div>
    </div>

    <div class="divider" />
    <button
      :class="{'btn-disabled': disabled}"
      class="btn btn-primary"
      @click="update()"
    >
      Update
    </button>
  </div> -->
  <!-- Height hack is needed for menubar -->

  <div
    class="flex flex-col items-center justify-center flex-1 pt-10 pb-10 pl-24 pr-24 m-10 rounded-md shadow-md mr-36 ml-36 bg-neutral w-ful"
    style="height: 90vh"
  >
    <h1 class="font-bold">
      Setup
    </h1>
    <div class="divider" />
    <div class="flex form-control">
      <label class="flex label">
        <span class="label-text">Server type</span>
      </label>
      <!--       <select class="w-full max-w-xs select select-bordered">
        <option
          disabled
          selected
        >
          Deaftone
        </option>
        <option>Subsonic</option>
        <option>Navidrome</option>
      </select> -->
      <select
        v-model="selected"
        class="w-full max-w-xs select select-bordered"
      >
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <option
          v-for="option in options"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <div class="flex form-control">
        <label class="flex label">
          <span class="label-text">Server address</span>
        </label>
        <input
          type="text"
          v-model="address"
          placeholder="Server address"
          class="w-full max-w-xs input input-bordered"
        >
      </div>
    </div>

    <div class="divider" />
    <button
      class="btn btn-primary"
      @click="connect()"
    >
      Connect
    </button>
  </div>
</template>
