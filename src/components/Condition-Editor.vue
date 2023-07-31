<template>
  <div class="app-content">
    <div style="height: 1000px" id="container"></div>
    <TeleportContainer/>
  </div>
</template>


<script>
import {defineComponent} from 'vue'
import {Graph, Path} from '@antv/x6'
import {register, getTeleport} from '@antv/x6-vue-shape'
import Hierarchy from "@antv/hierarchy";
import insertCss from 'insert-css'
import LogicalNode from "@/components/LogicalNode.vue";
import ComparisonsNode from "@/components/ComparisonsNode.vue";
import mitt from "mitt";
import emitter from "@/util/mitt.ts";
import EditStateNode from "@/components/EditStateNode";
import {isLogical} from "@/util/node.ts";


register({
  shape: 'logical-node',
  component: LogicalNode
})
register({
  shape: 'comparison-node',
  component: ComparisonsNode
})
register({
  shape: 'edit-state-node',
  component: EditStateNode
})
Graph.registerEdge(
    'mindmap-edge',
    {
      inherit: 'edge',
      router: {
        name: 'manhattan',
        args: {
          startDirections: ['right'],
          endDirections: ['left']
        }
      },
      connector: {
        name: 'rounded'
      },
      attrs: {}, //样式代码
      zIndex: 0
    },
    true,
)
// 连接器
Graph.registerConnector(
    'mindmap',
    (sourcePoint, targetPoint, routerPoints, options) => {
      const midX = sourcePoint.x + 10
      const midY = sourcePoint.y
      const ctrX = (targetPoint.x - midX) / 5 + midX
      const ctrY = targetPoint.y
      const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${midX} ${midY}
     Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
    `
      return options.raw ? Path.parse(pathData) : pathData
    },
    true,
)

Graph.registerNode('relative', {
  inherit: 'rect',
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'image',
      selector: 'switch'
    },
    {
      tagName: 'text',
      selector: 'label_text'
    },

  ],
  attrs: { //样式代码
    body: {},
    switch: {
      event: 'change:relative', //关系节点 切换 关系事件
      width: 16,
      height: 16,
      x: 12,
      y: 12,
    },
    label_text: {text: '并且'}
  },
  data: {relative: 'and'} //and并且 or或者 默认为 并且
})
Graph.registerNode('condition-text', {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body'
        },
        {
          tagName: 'g',
          attrs: { class: 'content' },
          children: [
            {
              tagName: 'text',
              textContent: "指标值",
              attrs: {
                x: 0,
                width: 20
              }
            },
            {
              tagName: 'text',
              textContent: "等于",
              attrs: {
                x: 20,
                width: 20
              }
            },
            {
              tagName: 'text',
              textContent: "123",
              attrs: {
                x: 40,
                width: 20
              }
            }
          ]
        },
      ],
      attrs: {
        body: {}
      }//样式代码
    }
)

const TeleportContainer = getTeleport()

let graph = null;
export default defineComponent({
  name: 'ConditionEditor',
  components: {
    TeleportContainer,
  },
  setup() {
    const findItem = (data, id) => {
      if (data.id === id) {
        return {
          parent: null,
          node: data,
        }
      }
      const { children } = data
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
      console.log(item)
      if (item) {
        var newNode;
        if (isLogical(event.type)) {
          newNode = {
            id: Math.random(),
            type: 'logical-node',
            width: 100,
            height: 30,
            data: {
              text: event.type
            }
          }
        } else {
          newNode = {
            id: Math.random(),
            type: 'edit-state-node',
            width: 500,
            height: 30,
            data: {
              text: "indCode = '123'"
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
      interacting: { nodeMovable: false }
    })
    render()
  },
})
var data = {
  id: "1",
  type: 'logical-node',
  data: {
    text: "AND"
  },
  isRoot: true,
  width: 100,
  height: 40,
  children: [
    {
      id: "4",
      type: 'logical-node',
      data: {
        text: "OR"
      },
      isRoot: true,
      width: 100,
      height: 40,
      children: [
        {
          id: "5",
          type: 'comparison-node',
          width: 160,
          height: 30,
          data: {
            text: "indCode = '123'"
          }
        },
        {
          id: "6",
          type: 'comparison-node',
          width: 160,
          height: 40,
          data: {
            text: "dataType = 1"
          }
        }
      ]
    },
    {
      id: "2",
      type: 'comparison-node',
      width: 160,
      height: 30,
      data: {
        text: "indCode = '123'"
      }
    },
    {
      id: "3",
      type: 'comparison-node',
      width: 160,
      height: 40,
      data: {
        text: "dataType = 1"
      }
    }
  ]
}
// eslint-disable-next-line no-unused-vars
const render = () => {
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
                    name:  'center',
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
  console.log(cells)
  graph.resetCells(cells)
  graph.centerContent()
}

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
