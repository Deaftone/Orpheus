<template>
  <main class="">
    <!-- Previous Button -->
    <button
      class="text-gray-800 font-bold py-2 px-4 co"
      @click="previosTrack"
    >
      <font-awesome-icon
        icon="fast-backward"
        color="gray"
      />
    </button>
    <!-- Play Button -->
    <button
      class="text-gray-800 font-bold py-2 px-4 co"
      @click="playPause"
    >
      <font-awesome-icon
        :icon="currentIcon"
        color="gray"
      />
    </button>
    <!-- Next Button -->
    <button
      class="text-gray-800 font-bold py-2 px-4 co"
      @click="nextTrack"
    >
      <font-awesome-icon
        icon="fast-forward"
        color="gray"
      />
    </button>
    <audio
      id="appPlayer"
      ref="myId"
      style="hidden"
    />
  </main>
</template>

<script>

export default ({
    name: "Player",
      data() {
    return {
      player: this.$refs.myId,
      playing: false,
      paused: false,
      currentIcon: 'play'
    }
  },
    methods: {
        previosTrack(){
            console.log('Previous track clicked')
        },
        nextTrack() {
            console.log('Next track clicked')
        },
        playPause() {
            if(this.paused) {
                console.log('Play/Pause -- Resume')
                this.playing = true
                this.paused = false
                this.$refs.myId.play()
                this.currentIcon = "pause"
            } else if (!this.$refs.myId.src) {
                console.log('Play/Pause -- Inital play load track')
                this.$refs.myId.src = '/public/brightside.flac'
                this.$refs.myId.play()
                this.$refs.myId.volume = 0.4
                this.playing = true
                this.currentIcon = "pause"
            } else {
                console.log('Play/Pause -- Pause')
                this.playing = false
                this.paused = true
                this.$refs.myId.pause()
                this.currentIcon = "play"
            }
        }
    }
})
</script>
