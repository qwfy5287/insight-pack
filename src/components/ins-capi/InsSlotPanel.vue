<!--
名称：插槽 面板
版本：1.0.0
作者：林加炳
时间：2021

参数 
  title: 标题 
  默认插槽
-->

<template>
  <div class="ins-slot-panel border rounded bg-white relative">
    <!-- {{ msg }} -->
    <!-- 标题 -->
    <!-- 没有就不显示 -->
    <div v-show="showTitle !== false" class="head p-4 px-5 border-b border-solid border-gray-200">
      <slot name="head">
        <h2 v-if="title != null" class="text-base inline-block m-0 font-bold text-gray-900">
          {{ title }}
        </h2>
      </slot>
      <span class="sub-title">
        <slot name="subTitle"></slot>
      </span>
    </div>

    <!-- 内容 -->
    <div class="body p-5 relative">
      <slot>内容</slot>
    </div>

    <!-- 返回按钮 -->
    <div v-if="hasBack" class="backBtn">
      <el-button icon="el-icon-arrow-left" @click="back">返回</el-button>
    </div>
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
  name: 'InsSlotPanel',
  components: {},
  props: {
    /**
     * 面板标题
     */
    title: { type: String, default: null },
    hasBack: { type: Boolean, default: false },
    showTitle: { type: Boolean, default: true },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
    })

    const back = () => {
      ctx.root.$router.go(-1)
    }

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
      back,
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-slot-panel {
  & + .ins-slot-panel {
    margin-top: 15px;
  }

  //返回按钮
  .backBtn {
    position: absolute;
    top: -40px;
    right: 0;
    text-align: right;
  }
  .sub-title {
    color: #999999; //#3390ff;
    font-weight: normal;
    margin-left: 8px;
    font-size: 14px;
  }
}
// .embed {
//   .head {
//     display: none;
//   }
// }
</style>
