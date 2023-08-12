<script>
import AlbumList from './AlbumList.vue'
import ArtistList from './ArtistList.vue'
export default {
  name: 'Home',
  components: { AlbumList, ArtistList },
  props: {
    msg: String
  }
}
</script>

<template>
  <div class="grid grid-cols-3 justify-center gap-3 p-4">
    <div class="stats bg-neutral text-xl shadow-xl">
      <div class="stat">
        <div class=" stat-title">
          Albums
        </div>
        <div class="stat-value">
          400
        </div>
      </div>
      <div class="stat">
        <div class="stat-title">
          Songs
        </div>
        <div class="stat-value">
          51,000
        </div>
      </div>
      <div class="stat">
        <div class="stat-title">
          Artists
        </div>
        <div class="stat-value" />
        <div class="stat-value">
          1,000
        </div>
      </div>
    </div>
    <div class="stats bg-neutral p-10 text-xl shadow-xl">
      <div class="stat">
        <div class=" stat-title">
          Albums
        </div>
        <div class="stat-value">
          400
        </div>
      </div>
      <div class="stat">
        <div class="stat-title">
          Songs
        </div>
        <div class="stat-value">
          51,000
        </div>
      </div>
      <div class="stat">
        <div class="stat-title">
          Artists
        </div>
        <div class="stat-value" />
        <div class="stat-value">
          1,000
        </div>
      </div>
    </div>
    <div class="stats bg-neutral p-10 text-xl shadow-xl">
      <div class="stat">
        <div class=" stat-title">
          Albums
        </div>
        <div class="stat-value">
          400
        </div>
      </div>
      <div class="stat">
        <div class="stat-title">
          Songs
        </div>
        <div class="stat-value">
          51,000
        </div>
      </div>
      <div class="stat">
        <div class="stat-title">
          Artists
        </div>
        <div class="stat-value" />
        <div class="stat-value">
          1,000
        </div>
      </div>
    </div>
  </div>
  <div class="divider" />
  <div>
    <h2 class="pl-10">
      New Albums
    </h2>
    <AlbumList
      :size="8"
      :scroller="false"
      :sort="latest"
    />
  </div>
  <div class="divider" />
  <div>
    <h2 class="pl-10">
      New Arists
    </h2>
    <ArtistList
      :size="11"
      sort="latest"
    />
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*
 * We'll use CSS grids for the base template
 * More info on https://cssgrid.io/ by @wesbos
 */
</style>
