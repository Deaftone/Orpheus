<template>  
  <div class="grid w-full grid-cols-1 gap-5 pt-10 pb-10 bg-gradient-to-b from-gray-800 to-gray-900">
    <div
      ref="albumInfo"
      class="flex pl-40 pr-40"
    >
      <img
        class="shadow-lg"
        src="https://i.scdn.co/image/ab67616d00001e0239a3fc014b4c3a6af1c2458f"
      >
      <div class="flex flex-col justify-center w-screen pl-10 m-auto">
        <span class="text-6xl font-bold">Happier Then Ever</span>
        <span class="pt-5 text-3xl font-bold text-pink-400">Billie Eillish</span>
      </div>
    </div>
    <div
      ref="sticky"
      style="height:0.1px"
    />
    <div
      ref="albumBar"
      class="sticky top-0 w-full p-2 pl-40 pr-40 -mt-5 transition"
    >
      <a>#</a>
      <div class="float-right">
        <a>Length</a>
      </div>
      <a class="pl-7">Title</a>
    </div>
    <div class="grid w-full grid-cols-1 gap-5 pl-40 pr-40">
      <div
        v-for="song in album.songs"
        :id="song.title"
        :key="song.number"
        class="flex justify-center p-1 text-lg rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 "
      >
        <div class="w-full p-2">
          <div class="float-left pr-3">
            <a>{{ song.number }}</a>
          </div>
          <div class="float-left">
            <a>{{ song.title }}</a>
          </div>
          <div class="float-right">
            <a>{{ song.length }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlbumDetails',
  data() {
    return {
      observer: null,
      album: { title: "Happier then ever", songs: 
      [ 
        {
          number: '01', 
          title: 'Getting Older', 
          length: '4:04'
        },
        {
          number: '02', 
          title: 'I Didn\'t Change My Number ', 
          length: '2:38'
        }, 
        {
          number: '03', 
          title: 'Billie Bossa Nova', 
          length: '3:17'
        }, 
        {
          number: '04', 
          title: 'my future', 
          length: '3:30'
        },
        {
          number: '05', 
          title: 'Oxytocin', 
          length: '3:30'
        },
        {
          number: '06', 
          title: 'GOLDWING', 
          length: '2:32'
        },        {
          number: '07', 
          title: 'Lost Cause', 
          length: '3:32'
        },        
        {
          number: '08', 
          title: 'Halley\'s Comet', 
          length: '3:55'
        },        
        {
          number: '09', 
          title: 'Not My Responsibility', 
          length: '3:48'
        },
        {
          number: '09',
          title: 'http://localhost:3000/sober.flac',
          length: 'test'
        },
        {
          number: '09',
          title: 'http://localhost:3000/brightside.flac',
          length: 'test'
        }

      ]},
    }
  },
  computed: {
    nowPlaying () {
      return this.$store.state.nowPlaying
    }
  },
  watch: {
    nowPlaying (newPlaying, oldPlaying ) {
      console.log(oldPlaying)
      if(!oldPlaying) {
        document.getElementById(newPlaying).classList.add("border-solid", "border-4", "border-pink-500")

      } else {
        document.getElementById(oldPlaying).classList.remove("border-solid", "border-4", "border-pink-500")
        document.getElementById(newPlaying).classList.add("border-solid", "border-4", "border-pink-500")
      }
    }
  },
  created() {
    this.observer = new IntersectionObserver(
      this.onElementObserved, 
      {
        root: null,
        threshold: 1.0,
      }
    )
  },
  mounted(){
    this.observer.observe(this.$refs.sticky)
  },
  methods: {
    onElementObserved(e) {
      e.forEach(({ target, isIntersecting}) => {
        this.$refs.albumBar.classList.toggle("bg-gray-900", !isIntersecting)
      })

    }
  }
  ,
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.active {
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
</style>
