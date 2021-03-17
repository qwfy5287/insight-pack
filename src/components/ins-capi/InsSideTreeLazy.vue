<!--
名称：侧栏树 异步加载
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-side-tree-lazy max-w-screen-sm">
    <!-- {{ msg }} -->

    <div>
      <el-input
        v-model="filterText"
        placeholder="请输入关键字"
        size="mini"
        class="input-with-select"
        @input="inputChange"
      >
        <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!-- show-checkbox -->
    <el-tree
      ref="elTreeRef"
      :node-key="nodeKey"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      class="mt-3 text-sm"
      lazy
      :default-expanded-keys="[0]"
      :load="handleLoadNode"
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <!-- :title="node.label" -->
        <el-popover
          placement="right"
          trigger="hover"
          :open-delay="300"
          popper-class="el-popover-custom"
        >
          <div>
            <el-button
              title="添加"
              type="success"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="add(node, data)"
            />
            <el-button
              title="编辑"
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="edit(node, data)"
            />
            <el-button
              title="删除"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="remove(node, data)"
            />
          </div>
          <span slot="reference" class="node-label">
            {{ node.label }}
          </span>
        </el-popover>
        <!-- <el-popover
          placement="right"
          trigger="hover"
          :open-delay="300"
          popper-class="el-popover-custom"
        >
          <div>
            <el-button
              title="添加"
              type="success"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="add(data)"
            />
            <el-button
              title="编辑"
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="edit(data)"
            />
            <el-button
              title="删除"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="remove(node, data)"
            />
          </div>
          <span slot="reference" class="opera">:</span>
        </el-popover> -->
      </span>
    </el-tree>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api'

// component

// use

// common
// import merge from 'lodash/merge'
// import copy from 'fast-copy'
// import { confirmRemove } from 'insight-pack/src/common/confirm.common'
// import { confirmRemove } from '@/common/confirm.common'
import { confirmRemove } from '../../common/confirm.common'
import debounce from 'lodash/debounce'
// api
// let id = 1000

/**
 * Ins 处理 树 懒加载
 */
export const insHandleLoadNode = async (
  node,
  resolve,
  rootNode,
  callbackQueryTopLevel,
  callbackQueryByParentId
) => {
  let parentId = node.id

  let res = {}
  if (node.level === 0) {
    res = {
      data: [
        rootNode || {
          label: '分类库',
          id: 0,
        },
      ],
    }
  } else if (node.level === 1) {
    parentId = 0
    res = await callbackQueryTopLevel({
      parentId,
    })
  } else {
    // node.id 不是数据的 id
    // parentId = node?.data?.pkid
    parentId = node.id
    res = await callbackQueryByParentId?.({
      parentId,
    })
  }

  // setTimeout(() => {
  resolve(res?.data || [])
  // }, 0.2 * 1000)

  // if (node.level === 1) {
  //   // 默认选中第一个
  //   if (res?.data?.length) {
  //     // ctx.refs.insSideTreeLazyRef.setCurrentKey(res.data[0].pkid)
  //   }
  // }
}

/**
 * 转换节点数据
 * id,label
 */
export const transformResData = (res, id = 'id', label = 'label') => {
  // 转换数据
  res?.data?.forEach(d => {
    d.id = d[id]
    d.label = d[label]
  })
}

export default defineComponent({
  name: 'InsSideTreeLazy',
  components: {},
  props: {
    treeData: { type: Array, default: () => [] },
    defaultProps: {
      type: Object,
      default: () => ({
        children: 'children',
        label: 'label',
      }),
    },
    nodeKey: { type: String, default: 'id' },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      data1: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ],

      filterText: '',
    })

    //#region common

    //#endregion

    /**
     * 设置 当前节点
     *  .isCurrent
     */
    const setCurrentKey = key => {
      ctx.refs.elTreeRef?.setCurrentKey(key)
      // 触发当前 节点单击事件
      let curNode = ctx.refs.elTreeRef?.getNode(key)
      handleNodeClick(curNode.data, curNode)
      // ctx.refs.elTreeRef?.getCurrentNode(key)
    }

    /**
     * 展开节点
     */
    const expandNode = key => {
      let parentNode = ctx.refs.elTreeRef?.getNode(key)
      if (parentNode) parentNode.expanded = true
    }

    /**
     * 更新子节点列表
     */
    const updateKeyChildren = (key, data) => {
      ctx.refs.elTreeRef.updateKeyChildren(key, data)
    }

    const handleLoadNode = (node, resolve) => {
      /**
       * loadNode event.
       * @event onLoadNode
       * @type {object}
       */
      ctx.emit('loadNode', node, resolve)
    }

    const add = (node, data) => {
      // const newChild = { id: id++, label: 'testNode', children: [] }
      // if (!data.children) {
      //   // data.children = []
      //   // this.$set(data, 'children', [])
      //   set(data, 'children', [])
      // }
      // data.children.push(newChild)

      ctx.emit('add', node, data)
    }

    const remove = async (node, data) => {
      // 有子级，不能删除
      if (node.childNodes.length > 0) {
        ctx.root.$message.error('请先删除子级。')
        return false
      }

      const resConfirm = await confirmRemove(node.label)
      if (!resConfirm) return false

      ctx.emit('remove', node, data)

      // console.log(
      //   '🚀 ~ file: InsSideTree.vue ~ line 262 ~ remove ~ node.childNodes.length',
      //   node.childNodes.length
      // )

      // const parent = node.parent
      // const children = parent.data.children || parent.data
      // const index = children.findIndex(d => d.id === data.id)
      // children.splice(index, 1)
    }

    const handleNodeClick = (data, node) => {
      ctx.emit('nodeClick', data, node)
    }

    const filterNode = (value, data) => {
      if (!value) {
        return true
      }
      return data[props.defaultProps.label].indexOf(value) !== -1
    }

    /**
     * 文本框 输入 值改变
     */
    const inputChange = debounce(function(val) {
      console.log('🚀 ~ file: InsSideTree.vue ~ line 300 ~ inputChange ~ val', val)
      // this.$emit('change', item)
      ctx.refs.elTreeRef.filter(val)
    }, 500)

    const render = () => {
      // statePage.setTableHead([
      //   {
      //     label: '标题',
      //     prop: 'speName',
      //   },
      //   {
      //     label: '备注',
      //     prop: 'speDesc',
      //   },
      // ])
    }

    const init = () => {
      render()
    }

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(state),
      handleNodeClick,
      add,
      remove,
      inputChange,
      filterNode,
      handleLoadNode,
      updateKeyChildren,
      expandNode,
      setCurrentKey,
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-side-tree-lazy {
  visibility: initial;
  .custom-tree-node {
    width: 100%;
    // padding-right: 20px;
    // position: relative;
    .node-label {
      display: block;
    }
    i {
      position: absolute;
      right: 0;
    }
    .opera {
      position: absolute;
      right: 0;
      display: none;
    }
    &:hover {
      .opera {
        display: inline;
      }
    }
    // & > span {
    //   // display: block;
    //   // padding-right: 20px;
    //   // position: relative;
    //   & > span {
    //     // display: block;
    //     // position: absolute;
    //     // right: 0;
    //   }
    // }
  }
}
</style>

<style lang="scss">
.el-popover-custom {
  min-width: 50px;
}

.el-tree-node.is-current {
  & > .el-tree-node__content {
    background: #f5f7fa;
    border-radius: 2px;
  }
}
</style>
