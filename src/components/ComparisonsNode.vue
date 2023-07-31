<template>
  <div class="grid-border ">
    <n-ellipsis class="font" style="max-width: 100px">IND_CODE</n-ellipsis>
    <a style="font-weight: bold"> = </a>
    <n-ellipsis class="font" style="max-width: 80px">C202108123213</n-ellipsis>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {NGrid, NGridItem, NEllipsis} from 'naive-ui'

export default defineComponent({
  name: "ComparisonsNode",
  components: {
    NGrid, NGridItem, NEllipsis
  },
  mounted() {

  }
})
</script>
<style scoped>
.grid-border {
  display: table-cell;
  vertical-align: middle;
  height: 30px;
  font-size: 12px;
  border-style: solid;
  border-color: #2c3e50;
  border-width: 1px;
  border-radius: 5px;
  padding: 5px;
}

.font {
  font-size: 1px;
}
</style>