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
    const alert = ref({
      show: false,
      message: ''
    })

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

    onMounted(async () => {
      console.log(`Addresss ${await settings.get('server')
    }`)
    })
    function isTauri () {
      if (window.__TAURI__) {
        return true
      } return false
    }
    async function connect () {
      alert.value = {
        show: false
      }
      try {
        const status = await iAxios.get(address.value)
        if (status.status === 200) {
          /*           settings.set('server', address.value).then(async () => {
            console.log('Set server address')
            await deaftone.init()
            router.push({ path: '/home' })
          }) */

          await deaftone.init()
          router.push({ path: '/home' })
        }
      } catch (error) {
        alert.value = {
          show: true,
          message: error
        }
        console.log(`Failed to connect to server ${error}`)
        router.push({ path: '/init' })
      }

      console.log(status)
      console.log(selected.value)
      console.log(address.value)
    }
    return {
      alert,
      connect,
      selected,
      options,
      address,
      isTauri
    }
  }
}
</script>

<template>
  <TitleBar v-if="isTauri()" />

  <!--
  <div
    class="flex flex-col items-center justify-center flex-1 pt-10 pb-10 pl-24 pr-24 m-10 rounded-md shadow-md mr-36 ml-36 bg-neutral w-ful"
    style="height: 90vh"
  >
    <h1 class="font-bold">
      Setup
    </h1>
    <div class="flex form-control">
      <label class="flex label">
        <span class="label-text">Server type</span>
      </label>

      <select
        v-model="selected"
        class="w-full max-w-xs select select-bordered"
      >
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
    <button
      class="mt-5 btn btn-primary"
      @click="connect()"
    >
      Connect
    </button>
    <div
      class="mt-5"
    >
      <div
        class="shadow-lg alert alert-error"
        v-if="alert.show"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="flex-shrink-0 w-6 h-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg>
          <span>Error! Failed to connect to server. {{ alert.message }}</span>
        </div>
      </div>
    </div>
  </div> -->

  <div
    class="flex flex-col items-center justify-center"
    style="height: 90vh"
  >
    <div class="px-8 py-6 mt-4 text-left shadow-2xl bg-base-300">
      <h3 class="text-2xl font-bold text-center">
        Connect to Deaftone
      </h3>
      <div>
        <div class="mt-4">
          <div>
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

            <!--             <label
              class="block"
              for="email"
            >Email<label>
              <input
                type="text"
                placeholder="Email"
                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-bg-primary-focus"
              >
            </label></label> -->
          </div>
          <div class="mt-4">
            <label class="label ">
              <span class="label-text 00">Your Deaftone address</span>
            </label>
            <label class="input-group ">
              <span class="bg-base-200">Address</span>
              <input
                type="text"
                v-model="address"
                placeholder="http://localhost:3030"
                class="input input-bordered"
              >
            </label>
          </div>
          <div class="flex items-baseline justify-center">
            <button
              class="px-6 py-2 mt-4 btn btn-primary"
              @click="connect()"
            >
              Connect
            </button>
            <!--             <a
              href="#"
              class="text-sm text-blue-600 hover:underline"
            >Forgot password?</a> -->
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-11"
    >
      <div
        class="shadow-lg alert alert-error"
        v-if="alert.show"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="flex-shrink-0 w-6 h-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg>
          <span>Error! Failed to connect to server. {{ alert.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
