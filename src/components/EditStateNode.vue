<template>
  <n-input-group style="background-color: rgba(193, 213, 253, 1);padding: 3px">
    <n-input style="margin-right: 3px; width: 150px" v-model:value="field" placeholder="字段"></n-input>
    <n-select style="margin-right: 3px;width: 100px" :show-arrow="false" v-model:value="comparison" :options="options"></n-select>
    <n-input style="margin-right: 3px;width: 200px" v-model:value="value" placeholder="值"></n-input>
    <n-button style="width: 50px" color="rgb(50,96,223)">确认</n-button>
  </n-input-group>
</template>

<script>
import {computed, ref, watch} from "vue";
import {NInput, NInputGroup, NInputGroupLabel, NSelect, NSpace, NButton} from "naive-ui";

export default {
  name: "EditStateNode",
  components: {
    NSelect, NSpace, NInput, NInputGroup, NInputGroupLabel,NButton
  },
  setup(prop) {

    const field = ref("")
    const comparison = ref("")
    const value = ref("")
    const isComparison = ref(false);
    const options = [
      {
        label: "=",
        value: "$eq"
      },
      {
        label: "!=",
        value: "$neq"
      }
    ]

    return {
      field,
      value,
      isComparison,
      options,
      comparison
    }
  }
}
</script>

<style scoped>

</style>