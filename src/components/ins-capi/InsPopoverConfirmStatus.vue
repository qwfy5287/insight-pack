<!--
名称：ins 气泡确认框 状态
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <el-popover
    v-model="visible"
    class="ins-popover-confirm-status"
    placement="top-end"
    v-bind="$attrs"
    :title="title"
  >
    <p class="mt-1">
      <i class="el-icon-warning mr-0d5 el-icon-warning-confirm-status" />{{ getConfirmContent() }}
    </p>
    <div class="mt-3 text-right">
      <el-button size="mini" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm"> 确定 </el-button>
    </div>
    <span slot="reference">
      <slot>
        <el-switch
          :value="row.status"
          title="状态"
          :active-value="activeValue"
          :inactive-value="inactiveValue"
        >
        </el-switch>
        <span class="el-switch-cover" :title="buttonTitle"></span>
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
  name: 'InsPopoverConfirmStatus',
  components: {},
  props: {
    title: { type: String, default: '提示' },
    row: { type: Object, default: null },
    buttonTitle: { type: String, default: '状态' },
    //
    activeValue: { type: Number, default: 1 },
    activeText: { type: String, default: '启用' },
    inactiveValue: { type: Number, default: 0 },
    inactiveText: { type: String, default: '禁用' },
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
      const name = row?.name || row[Object.keys(row).find((d) => d.includes('Name'))] || row?.label
      let status = row?.status ?? props.inactiveValue
      let nextStatusText = status === props.inactiveValue ? props.activeText : props.inactiveText
      return `此操作将${nextStatusText} ( ${name || '当前记录'} ), 是否继续?`
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
.mt-1 {
  margin-top: 0.25rem;
}
.mr-0d5 {
  margin-right: 0.125rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.text-right {
  text-align: right;
}

.el-icon-warning-confirm-status {
  font-size: 16px;
  position: relative;
  top: 1px;
  color: #e6a23c;
}
.el-button + .ins-popover-confirm-status {
  margin-left: 6px;
}

.ins-popover-confirm-status + .el-button {
  margin-left: 6px;
}

.el-popover__reference {
  position: relative;
}

.el-switch-cover {
  // background: red;
  // opacity: 0.5;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
}
</style>
