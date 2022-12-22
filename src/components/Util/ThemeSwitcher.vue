<script>
import { useGenericStore } from '@/stores/generic'
export default {
  setup () {
    const store = useGenericStore()
    const themes = [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter'

    ]
    function themeSwitch (theme) {
      document.documentElement.setAttribute('data-theme', theme)
      store.setCurrentTheme(theme)
    }
    return { themes, themeSwitch }
  }
}
</script>
<template>
  <div
    title="Change Theme"
    class="dropdown dropdown-end"
  >
    <div class="dropdown">
      <div
        tabindex="0"
        class="m-1 btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current md:mr-2"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        /></svg> <span class="hidden md:inline">
          Change Theme
        </span> <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1792 1792"
          class="inline-block w-4 h-4 ml-1 fill-current"
        ><path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" /></svg>
      </div>
      <ul
        tabindex="0"
        class=" scrollbar-thin  scrollbar-track-gray-800 scrollbar-thumb-gray-500 dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16"
      >
        <div
          class="grid grid-cols-1 p-1"
          v-for="theme in themes"
          :key="theme"
          :data-set-theme="theme"

          @click="themeSwitch(theme)"
        >
          <div
            class="overflow-hidden rounded-lg outline-base-content outline-2 outline-offset-2"
            data-act-class="outline"
            :data-set-theme="theme"
          >
            <div
              class="w-full font-sans cursor-pointer bg-base-100 text-base-content"
              :data-set-theme="theme"
            >
              <div class="grid grid-cols-5 grid-rows-3">
                <div class="flex col-span-5 row-span-3 row-start-1 gap-1 px-4 py-3">
                  <div class="flex-grow text-sm font-bold">
                    {{ theme }}
                  </div>
                  <div class="flex flex-wrap flex-shrink-0 gap-1">
                    <div class="w-2 rounded bg-primary" />
                    <div class="w-2 rounded bg-secondary" />
                    <div class="w-2 rounded bg-accent" />
                    <div class="w-2 rounded bg-neutral" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
