<template>
  <n-input-group style="background-color: rgba(193, 213, 253, 1);padding: 3px">
    <n-input :bordered="false" style="margin-right: 3px; width: 150px" v-model:value="editNodeData.field" placeholder="字段"></n-input>
    <n-select :bordered="false" style="margin-right: 3px;width: 100px" :show-arrow="false" placeholder="关系" v-model:value="editNodeData.comparison" :options="options"></n-select>
    <n-input :bordered="false" style="margin-right: 3px;width: 200px" v-model:value="editNodeData.value" placeholder="对比值"></n-input>
    <n-button :bordered="false" style="width: 50px" @click="confirm" color="rgb(50,96,223)">确认</n-button>
  </n-input-group>
</template>

<script>
import {computed, inject, ref, watch} from "vue";
import {NInput, NInputGroup, NInputGroupLabel, NSelect, NSpace, NButton} from "naive-ui";
import emitter from "@/util/mitt.ts";
import {options} from "@/util/node.ts";

export default {
  name: "EditStateNode",
  components: {
    NSelect, NSpace, NInput, NInputGroup, NInputGroupLabel,NButton
  },
  setup(prop) {
    const getNode = inject('getNode')
    var node = getNode()
    var editNodeData = ref({
      field: node.getData().field,
      comparison: node.getData().comparison,
      value: node.getData().value
    })
    const isComparison = ref(false);

    let confirm = () => {
      emitter.emit('node:edit', {
        id: node.id,
        field: editNodeData.value?.field,
        type: 'comparison-node',
        comparison: editNodeData.value?.comparison,
        value: editNodeData.value?.value
      })
    }

    return {
      confirm,
      editNodeData,
      isComparison,
      options,
    }
  }
}
</script>

<style scoped>

</style>