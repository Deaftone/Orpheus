<script>
import { invoke } from '@tauri-apps/api/tauri'
import {
  onMounted
} from 'vue'
export default {

  components: {

  },
  setup () {
    function loaded () {
      console.log('Splash removed')
      invoke('close_splashscreen')
    }
    function goTo (p) {
      console.log(p)
      this.$router.push({ path: `/${p}` })
    }

    function isTauri () {
      if (window.__TAURI__) {
        return true
      } return false
    }
    /*     function handleScroll () {
      console.log('Got scroll')
      const scrollBtn = this.$refs.scrollToTop

      if (window.scrollY > 0) {
        scrollBtn.classList.remove('invisible')
      } else {
        scrollBtn.classList.add('invisible')
      }
    }
    function scrollTop () {
      console.log('test')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } */
    onMounted(() => {
      // this.$router.push({ path: '/home' })

      // With the Tauri global script:
      document.addEventListener('DOMContentLoaded', () => {
      // This will wait for the window to load, but you could
      // run this function on whatever trigger you want
        if (isTauri()) { loaded() }
      })
      // window.addEventListener('scroll', handleScroll)
    })
    /*     onBeforeMount(() => {
      window.removeEventListener('scroll', handleScroll)
    }) */
    return {
      loaded,
      // scrollTop,
      goTo,
      isTauri
    }
  }
}
</script>

<template>
  <router-view />
</template>

<style>

</style>
