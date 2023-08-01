<template>
  <div>
    <n-popover style="padding: 0; background-color: rgba(33, 84, 254, 1)" :show-arrow="false" trigger="hover">
      <template #trigger>
        <n-button :bordered="false"
                  :style="btnStyle"
                  @click="change">
          <template #icon>
            <n-icon>
              <switch-icon/>
            </n-icon>
          </template>
          {{ getKeywordName(data.logicalType).toUpperCase() }}
        </n-button>
      </template>
      <n-space>
        <n-popselect v-model:value="addNodeType" @click="addChildNode(addNodeType)" :options="options" trigger="hover">
          <n-button quaternary circle>
            <template #icon>
              <n-icon color="#fff">
                <add-icon/>
              </n-icon>
            </template>
          </n-button>
        </n-popselect>
        <n-button @click="deleteNode" quaternary circle>
          <template #icon>
            <n-icon color="#fff">
              <delete-icon/>
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </n-popover>
  </div>

</template>

<script>
import {computed, defineComponent, inject, onMounted, ref} from 'vue'
import {NButton, NIcon, NPopover, useMessage, NSpace, NPopselect} from 'naive-ui'
import SwitchIcon from "@/assets/Switch-Icon.vue";
import DeleteIcon from "@/assets/DeleteIcon.vue";
import AddIcon from "@/assets/AddIcon.vue";
import EditIcon from "@/assets/EditIcon.vue";
import emitter from "@/util/mitt.ts";
import {getKeywordName} from "@/util/node.ts";

export default defineComponent({
  name: 'LogicalNode',
  methods: {getKeywordName},
  components: {
    EditIcon,
    AddIcon,
    DeleteIcon,
    NButton,
    NIcon,
    SwitchIcon,
    NPopover,
    NSpace,
    NPopselect
  },
  setup(prop) {
    var message = useMessage()
    let data = ref({})
    var addNodeType = ref("");
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
    let addChildNode = function (value) {
      emitter.emit('node:add', {id: node.id, type: value})
    }
    let deleteNode = function () {
    }
    const options = [
      {
        label: "AND",
        value: "$and"
      },
      {
        label: "OR",
        value: "$or"
      },
      {
        label: "=",
        value: "$eq"
      },
      {
        label: "!=",
        value: "$neq"
      }
    ]
    var logicalType = node.getData().logicalType
    const btnStyle = computed(() => {
      if (logicalType === '$and') {
        return "width: 100px; color: rgb(50,96,223); background-color: rgba(193, 213, 253, 1)"
      } else if (logicalType === '$or') {
        return "width: 100px; color: rgb(22,109,66); background-color: rgba(196, 229, 211, 1)"
      }
      return ""
    })

    return {
      btnStyle,
      addNodeType,
      options,
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