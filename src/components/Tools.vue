<template>
  <div>
    <n-button @click="query" type="info">
      生成 dsl
    </n-button>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {NButton} from "naive-ui";
import {isLogical} from "@/util/node.ts";

export default defineComponent({
  name: "Tools",
  props: ['data'],
  components: {
    NButton
  },
  setup(prop) {
    var data = prop.data
    const query = () => {
      var dsl = createDsl(data)
      console.log(JSON.stringify(dsl))
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