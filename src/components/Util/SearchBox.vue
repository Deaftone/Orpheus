<template>
  <div class="flex-1 lg:flex-none">
    <div class="form-control">
      <input
        ref="search"
        class="input input-ghost hover:bg-neutral focus:bg-neutral"
        type="search"
        placeholder="Search"
        @input="updateSearch"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      search: '',
    }
  },
  watch: {
    $route() {
      this.$store.commit('setSearchQuery', null)
      this.$refs.search.value = ''
    },
  },
  methods: {
    updateSearch(e) {
      this.$store.commit('setSearchQuery', e.target.value)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
