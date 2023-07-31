<template>
  <n-message-provider>
  <ConditionEditor/>
  </n-message-provider>
</template>

<script>
import ConditionEditor from './components/Condition-Editor.vue'
import {NMessageProvider} from "naive-ui";
export default {
  name: 'App',
  components: {
    ConditionEditor,
    NMessageProvider
  },
  setup() {
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
