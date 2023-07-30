<template>
  <div>
    <n-tag closable>{{text}}</n-tag>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {NTag} from 'naive-ui'
export default defineComponent({
  name: 'ProgressNode',
  inject: ['getNode'],
  components: {
    NTag
  },
  data() {
    return {
      text: ""
    }
  },
  mounted() {
    const node = this.getNode()
    this.text = node.getData().text
  },
})</script>


<style scoped>

</style>