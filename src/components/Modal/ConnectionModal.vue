<script>
import { inject } from 'vue'
export default {
  name: 'ConnectionModal',
  async setup () {
    const deaftone = inject('$deaftone')
    const status = await deaftone.testConnection()
    console.log(status.status)
    return {
      deaftone
    }
  }
}
</script>

<template>
  <div class="modal-box">
    <h3 class="text-lg font-bold">
      Failed to connect to your Deaftone server
    </h3>
    <p class="py-4">
      You've been selected for a chance to get one year of subscription to use Wikipedia for free!
    </p>
    <div class="modal-action">
      <label
        for="my-modal"
        class="btn"
      >Yay!</label>
    </div>
  </div>
</template>

<style scoped>

</style>
