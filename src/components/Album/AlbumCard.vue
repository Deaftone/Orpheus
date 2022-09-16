<script>
import 'v3-infinite-loading/lib/style.css'
import { inject } from 'vue'
export default {
  props: { name: { type: String, required: true }, id: { type: String, required: true } },
  setup (props) {
    const deaftone = inject('$deaftone')

    return {
      deaftone,
      props
    }
  }
}
</script>
<template>
  <div class="overflow-hidden">
    <img
      :src="deaftone.getCover(props.id)"
      style="width: auto; height: auto"
    >

    <div class="justify-center pt-5 pb-5 card-body">
      <p class="text-center truncate">
        {{ props.name }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
