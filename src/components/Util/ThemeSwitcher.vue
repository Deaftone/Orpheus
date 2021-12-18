
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
        class="p-2 overflow-auto overflow-y-scroll shadow scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500 menu dropdown-content bg-neutral rounded-box w-52 h-96"
      >
        <li
          v-for="theme in themes"
          :key="theme"
          @click="themeSwitch(theme)"
        >
          <a>{{ theme }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      themes: [
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
      ]
    }
  },
  methods: {
    themeSwitch(theme) {
      console.log(theme)
      document.documentElement.setAttribute("data-theme", theme)
      this.$store.commit('setCurrentTheme', theme)

    },
    test(e) {
      console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
