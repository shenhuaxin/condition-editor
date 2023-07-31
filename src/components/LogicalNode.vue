<template>
  <div>
    <n-popover style="padding: 0; background-color: rgba(33, 84, 254, 1)" :show-arrow="false" trigger="hover">
      <template #trigger>
        <n-button :bordered="false"
                  style="width: 100px; color: rgb(50,96,223); background-color: rgba(193, 213, 253, 1)"
                  @click="change">
          <template #icon>
            <n-icon>
              <SwitchIcon/>
            </n-icon>
          </template>
          {{ data.text }}
        </n-button>
      </template>
      <n-space>
        <n-button @click="addChildNode" quaternary circle>
          <template #icon>
            <n-icon color="#fff">
              <AddIcon/>
            </n-icon>
          </template>
        </n-button>
        <n-button @click="deleteNode" quaternary circle>
          <template #icon>
            <n-icon color="#fff">
              <DeleteIcon/>
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </n-popover>
  </div>

</template>

<script>
import {defineComponent, getCurrentInstance, inject, onMounted, ref} from 'vue'
import {NButton, NIcon, NPopover, useMessage} from 'naive-ui'
import SwitchIcon from "@/assets/Switch-Icon.vue";
import DeleteIcon from "@/assets/DeleteIcon.vue";
import AddIcon from "@/assets/AddIcon.vue";
import EditIcon from "@/assets/EditIcon.vue";

export default defineComponent({
  name: 'LogicalNode',
  components: {
    EditIcon,
    AddIcon,
    DeleteIcon,
    NButton,
    NIcon,
    SwitchIcon,
    NPopover,
  },
  setup(prop) {
    var message = useMessage()
    let data = ref({})
    const getNode = inject('getNode')
    var node = getNode()
    onMounted(() => {
      data.value = node.getData()
    })

    let change = function () {
      var data = node.getData();
      data.text = "OR"
      node.setData(data)
      updateText()
    }
    let updateText = function () {
      data.value = node.getData()
    }
    let addChildNode = function () {

    }
    let deleteNode = function () {
    }
    return {
      data,
      change,
      addChildNode,
      deleteNode
    }
  }
})


</script>


<style scoped>

</style>