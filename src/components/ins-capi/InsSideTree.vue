<!--
名称：巡检任务-时间轴
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-side-tree max-w-screen-sm">
    <!-- {{ msg }} -->

    <!-- {{ treeData[0] }} -->
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
      v-if="treeData.length"
      ref="elTreeRef"
      :data="treeData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      class="mt-3 text-sm"
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <!-- :title="node.label" -->
        <el-popover
          placement="right"
          trigger="hover"
          :open-delay="300"
          popper-class="el-popover-custom"
          v-if="hasOpera === true"
        >
          <div>
            <el-button
              title="添加"
              type="success"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="append(data)"
            />
            <!-- <el-button
              title="编辑"
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="edit(data)"
            /> -->
            <el-button
              title="删除"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="remove(node, data)"
            />
          </div>
          <span slot="reference">{{ node.label }}</span>
        </el-popover>
        <span v-else>
          <!-- 节点 插槽 -->
          <slot :node="node">
            {{ node.label }}
          </slot>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, set } from '@vue/composition-api'

// component

// use

// common
// import merge from 'lodash/merge'
// import copy from 'fast-copy'
import { confirmRemove } from '../../common/confirm.common'
import debounce from 'lodash/debounce'
// api
let id = 1000
export default defineComponent({
  name: 'InsSideTree',
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
    hasOpera: { type: Boolean, default: true },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
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

    /**
     * 设置 当前节点
     *  .isCurrent
     */
    const setCurrentKey = (key, targetClick = true) => {
      ctx.refs.elTreeRef?.setCurrentKey(key)
      if (targetClick) {
        // 触发当前 节点单击事件
        let curNode = ctx.refs.elTreeRef?.getNode(key)
        handleNodeClick(curNode.data, curNode)
        // ctx.refs.elTreeRef?.getCurrentNode(key)
      }
    }

    const append = (data) => {
      const newChild = { id: id++, label: 'testNode', children: [] }
      if (!data.children) {
        // data.children = []
        // this.$set(data, 'children', [])
        set(data, 'children', [])
      }
      data.children.push(newChild)
    }

    const remove = async (node, data) => {
      // 有子级，不能删除
      if (node.childNodes.length > 0) {
        ctx.root.$message.error('请先删除子级。')
        return false
      }

      const resConfirm = await confirmRemove(node.label)
      if (!resConfirm) return false

      console.log(
        '🚀 ~ file: InsSideTree.vue ~ line 262 ~ remove ~ node.childNodes.length',
        node.childNodes.length
      )

      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
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
    const inputChange = debounce(function (val) {
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
      append,
      remove,
      inputChange,
      filterNode,
      setCurrentKey,
    }
  },
})
</script>

<style lang="scss" scoped>
.max-w-screen-sm {
  max-width: 640px;
}
.mt-3 {
  margin-top: 0.75rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.ins-side-tree {
  visibility: initial;
}

// 顶部固定时，滚动
.is-top {
  .el-tree {
    height: calc(100vh - 180px);
    overflow: auto;
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
