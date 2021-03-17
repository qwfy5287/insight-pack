<!--
名称：ins 气泡确认框
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <!-- <div class="ins-popover-confirm"> -->
  <!-- {{ msg }} -->
  <el-popover
    v-model="visible"
    class="ins-popover-confirm"
    placement="top"
    v-bind="$attrs"
    :title="title"
  >
    <p class="mt-1"><i class="el-icon-warning mr-0.5 el-icon-warning-confirm" />{{ content }}</p>
    <div class="mt-3 text-center">
      <el-button size="mini" @click="handleCancel">取消</el-button>
      <el-button type="primary" size="mini" @click="handleConfirm">确定</el-button>
    </div>
    <!-- <el-button slot="reference">删除</el-button> -->
    <el-button slot="reference" type="text">
      <i class="iconfont icon-delete" />
    </el-button>
  </el-popover>
  <!-- </div> -->
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
  name: 'InsPopoverConfirm',
  components: {},
  props: {
    title: { type: String, default: '提示' },
    content: { type: String, default: '此操作将永久删除 ( 当前记录 ), 是否继续?' },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      visible: false,
    })

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
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-popover-confirm {
  visibility: initial;
}
.el-button + .ins-popover-confirm {
  margin-left: 10px;
}
</style>
<style lang="scss">
.el-icon-warning-confirm {
  font-size: 16px;
  position: relative;
  top: 1px;
  color: #e6a23c;
}
</style>
