<!--
名称：ins 气泡确认框 删除
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <el-popover
    v-model="visible"
    class="ins-popover-confirm-remove"
    placement="top-end"
    v-bind="$attrs"
    :title="title"
  >
    <p class="mt-1">
      <i class="el-icon-warning mr-0.5 el-icon-warning-confirm-remove" />{{ getConfirmContent() }}
    </p>
    <div class="mt-3 text-right">
      <el-button size="mini" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确定</el-button>
    </div>
    <span slot="reference">
      <slot>
        <el-button type="text" title="删除">
          <i class="iconfont icon-delete" />
        </el-button>
      </slot>
    </span>
  </el-popover>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api'

// component

// use

// common
// import merge from 'lodash/merge'
// import copy from 'fast-copy'

// api

export default defineComponent({
  name: 'InsPopoverConfirmRemove',
  components: {},
  props: {
    title: { type: String, default: '提示' },
    row: { type: Object, default: null },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      visible: false,
    })

    /**
     * 获取 提示内容
     */
    const getConfirmContent = () => {
      let row = props.row ?? {}
      const name = row?.name || row[Object.keys(row).find(d => d.includes('Name'))]
      return `此操作将永久删除 ( ${name || '当前记录'} ), 是否继续?`
    }

    const handleConfirm = () => {
      ctx.emit('confirm')
      state.visible = false
    }

    const handleCancel = () => {
      ctx.emit('cancel')
      state.visible = false
    }

    const render = () => {
      //
    }

    const init = () => {
      render()
    }

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(state),
      handleCancel,
      handleConfirm,
      getConfirmContent,
    }
  },
})
</script>

<style lang="scss">
.el-icon-warning-confirm-remove {
  font-size: 16px;
  position: relative;
  top: 1px;
  color: #e6a23c;
}
.el-button + .ins-popover-confirm-remove {
  margin-left: 10px;
}
</style>
