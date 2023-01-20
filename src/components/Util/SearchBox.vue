<script>
export default {
  name: 'SearchBox',
  data () {
    return {
      search: ''
    }
  },
  /*   watch: {
    $route() {
      this.$store.commit('setSearchQuery', null)
      this.$refs.search.value = ''
    },
  }, */
  methods: {
    updateSearch (e) {
      this.$store.commit('setSearchQuery', e.target.value)
    }
  }
}
</script>
<template>
  <div class="flex-1 lg:flex-none">
    <button
      class="font-bold co btn hover:bg-base-300"
    >
      <font-awesome-icon
        :icon="['fa', 'magnifying-glass']"
      />
    </button>
    <!--       <input
        ref="search"
        class="input input-ghost focus:bg-neutral hover:bg-neutral"
        type="search"
        placeholder="Search"
        @input="updateSearch"
      > -->
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
