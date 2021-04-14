<template class="flex">  
   <div class="flex flex-col justify-between h-screen bg-gray-900" style="width:250px">
      <header class="bg-gray-800 py-4">
        Orpheus
      </header>
      <div class="text-left" style="padding-left:20px;padding-top:10px">
        <a class="text-xl font-bold">My Library</a>
        <ul style="padding-left:20px;padding-top:5px">
          <li class="hover:underline">Albums</li>
          <li class="hover:underline">Artists</li>
          <li class="hover:underline">Tracks</li>
        </ul>
      </div>
      <footer class="mt-auto bg-gray-800 py-4">
        Footer
      </footer>
    </div>
    <div class="flex flex-col justify-between w-screen bg-red-500">
      <section class="bg-blue-900 py-4">
        Content
      </section>
      <div>
        <a>test</a>
      </div>
      <footer class="mt-auto bg-gray-800 py-4">
        Content Footer
      </footer>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
#main {
  display: flex;
}
</style>
