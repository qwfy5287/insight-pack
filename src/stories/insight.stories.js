import './vue.common.js'

import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import MyButton from '../components/MyButton.vue'

import InsTemplate from '../components/ins-capi/InsTemplate.vue'
import InsPager from '../components/ins-capi/InsPager.vue'
import InsSideTreeLazy, { insHandleLoadNode } from '../components/ins-capi/InsSideTreeLazy.vue'
import InsSearch from '../components/ins-capi/InsSearch.vue'
import InsSlotPanel from '../components/ins-capi/InsSlotPanel.vue'

export default {
  title: 'Insight',
}

export const withInsSlotPanel = () => ({
  components: { InsSlotPanel },
  template: '<InsSlotPanel title="标题01">sdf</InsSlotPanel>',
  // methods: { action: action("clicked") },
})

export const withInsSearch = () => ({
  components: { InsSearch },
  template: '<InsSearch></InsSearch>',
  // methods: { action: action("clicked") },
})

// 树 懒加载
export const withInsSideTreeLazy = () => ({
  components: { InsSideTreeLazy },
  data() {
    return {
      pagerParams: {
        page: 1,
        limit: 10,
        total: 30,
      },
      isSpaceBetween: false,
    }
  },
  methods: {
    // handleLoadNode() {
    //   console.log('object')
    // },
    /**
     * 处理 树 懒加载
     */
    async handleLoadNode(node, resolve) {
      // let ss = this
      insHandleLoadNode(
        node,
        resolve,
        {
          label: '测试库',
          id: 0,
        },
        async arg => {
          let res = {
            data: [
              { id: 10, label: 'node-10' },
              { id: 20, label: 'node-20' },
              { id: 30, label: 'node-30' },
            ],
          }
          return res
        },
        async arg => {
          let res = {
            data: [
              { id: 1010, label: 'node-1010' },
              { id: 1020, label: 'node-1020' },
              { id: 1030, label: 'node-1030' },
            ],
          }
          return res
        }
      )
      // let parentId = node.id

      // let res = {}
      // if (node.level === 0) {
      //   res = {
      //     data: [
      //       {
      //         id: 0,
      //         label: '接口库',
      //       },
      //     ],
      //   }
      // } else if (node.level === 1) {
      //   parentId = 0
      //   // res = await swaggerQueryType()
      //   // transformTypeDataForTree(res)
      //   res = {
      //     data: [
      //       { id: 10, label: 'node-10' },
      //       { id: 20, label: 'node-20' },
      //       { id: 30, label: 'node-30' },
      //     ],
      //   }
      // } else if (node.level === 2) {
      //   // node.id 不是数据的 id
      //   parentId = node?.data?.id
      //   // res = await swaggerQueryByParentType({
      //   //   type: parentId,
      //   // })
      //   // transformDataForTree(res)
      //   res = {
      //     data: [
      //       { id: 1010, label: 'node-1010' },
      //       { id: 1020, label: 'node-1020' },
      //       { id: 1030, label: 'node-1030' },
      //     ],
      //   }
      // }

      // setTimeout(() => {
      //   resolve(res.data || [])
      // }, 0.2 * 1000)

      // //   if (node.level === 1) {
      // //     // 默认选中第一个
      // //     if (res?.data?.length) {
      // //       console.log(
      // //         '🚀 ~ file: ConfigDictionaryMain.vue ~ line 293 ~ handleLoadNode ~ res?.data',
      // //         res?.data
      // //       )
      // //       ctx.refs.insSideTreeLazyRef.setCurrentKey(res.data[0].pkid + res.data[0].dictionaryType)
      // //     }
      // //   }

      // // ctx.refs.insSideTreeLazyRef.setCurrentKey('25t02')
    },
  },
  template:
    '<InsSideTreeLazy ref="insSideTreeLazyRef" @loadNode="handleLoadNode" :isPopover="true" />',
})

// 分页
export const withInsPager = () => ({
  components: { InsPager },
  data() {
    return {
      pagerParams: {
        page: 1,
        limit: 10,
        total: 30,
      },
      isSpaceBetween: false,
    }
  },
  template: '<InsPager :isSpaceBetween="isSpaceBetween" :pagerParams="pagerParams" />',
})

export const withInsTemplate = () => ({
  components: { InsTemplate },
  template: '<InsTemplate></InsTemplate>',
  // methods: { action: action("clicked") },
})

export const withText = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action('clicked') },
})

// export const withJSX = () => ({
//   render() {
//     return (
//       <MyButton onClick={linkTo("Button", "With Some Emoji")}>
//         With JSX
//       </MyButton>
//     );
//   },
// });

// export const withSomeEmoji = () => ({
//   components: { MyButton },
//   template: "<my-button>😀 😎 👍 💯</my-button>",
// });
