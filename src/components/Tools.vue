<template>
  <div>
    <n-button @click="query" type="info">
      查询
    </n-button>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {NButton} from "naive-ui";
import {isLogical} from "@/util/node.ts";
import axios from "axios";
import {request} from "@/util/request.ts";
import emitter from "@/util/mitt.ts";

export default defineComponent({
  name: "Tools",
  props: ['data', 'columns', 'tableData'],
  components: {
    NButton
  },
  setup(prop) {
    var data = prop.data
    var columns = prop.columns
    var tableData = prop.tableData
    const query = () => {
      var dsl = createDsl(data)
      axios.post("benAppData/querydsl", {query:dsl})
          .then(res => {
            emitter.emit("data:query", {data: res})
          }).catch(e => {
      })
    }
    const createDsl = (node) => {
      var childDsl;
      if (isLogical(node.data.logicalType)) {
        childDsl = []
        node?.children?.forEach(child => [
          childDsl.push(createDsl(child))
        ])
        var logicalDsl = {}
        logicalDsl[node.data.logicalType] = childDsl
        return logicalDsl
      } else {
        childDsl = {}
        var compareDsl = {}
        compareDsl[node.data.comparison] = node.data.value
        childDsl[node.data.field] = compareDsl
        return childDsl
      }
    }
    return {
      query
    }
  }
})
</script>


<style scoped>

</style>