<template>
  <div class=" av__visualizer">
    <canvas ref="canvas" class="h-10"/>
  </div>
</template>

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
      myCtx: null
    }
  },
  beforeUnmount: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted: function () {
      console.log(this.audioAnalyser)
    window.addEventListener('resize', this.handleResize)
    this.myCanvas = this.$refs.canvas
    this.myCtx = this.myCanvas.getContext('2d')
    this.myCanvas.width = this.myCanvas.parentElement.getBoundingClientRect().width
    this.myCanvas.height = this.myCanvas.parentElement.getBoundingClientRect().height
    this.mainLoop()
  },
  methods: {
    handleResize (event) {
      this.myCanvas.width = this.myCanvas.parentElement.getBoundingClientRect().width
      this.myCanvas.height = this.myCanvas.parentElement.getBoundingClientRect().height
    },
    mainLoop () {
      const frqBits = this.audioAnalyser.frequencyBinCount
      const fftSize = this.audioAnalyser.fftSize
      const dataArray = new Uint8Array(frqBits)
      const timeFrequencyData = new Uint8Array(fftSize)
      const numBars = 512
      const gapSize = 4
      const step = Math.round(frqBits * 0.65 / (numBars)) // Songs do not contain the higher frequencies so cut them out
      let xPos = 0
      const barWidth = this.myCanvas.width / (numBars)
      this.audioAnalyser.getByteFrequencyData(dataArray)
      this.audioAnalyser.getByteTimeDomainData(timeFrequencyData)
      this._fillCanvasBG()
      dataArray.forEach((data, indexPos) => {
        if (indexPos % step) return
        const bits = Math.round(dataArray.slice(indexPos, indexPos + step)
          .reduce((v, t) => t + v, 0) / step)
        const barHeight = bits / 255 * this.myCanvas.height
        this._drawBars(xPos, barHeight, barWidth)
        xPos += barWidth + gapSize
      })
      requestAnimationFrame(this.mainLoop)
    },
    _fillCanvasBG: function () {
      // Resets the canvas to black
      const w = this.myCanvas.width
      const h = this.myCanvas.height
      this.myCtx.fillStyle = "#171717"
      this.myCtx.fillRect(0, 0, w, h)
    },
    _drawBars: function (xPos, barHeight, barWidth) {
        const my_gradient = this.myCtx.createLinearGradient(20,19,20,150)
        my_gradient.addColorStop(0,'rgb(241, 78, 162)');
        my_gradient.addColorStop(1,'rgb(168, 57, 114)');
      this.myCtx.fillStyle = my_gradient
      const yPos = (this.myCanvas.height - barHeight)
      this.myCtx.fillRect(xPos, yPos, barWidth, barHeight)
    }
  }
}
</script>

