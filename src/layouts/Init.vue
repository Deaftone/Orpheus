<script>

export default {

  components: {

  },
  setup () {
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

    /*     onBeforeMount(() => {
      window.removeEventListener('scroll', handleScroll)
    }) */
    return {
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
