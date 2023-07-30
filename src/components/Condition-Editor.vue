<template>
  <div class="app-content">
    <div style="height: 400px" id="container"></div>
    <TeleportContainer/>
  </div>
</template>


<script>
import {defineComponent} from 'vue'
import {Graph, Shape} from '@antv/x6'
import {register, getTeleport} from '@antv/x6-vue-shape'
import TagNode from "@/components/TagNode.vue";
import Hierarchy from "@antv/hierarchy";

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
      grid: true,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: 'ctrl',
        minScale: 0.5,
        maxScale: 3,
      },
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
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        },
      },
      highlighting: {
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF',
            },
          },
        },
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
  children: [
    {
      id: "2",
      data: {
        text: "indCode = '123'"
      }
    },
    {
      id: "3",
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
            shape: 'custom-vue-node',
            width: data.width,
            height: data.height,
            data: data.data
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
  graph.zoomToFit({ padding: 10, maxScale: 1 })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
