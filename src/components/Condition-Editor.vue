<template>
  <div class="app-content">
    <div style="height: 400px" id="container"></div>
    <TeleportContainer/>
  </div>
</template>


<script>
import {defineComponent} from 'vue'
import {Graph, Path} from '@antv/x6'
import {register, getTeleport} from '@antv/x6-vue-shape'
import TagNode from "@/components/TagNode.vue";
import Hierarchy from "@antv/hierarchy";
import insertCss from 'insert-css'

register({
  shape: 'custom-vue-node',
  width: 100,
  height: 100,
  component: TagNode,
})
Graph.registerEdge(
    'mindmap-edge',
    {
      inherit: 'edge',
      connector: {
        name: 'mindmap',
      },
      attrs: {
        line: {
          targetMarker: '',
          stroke: '#A2B1C3',
          strokeWidth: 2,
        },
      },
      zIndex: 0,
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

const TeleportContainer = getTeleport()

let graph = null;
export default defineComponent({
  name: 'ConditionEditor',
  components: {
    TeleportContainer,
  },
  mounted() {
    graph = new Graph({
      container: document.getElementById('container'),
      connecting: {
        connectionPoint: 'anchor',
      },
    })
    render()
  },
})
var data = {
  id: "1",
  data: {
    text: "AND"
  },
  isRoot: true,
  width: 160,
  height: 50,
  children: [
    {
      id: "2",
      width: 160,
      height: 50,
      data: {
        text: "indCode = '123'"
      }
    },
    {
      id: "3",
      width: 160,
      height: 50,
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
      console.log(hierarchyItem)
      cells.push(
          graph.createNode({
            id: data.id,
            shape: 'custom-vue-node',
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
                source: {
                  cell: data.id,
                  anchor: {
                    name: 'right',
                  }
                },
                target: {
                  cell: id,
                  anchor: {
                    name: 'left'
                  }
                },
                sharp: 'mindmap-edge'
              }))
          traverse(item)
        })
      }
    }
  }
  traverse(result)
  graph.resetCells(cells)
  graph.centerContent()
  graph.zoomToFit({padding: 10, maxScale: 1})
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
