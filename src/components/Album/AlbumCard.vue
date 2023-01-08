<script>
import 'v3-infinite-loading/lib/style.css'
import imgUrl from '@/assets/unknown_album.jpg'
import { inject } from 'vue'
import VLazyImage from 'v-lazy-image'
export default {
  props: { name: { type: String, required: true }, id: { type: String, required: true } },
  components: { VLazyImage },

  setup (props) {
    const deaftone = inject('$deaftone')

    return {
      deaftone,
      imgUrl,
      props
    }
  }
}
</script>
<template>
  <div
    class="overflow-hidden transition duration-300 ease-in-out rounded-lg shadow-xl bg-neutral card hover:-translate-y-1 hover:scale-105 "
  >
    <VLazyImage
      :src="deaftone.getCover(props.id)"
      :src-placeholder="imgUrl"
      style="width: auto; height: auto"
    />
    <div class="justify-center pt-5 pb-5 card-body">
      <p class="text-center truncate">
        {{ props.name }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
