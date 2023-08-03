import {register} from "@antv/x6-vue-shape";
import {Graph, Path} from "@antv/x6";
import LogicalNode from "@/components/LogicalNode.vue";
import ComparisonsNode from "@/components/ComparisonsNode.vue";
import EditStateNode from "@/components/EditStateNode.vue";

export const initX6 = () => {
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

}