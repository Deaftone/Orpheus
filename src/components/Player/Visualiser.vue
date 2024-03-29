<script>
export default {
  name: 'AvCanvas',
  props: {
    audioAnalyser: {
      type: AnalyserNode,
      default: null
    }
  },
  data () {
    return {
      myCanvas: null,
      myCtx: null,
      gradient: null,
      caps: [],
      barWidth: 8,
      barSpace: 2,
      capsHeight: 1,
      capsDropSpeed: 0.9,
      capsColor: '#FFF',
      brickHeight: 0,
      brickSpace: 2,
      symmetric: false,
      barColor: null,
      backgroundColor: null
    }
  },

  computed: {
    isPlaying () {
      return this.$store.state.isPlaying
    },
    getBackgroundColor () {
      return this.$store.state.currentTheme
    }
  },
  watch: {
    // This watch triggers playTrack. by doing       this.$store.commit('setNowPlaying', {title: track.title, id: track.id})
    // Do not do that inside the playTrack function as it will cause a infinite loop
    isPlaying (isPlaying) {
      if (isPlaying) { this.mainLoop() }
    },
    getBackgroundColor () {
      console.log(`Watch ${this.$store.state.currentTheme}`)
      this.setBackgroundColor()
      this.setBarColor()
    }
  },
  beforeUnmount () {
    this.myCanvas = null
  },
  mounted () {
    console.log(document.getElementsByTagName('footer'))

    window.addEventListener('resize', this.handleResize)
    this.myCanvas = this.$refs.canvas
    this.cHeight = this.myCanvas.height - 2
    this.myCtx = this.myCanvas.getContext('2d')
    this.myCanvas.width =
      this.myCanvas.parentElement.getBoundingClientRect().width
    this.myCanvas.height =
      this.myCanvas.parentElement.getBoundingClientRect().height

    this.setBackgroundColor()
    this.setBarColor()
    console.log(this.barColor)
    this.caps = Array.apply(null, Array(8192 / 2)).map(() => 0)
    this.mainLoop()
  },
  methods: {
    handleResize () {
      this.myCanvas.width =
        this.myCanvas.parentElement.getBoundingClientRect().width
      this.myCanvas.height =
        this.myCanvas.parentElement.getBoundingClientRect().height
    },
    setBarColor () {
      this.barColor = getComputedStyle(document.getElementById('menuBar')).color
    },
    setBackgroundColor () {
      this.backgroundColor = getComputedStyle(document.getElementById('titleBar')).backgroundColor
    },
    onClassChange (classAttrValue) {
      const classList = classAttrValue.split(' ')
      if (classList.includes('fully-in-viewport')) { console.log('has fully-in-viewport') }
    },
    mainLoop () {
      if (!this.isPlaying) { return }

      if (!this.myCanvas) { return }
      const frqBits = this.audioAnalyser.frequencyBinCount
      const data = new Uint8Array(frqBits)
      const barWidth = this.barWidth >= this.myCanvas.width ? this.myCanvas.width : this.barWidth
      const step = Math.round((barWidth + this.barSpace) / frqBits * this.myCanvas.width)
      let x = 0
      this.audioAnalyser.getByteFrequencyData(data)
      this._fillCanvasBG()
      data.forEach((_, index) => {
        if (index % step) { return }
        const bits = Math.round(data.slice(index, index + step)
          .reduce((v, t) => t + v, 0) / step)
        const barHeight = bits / 255 * this.myCanvas.height
        if (this.capsHeight) { this._drawCap(index, barWidth, x, bits) }

        this.myCtx.fillStyle = this.barColor
        this._drawBar(barWidth, barHeight, x)
        x += barWidth + this.barSpace
      })
      setTimeout(requestAnimationFrame(this.mainLoop), 3000)
    },
    HSLToRGB (h, s, l) {
      s /= 100
      l /= 100

      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs((h / 60) % 2 - 1))
      const m = l - c / 2
      let r = 0
      let g = 0
      let b = 0
      if (h >= 0 && h < 60) {
        r = c; g = x; b = 0
      } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0
      } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x
      } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c
      } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c
      } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x
      }
      r = Math.round((r + m) * 255)
      g = Math.round((g + m) * 255)
      b = Math.round((b + m) * 255)

      return `rgb(${r},${g},${b})`
    },
    _fillCanvasBG () {
      // Resets the canvas to black
      const w = this.myCanvas.width
      const h = this.myCanvas.height
      this.myCtx.fillStyle = this.backgroundColor
      this.myCtx.fillRect(0, 0, w, h)
    },
    _drawBar (barWidth, barHeight, barX) {
      if (this.brickHeight) {
        this._drawBrickBar(barWidth, barHeight, barX)
      } else {
        this.myCtx.fillRect(
          barX, this.myCanvas.height - barHeight - this._symAlign(barHeight),
          barWidth, barHeight
        )
      }
    },
    _drawBrickBar (barWidth, barHeight, barX) {
      for (let b = 0; b < barHeight; b += this.brickHeight + this.brickSpace) {
        this.myCtx.fillRect(
          barX, this.myCanvas.height - barHeight + b - this._symAlign(barHeight),
          barWidth, this.brickHeight
        )
      }
    },
    /**
     * Draw cap for each bar and animate caps falling down.
     * @private
     */
    _drawCap (index, barwidth, barX, barY) {
      const cap = this.caps[index] <= barY
        ? barY
        : this.caps[index] - this.capsDropSpeed
      const y = (cap / 255.0 * this.myCanvas.height)
      const capY = this.myCanvas.height - y - this.capsHeight - this._symAlign(y)
      this.myCtx.fillStyle = this.capsColor
      this.myCtx.fillRect(barX, capY, barwidth, this.capsHeight)
      if (this.symmetric) {
        this.myCtx.fillRect(
          barX, this.myCanvas.height - capY - this.capsHeight,
          barwidth, this.capsHeight)
      }
      this.caps[index] = cap
    },
    _symAlign (barHeight) {
      return this.symmetric ? ((this.myCanvas.height - barHeight) / 2) : 0
    }
  }
}
</script>

<template>
  <div class="av__visualizer">
    <canvas
      ref="canvas"
      class="w-full"
      height="40"
    />
  </div>
</template>
