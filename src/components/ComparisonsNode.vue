<template>
  <div>
    <n-popover style="padding: 0; background-color: rgba(33, 84, 254, 1)" :show-arrow="false" trigger="hover">
      <template #trigger>
        <div style="background-color: #fff" class="grid-border ">
          <n-ellipsis class="font" style="max-width: 100px">{{ data.field }}</n-ellipsis>
          <a style="font-weight: bold; margin: 0 5px"> {{ getKeywordName(data.comparison).toUpperCase() }} </a>
          <n-ellipsis class="font" style="max-width: 80px">{{ data.value }}</n-ellipsis>
        </div>
      </template>
      <n-space>
        <n-button @click="editNode" quaternary circle>
          <template #icon>
            <n-icon color="#fff">
              <edit-icon/>
            </n-icon>
          </template>
        </n-button>
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
import {defineComponent, inject} from 'vue'
import {NGrid, NGridItem, NEllipsis, NPopover, NButton, NIcon, NSpace} from 'naive-ui'
import {getKeywordName} from "@/util/node.ts";
import DeleteIcon from "@/assets/DeleteIcon.vue";
import EditIcon from "@/assets/EditIcon.vue";
import emitter from "@/util/mitt.ts";

export default defineComponent({
  name: "ComparisonsNode",
  methods: {getKeywordName},
  components: {
    EditIcon,
    DeleteIcon, NIcon, NButton,
    NPopover, NSpace,
    NGrid, NGridItem, NEllipsis
  },
  setup() {
    const getNode = inject('getNode')
    var node = getNode()
    var data = node.getData();

    const editNode = () => {
      emitter.emit('node:editing', {
        id: node.id,
        data: {
          field: data.field,
          comparison: data.comparison,
          value: data.value
        }
      })
    }
    const deleteNode = () => {
      emitter.emit('node:delete', {
        id: node.id
      })
    }
    return {
      data, editNode, deleteNode
    }
  },
  mounted() {

  }
})
</script>
<style scoped>
.grid-border {
  display: table-cell;
  vertical-align: middle;
  height: 30px;
  font-size: 12px;
  border-style: solid;
  border-color: #2c3e50;
  border-width: 1px;
  border-radius: 5px;
  padding: 5px;
}

.font {
  font-size: 1px;
}
</style>