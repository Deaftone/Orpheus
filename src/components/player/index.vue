<template>
  <main>
    <div
      id="container"
      class="grid grid-cols-3 grid-row-1 "
    >
      <!-- This is hacked I couldnt get it allign center vertically any other way then puttin it inside a div -->
      <div class="flex justify-center items-center">
        <div
          id="volume"
          class="w-20"
        >
          <Slider
            v-model="volume"
            :step="-1"
            :max="1"
            :tooltips="false"
            @update="volumeChange"
          />
        </div>
      </div>

      <div
        id="playControls"
        class="col-start-2"
      >
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
      </div>
      <div class="col-start-3 flex items-center justify-center">
        <a>{{ currentTrack }}</a>
      </div>
      <audio
        id="appPlayer"
        ref="appPlayer"
        class="hidden"
        name="appPlayer"
        style="hidden"
      />
    </div>

    <a>{{ eTime }} / {{ duration }}</a>
    <div id="playbar">
      <Slider
        v-model="percentPlayed"
        :step="-1"
        :tooltips="false"
        @update="barChange"
      />
    </div>
  </main>
</template>

<script>
import Slider from '@vueform/slider'
import '../../freqtimeupdate'

export default ({
    name: "Player",
    components: {
        Slider
    },
      data() {
        return {
          appPlayer: undefined,
          currentTrack: '',
          isPlaying: false,
          paused: false,
          currentIcon: 'play',
          percentPlayed: 0,
          eTime: '00:00',
          volume: 0.2,
          duration: '00:00'
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.appPlayer = this.$refs.appPlayer
            this.appPlayer.volume = this.volume
                this.$watch("isPlaying",function() {
                    if(this.isPlaying) {
                      console.log("Audio playback started.");
                      //prevent starting multiple listeners at the same time
                      if(!this.listenerActive) {
                        console.log('Add listener')
                        this.listenerActive=true;
                        //for a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
                        //frequent.add(this.appPlayer, this.playbackListener);
                        this.appPlayer.addEventListener("freqtimeupdate",this.playbackListener);
                      }
                    }
                });
        })
    },
    methods: {
        convertTime(seconds){
                const format = val => `0${Math.floor(val)}`.slice(-2);
                var hours = seconds / 3600;
                var minutes = (seconds % 3600) / 60;
                return [minutes, seconds % 60].map(format).join(":");
        },
        barChange(e){
            var time = e / 100 * this.appPlayer.duration
            var diff = Math.abs( time - this.appPlayer.currentTime );
            if(diff > 0.1) {
                console.log(diff)
                this.appPlayer.currentTime = time
            }
        },
        previosTrack(){
            this.playTrack('brightside.flac')
            console.log('Previous track clicked')
        },
        nextTrack() {
            this.playTrack('sober.flac')
            console.log('Next track clicked')
        },
        volumeChange (e) {
            this.appPlayer.volume = e
        },
        playPause() {
            if(this.paused) {
                console.log('Play/Pause -- Resume')
                this.isPlaying = true
                this.paused = false
                this.appPlayer.play()
                this.currentIcon = "pause"
            } else if (!this.appPlayer.src) {
                console.log('Play/Pause -- Inital play load track')
                this.playTrack('brightside.flac')
            } else {
                console.log('Play/Pause -- Pause')
                this.isPlaying = false
                this.paused = true
                this.appPlayer.pause()
                this.currentIcon = "play"
            }
        },
        playTrack(track) {
                this.appPlayer.src = track
                this.appPlayer.play()
                this.isPlaying = true
                this.currentIcon = "pause"
                this.currentTrack = this.appPlayer.src
        },
        playbackListener() {
            var percentage = (this.appPlayer.currentTime / this.appPlayer.duration) * 100;
            this.duration = this.convertTime(this.appPlayer.duration);
            this.percentPlayed = percentage
            var seconds = this.appPlayer.currentTime;
            this.eTime = this.convertTime(seconds);
            this.playbackTime = this.appPlayer.currentTime;
        }
    },
})
</script>
