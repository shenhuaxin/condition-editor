<template>
  <div>
    <div style="height: 400px" id="container"></div>
    <TeleportContainer/>
  </div>
</template>


<script>
import {defineComponent} from 'vue'
import {Graph, Path} from '@antv/x6'
import {register, getTeleport} from '@antv/x6-vue-shape'
import Hierarchy from "@antv/hierarchy";
import insertCss from 'insert-css'
import emitter from "@/util/mitt.ts";
import {isLogical} from "@/util/node.ts";
import {initX6} from "@/util/x6.ts";
import {useMessage} from "naive-ui";

initX6()

const TeleportContainer = getTeleport()

let graph = null;
export default defineComponent({
  name: 'ConditionEditor',
  props: ['data'],
  components: {
    TeleportContainer,
  },
  setup(prop) {
    var data = prop?.data
    var message = useMessage()
    const findItem = (data, id) => {
      if (data.id === id) {
        return {
          parent: null,
          node: data,
        }
      }
      const {children} = data
      if (children) {
        for (let i = 0, len = children.length; i < len; i += 1) {
          const res = findItem(children[i], id)
          if (res) {
            return {
              parent: res.parent || data,
              node: res.node,
            }
          }
        }
      }
      return null
    }
    emitter.on('node:add', (event) => {
      var parentId = event.id;
      var item = findItem(data, parentId)?.node;
      if (item) {
        var newNode;
        if (isLogical(event.type)) {
          newNode = {
            id: Math.random(),
            type: 'logical-node',
            width: 100,
            height: 30,
            data: {
              logicalType: event.type
            }
          }
        } else {
          newNode = {
            id: Math.random(),
            type: 'edit-state-node',
            width: 500,
            height: 30,
            data: {
            }
          }
        }
        if (item.children) {
          item.children.push(newNode);
        } else {
          item.children = [newNode]
        }
      }
      render()
    })
    emitter.on('node:edit', (event) => {
      var nodeId = event.id;
      var currentItem = findItem(data, nodeId);
      var item = currentItem?.node;
      item.type = event.type
      item.width = 160
      item.data = {
        field: event.field,
        comparison: event.comparison,
        value: event.value
      }
      render()
    })
    emitter.on('node:change:logical', (event) => {
      var currentItem = findItem(data, event.id);
      currentItem.node.data = event.data
      render()
    })
    emitter.on('node:editing', (event) => {
      var currentItem = findItem(data, event.id);
      var node = currentItem.node;

      node.type = 'edit-state-node'
      node.data = {
        field: event.data.field,
        comparison: event.data.comparison,
        value: event.data.value
      }
      node.width = 500

      render()
    })
    emitter.on('node:delete', (event) => {
      var currentItem = findItem(data, event.id);
      const dataItem = currentItem?.parent
      if (dataItem && dataItem.children) {
        const { children } = dataItem
        const index = children.findIndex((item) => item.id === event.id)
        children.splice(index, 1)
        render()
      } else {
        message.warning("根节点不可删除")
      }
    })
    const render = () =>  {
      const result = Hierarchy.mindmap(data, {
        direction: 'H',
        getHeight(d) {
          return d.height
        },
        getWidth(d) {
          return d.width
        },
        getHGap() {
          return 40
        },
        getVGap() {
          return 20
        },
        getSide: () => {
          return 'right'
        },
      })
      const cells = []
      const traverse = (hierarchyItem) => {
        if (hierarchyItem) {
          const {data, children} = hierarchyItem
          cells.push(
              graph.createNode({
                id: data.id,
                shape: data.type,
                width: data.width,
                height: data.height,
                data: data.data,
                x: hierarchyItem.x,
                y: hierarchyItem.y
              }),
          )
          if (children) {
            children.forEach((item) => {
              const {id} = item
              cells.push(
                  graph.createEdge({
                    shape: 'mindmap-edge',
                    source: {
                      cell: data.id,
                      anchor: {
                        name: 'center',
                        args: {
                          dx: '25%'
                        }
                      }
                    },
                    target: {
                      cell: id,
                      anchor: {
                        name: 'left'
                      }
                    },
                  }))
              traverse(item)
            })
          }
        }
      }
      traverse(result)
      graph.resetCells(cells)
      graph.centerContent()
    }
    return {
      data, render
    }
  },
  methods:{

  },
  mounted() {
    graph = new Graph({
      container: document.getElementById('container'),
      panning: { enabled: true },
      selecting: { enabled: true },
      keyboard: { enabled: true },
      grid: true,
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20,
        },
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta']
      },
      interacting: {nodeMovable: false}
    })
    this.render()
  },
})

// eslint-disable-next-line no-unused-vars

insertCss(`
  .topic-image {
    visibility: hidden;
    cursor: pointer;
  }
  .x6-node:hover .topic-image {
    visibility: visible;
  }
  .x6-node-selected rect {
    stroke-width: 2px;
  }
`)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
