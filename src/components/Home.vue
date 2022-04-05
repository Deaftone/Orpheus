<template> 
  <div class="relative flex overflow-x-hidden">
    <div class="py-12 animate-marquee whitespace-nowrap">
      <span class="mx-4 text-4xl">Marquee Item 1</span>
      <span class="mx-4 text-4xl">Marquee Item 2</span>
      <span class="mx-4 text-4xl">Marquee Item 3</span>
      <span class="mx-4 text-4xl">Marquee Item 4</span>
      <span class="mx-4 text-4xl">Marquee Item 5</span>
    </div>

    <div class="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
      <span class="mx-4 text-4xl">Marquee Item 1</span>
      <span class="mx-4 text-4xl">Marquee Item 2</span>
      <span class="mx-4 text-4xl">Marquee Item 3</span>
      <span class="mx-4 text-4xl">Marquee Item 4</span>
      <span class="mx-4 text-4xl">Marquee Item 5</span>
    </div>
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
<style src="@vueform/slider/themes/default.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
 * We'll use CSS grids for the base template
 * More info on https://cssgrid.io/ by @wesbos
 */

</style>
