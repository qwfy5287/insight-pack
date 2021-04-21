<!--
名称：Ins 弹框顶部编辑
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-dialog-top-edit">
    <!-- {{ msg }} -->

    <el-dialog
      :title="titleFull || titlePre + title"
      :visible.sync="visible"
      v-bind="$attrs"
      :width="width"
      :top="isTopDrawer === true ? '0' : top"
      :custom-class="`el-dialog-custom ${isTopDrawer ? 'is-top-drawer' : ''}`"
      v-on="$listeners"
    >
      <span slot="title">
        <slot name="title">{{ titleFull || titlePre + title }}</slot>
      </span>

      <div v-if="visible">
        <!-- 内容区域 -->
        <!-- 表单 -->

        <div class="form-box">
          <slot>表单</slot>
          <!-- <TripForm ref="tripForm" :dynamic-form="dynamicForm" /> -->
        </div>

        <!-- End 表单 -->
        <!-- End内容区域 -->
      </div>

      <span slot="footer" class="dialog-footer">
        <slot name="foot">
          <el-button @click="close()">{{ cancelText }}</el-button>
          <el-button type="primary" :loading="loading" @click="save()">{{ okText }}</el-button>
        </slot>
      </span>
    </el-dialog>
  </div>
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
  name: 'InsDialogTopEdit',
  components: {},
  props: {
    /**
     * 标题 会根据 item 自动加前缀 编辑|添加
     */
    title: { type: String, default: null },
    /**
     * 完整标题
     */
    titleFull: { type: String, default: null },
    /**
     * 宽度 1200px
     */
    width: { type: String, default: '1200px' },
    // width: { type: String, default: '860px' },
    /**
     * top
     */
    top: { type: String, default: '5vh' },
    /**
     * 点确定时 自动关闭 false
     */
    autoClose: { type: Boolean, default: false },
    /**
     * 取消 文字
     */
    cancelText: { type: String, default: '取 消' },
    /**
     * 确定 文字
     */
    okText: { type: String, default: '确 定' },
    /**
     * 是否 顶部抽屉
     */
    isTopDrawer: { type: Boolean, default: true },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      visible: false,
      titlePre: '添加',
      loading: false,
    })

    /**
     * 编辑或新建 外部调用
     */
    const edit = (item, isDetail = false) => {
      state.visible = true

      // 修改或添加
      if (item) {
        state.titlePre = isDetail ? '查看' : '修改'
      } else {
        state.titlePre = '添加'
      }
    }

    /**
     * 处理确定
     */
    const save = () => {
      ctx.emit('save')
      if (props.autoClose === true) close()
    }

    /**
     * 关闭 外部调用
     */
    const close = () => {
      state.visible = false
      // state.loading = false
    }

    const changeLoading = bol => {
      // state.loading = bol
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
      edit,
      save,
      close,
      changeLoading,
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-dialog-top-edit {
  visibility: initial;
  .form-box {
    width: 100%;
  }
}
// ::v-deep .el-dialog-custom {
//   background-color: red;
// }
::v-deep .is-top-drawer {
  // margin-top: 0 !important;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
