<template>
  <div>
    <n-space>
    <n-tag>就是</n-tag>
    </n-space>
  </div>
  <div id="mountNode"></div>
</template>

<script>
import G6 from "@antv/g6";
import NTag from "naive-ui";

export default {
  name: 'ConditionEditor',
  props: {
    msg: String
  },
  components: {
    NTag
  },
  mounted() {
    initGraph()
  }
}
const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node2', // String，必须，目标点 id
    },
  ],
};


G6.registerNode(
    'rect-xml',
    () => `
  <rect style={{
    width: 100, height: 20
  }} keyshape="true" name="test">
    <text
			name="title">你好</text>
  </rect>
`,
);


function initGraph() {
  const graph = new G6.Graph({
    container: 'mountNode', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    width: 800, // Number，必须，图的宽度
    height: 500, // Number，必须，图的高度
    defaultNode: {
      type: 'rect-xml',
      size: [120, 40],
    },
  });
  graph.data(data); // 读取 Step 2 中的数据源到图上
  graph.render(); // 渲染图
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
