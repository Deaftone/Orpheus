<template> 
  <div class="shadow-2xl bg-gradient-to-r from-pink-500 to-blue-300 grid grid-flow-col grid-cols-4 grid-rows-1 gap-10" style="padding:50px">
       <div class="bg-gray-900 content-center rounded"><a>test</a></div>
       <div class="bg-gray-900 content-center rounded"><a>test</a></div>
       <div class="bg-gray-900 content-center rounded"><a>test</a></div>
       <div class="bg-gray-900 content-center rounded"><a>test</a></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
 * We'll use CSS grids for the base template
 * More info on https://cssgrid.io/ by @wesbos
 */

</style>
