<template>
  <draggable
    v-model="queue"
    tag="ul"
    class="overflow-y-scroll scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500 hover:scrollbar-thumb-green-700"
    item-key="id"
  >
    <template #item="{element}">
      <li
        :id="element.id + '_sidebar'"
        class="items-center justify-between p-2 m-2 text-sm rounded-lg shadow cursor-move bg-base-100"
      >
        <div class="relative flex overflow-x-hidden">
          <div
            :id="element.id + '_scroller'"
            class="whitespace-nowrap"
          >
            <span class="text-primary">&nbsp;{{ element.artist }}</span><span class=""> - {{ element.title }}</span>
          </div>
          <div
            :id="element.id + '_scroller2'"
            class="absolute top-0 whitespace-nowrap"
          >
            <span class="text-primary">&nbsp;{{ element.artist }}</span><span class=""> - {{ element.title }}</span>
          </div>
        </div>
      </li>
    </template>
  </draggable>
  <!--  <draggable
    tag="ul"
    class="w-full max-w-md"
    v-model="queue"
    :list="queue"
  >
    <li
      v-for="song in queue"
      :id="song.id + '_sidebar'"
      :key="song.id"
      class="items-center justify-between p-2 m-2 text-sm rounded-lg shadow cursor-move bg-base-100"
    >

      <div class="relative flex overflow-x-hidden">
        <div
          :id="song.id + '_scroller'"
          class="whitespace-nowrap"
        >
          <span class="">{{ song.artist }} - {{ song.title }}</span>
        </div>
        <div
          :id="song.id + '_scroller2'"
          class="absolute top-0 whitespace-nowrap"
        >
          <span class="">{{ song.artist }} - {{ song.title }}</span>
        </div>
      </div>
    </li>
  </draggable> -->
</template> 
<script>
import draggable from 'vuedraggable'
export default {
  name: 'RightSideBar',
  components: {
    draggable,
  },

  computed: {
    playingQueue () {
      return this.$store.state.queue
    },
    nowPlaying (){
      return this.$store.state.nowPlaying
    },
    queue: {
        get() {
            return this.$store.state.queue
        },
        set(value) {
            this.$store.commit('setQueue', value)
        }
    }
  },
  watch: {
    playingQueue(newQueue) {
      this.queue = newQueue
    },
    nowPlaying(newPlaying,oldPlaying){
      // Absolute hack. We need to delay the highlighting of the now playing on the sidebar or else its no rendered when we call to highlight
      setTimeout(() => {
        this.highLightNowPlaying(oldPlaying, newPlaying)
      }, 10)
    }
  },
  methods: {
    highLightNowPlaying(oldPlaying, newPlaying) {
      console.log('High' + newPlaying.title)
      let oldP

      if(oldPlaying) {
        oldP = document.getElementById(oldPlaying.id + '_sidebar') 
      }

      const newP = document.getElementById(newPlaying.id + '_sidebar')

      if(oldP) {
        document.getElementById(oldPlaying.id + '_scroller').classList.remove('animate-marquee')
        document.getElementById(oldPlaying.id + '_scroller2').classList.remove('animate-marquee2')

        oldP.classList.remove("gradient-border","border-solid", "border-4", "border-primary")
      }
      if(newP) {
        document.getElementById(newPlaying.id + '_scroller').classList.add('animate-marquee')
        document.getElementById(newPlaying.id + '_scroller2').classList.add('animate-marquee2')

        newP.classList.add("gradient-border","border-solid", "border-4", "border-primary")
      }
    },
  }
}
</script>
