<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <ConditionEditor/>
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import ConditionEditor from './components/ConditionEditor.vue'
import {NMessageProvider, NConfigProvider} from "naive-ui";



export default {
  name: 'App',
  components: {
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
    return {
      themeOverrides
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
