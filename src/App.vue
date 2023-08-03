<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <Tools :data="data"></Tools>
      <ConditionEditor :data="data"/>
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import ConditionEditor from './components/ConditionEditor.vue'
import {NMessageProvider, NConfigProvider} from "naive-ui";
import Tools from "@/components/Tools.vue";



export default {
  name: 'App',
  components: {
    Tools,
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
    return {
      data,
      themeOverrides
    }
  }
}
</script>

<style>

</style>
