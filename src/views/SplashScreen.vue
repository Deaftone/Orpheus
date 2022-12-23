<script>

export default {
  async setup (props) {
    /*     onMounted(async () => {
      const router = inject('$router')

      const deaftone = inject('$deaftone')
      const settings = inject('$settings')
      await deaftone.init()
      try {
        const status = await deaftone.testConnection(await settings.get('server'))
        if (status.status === 200) {
          console.log('Connected to server')
          setTimeout(() => {
            router.push({ path: '/home' })
          }, 4000)
        } else {
          console.log('Failed to connect')
          router.push({ path: '/init' })
        }
      } catch (e) {
        router.push({ path: '/init' })
      }
    }) */
  }
}
</script>

<template>
  <body>
    <div class="boxes">
      <div class="box">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div class="box">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div class="box">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div class="box">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </body>
</template>

<style scoped>
    body {
      min-height: 100vh;
      font-family: Roboto, Arial;
      color: #ADAFB6;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--bg);
      overflow: hidden;
    }

    .boxes {
      height: 32px;
      width: 32px;
      position: relative;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
      margin-top: 32px;
      -webkit-transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
      transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
    }

    .boxes .box {
      width: 32px;
      height: 32px;
      top: 0px;
      left: 0;
      position: absolute;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
    }

    .boxes .box:nth-child(1) {
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
      -webkit-animation: box1 1s linear infinite;
      animation: box1 1s linear infinite;
    }

    .boxes .box:nth-child(2) {
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
      -webkit-animation: box2 1s linear infinite;
      animation: box2 1s linear infinite;
    }

    .boxes .box:nth-child(3) {
      -webkit-transform: translate(100%, 100%);
      transform: translate(100%, 100%);
      -webkit-animation: box3 1s linear infinite;
      animation: box3 1s linear infinite;
    }

    .boxes .box:nth-child(4) {
      -webkit-transform: translate(200%, 0);
      transform: translate(200%, 0);
      -webkit-animation: box4 1s linear infinite;
      animation: box4 1s linear infinite;
    }

    .boxes .box>div {
      background: hsl(var(--p));
      --translateZ: 15.5px;
      --rotateY: 0deg;
      --rotateX: 0deg;
      position: absolute;
      width: 100%;
      height: 100%;
      background: hsl(var(--p));
      top: auto;
      right: auto;
      bottom: auto;
      left: auto;
      -webkit-transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
      transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
    }

    .boxes .box>div:nth-child(1) {
      top: 0;
      left: 0;
      background: hsl(var(--p));
    }

    .boxes .box>div:nth-child(2) {
      background: hsl(var(--pf));
      right: 0;
      --rotateY: 90deg;
    }

    .boxes .box>div:nth-child(3) {
      background: hsl(var(--pf));
      --rotateX: -90deg;
    }

    .boxes .box>div:nth-child(4) {
      background: hsl(var(--b3));
      top: 0;
      left: 0;
      --translateZ: -90px;
    }

    @keyframes box1 {

      0%,
      50% {
        transform: translate(100%, 0);
      }

      100% {
        transform: translate(200%, 0);
      }
    }

    @keyframes box2 {
      0% {
        transform: translate(0, 100%);
      }

      50% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(100%, 0);
      }
    }

    @keyframes box3 {

      0%,
      50% {
        transform: translate(100%, 100%);
      }

      100% {
        transform: translate(0, 100%);
      }
    }

    @keyframes box4 {
      0% {
        transform: translate(200%, 0);
      }

      50% {
        transform: translate(200%, 100%);
      }

      100% {
        transform: translate(100%, 100%);
      }
    }
</style>
