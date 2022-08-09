
<script >
import draggable from 'vuedraggable'
import { watch, computed } from 'vue'
import { usePlayerStore } from '../../stores/player'
export default {
  components: {
    draggable
  },
  setup () {
    const store = usePlayerStore()
    const nowPlaying = computed(() => store.nowPlaying)
    const playingQueue = computed({
      get () {
        return store.queue
      },
      set (newValue) {
        store.queue = newValue
      }
    })
    watch(nowPlaying, (newValue, oldValue) => {
      // Absolute hack. We need to delay the highlighting of the now playing on the sidebar or else its no rendered when we call to highlight
      setTimeout(() => {
        let oldP

        if (oldValue) { oldP = document.getElementById(`${oldValue.id}_sidebar`) }

        const newP = document.getElementById(`${newValue.id}_sidebar`)

        if (oldP) {
          document.getElementById(`${oldValue.id}_scroller`).classList.remove('animate-marquee')
          document.getElementById(`${oldValue.id}_scroller2`).classList.remove('animate-marquee2')

          oldP.classList.remove('gradient-border', 'border-solid', 'border-4', 'border-primary')
        }
        if (newP) {
          document.getElementById(`${newValue.id}_scroller`).classList.add('animate-marquee')
          document.getElementById(`${newValue.id}_scroller2`).classList.add('animate-marquee2')

          newP.classList.add('gradient-border', 'border-solid', 'border-4', 'border-primary')
        }
      }, 10)
    })

    return {
      playingQueue
    }
  }
}
</script>
<template>
  <draggable
    v-model="playingQueue"
    tag="ul"
    class="overflow-y-scroll scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-500 hover:scrollbar-thumb-green-700"
    item-key="id"
  >
    <template #item="{element}">
      <li
        :id="`${element.id}_sidebar`"
        class="items-center justify-between p-3 m-3 text-sm transition duration-300 ease-in-out delay-150 rounded-lg shadow-xl cursor-move bg-base-100 hover:scale-105"
      >
        <div class="relative flex overflow-x-hidden">
          <div
            :id="`${element.id}_scroller`"
            class="whitespace-nowrap"
          >
            <span class="text-primary">&nbsp;{{ element.artist }}</span><span class=""> - {{ element.title }}</span>
          </div>
          <div
            :id="`${element.id}_scroller2`"
            class="absolute top-0 whitespace-nowrap"
          >
            <span class="text-primary">&nbsp;{{ element.artist }}</span><span class=""> - {{ element.title }}</span>
          </div>
        </div>
      </li>
    </template>
  </draggable>
</template>
