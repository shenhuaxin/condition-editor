<template>
  <div style="background-color: #fff" class="grid-border ">
    <n-ellipsis class="font" style="max-width: 100px">{{data.field}}</n-ellipsis>
    <a style="font-weight: bold; margin: 0 5px"> {{getKeywordName(data.comparison).toUpperCase()}} </a>
    <n-ellipsis class="font" style="max-width: 80px">{{ data.value }}</n-ellipsis>
  </div>
</template>
<script>
import {defineComponent, inject} from 'vue'
import {NGrid, NGridItem, NEllipsis} from 'naive-ui'
import {getKeywordName} from "@/util/node.ts";

export default defineComponent({
  name: "ComparisonsNode",
  methods: {getKeywordName},
  components: {
    NGrid, NGridItem, NEllipsis
  },
  setup() {
    const getNode = inject('getNode')
    var node = getNode()
    var data = node.getData();
    console.log(data)
    return {
      data
    }
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