<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <Tools :data="data"></Tools>
      <ConditionEditor :data="data"/>
      <n-data-table
          :columns="columns"
          :data="tableData"
          :bordered="false"
      />
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import ConditionEditor from './components/ConditionEditor.vue'
import {NMessageProvider,NDataTable,NButton, NConfigProvider} from "naive-ui";
import Tools from "@/components/Tools.vue";
import {ref} from "vue";
import emitter from "@/util/mitt.ts";



export default {
  name: 'App',
  components: {
    Tools,
    NButton,
    NDataTable,
    ConditionEditor,
    NMessageProvider,
    NConfigProvider
  },
  setup() {
    const themeOverrides = {
      common: {
        primaryColor: '#000'
      }
    }
    var data = {
      id: "1",
      type: 'logical-node',
      data: {
        logicalType: "$and"
      },
      isRoot: true,
      width: 100,
      height: 30,
    }

    emitter.on('data:query', (event) => {
      columns.value = Object.keys(event.data[0]).map(key => {
        return {
          "title": key,
          "key": key
        }
      })
      tableData.value = event.data
    })
    var tableData = ref([])
    var columns = ref([{
      title: 'ID',
      key: 'ID'
    }])
    return {
      columns,
      tableData,
      data,
      themeOverrides
    }
  }
}
</script>

<style>

</style>
