<!--
名称：ins 搜索条
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-search" :class="{ 'has-reset': hasReset }">
    <!-- {{ msg }} -->
    <el-input
      v-model="keyword"
      placeholder="请输入关键字"
      clearable
      @keyup.enter.native="$emit('search', keyword)"
    >
      <el-button
        slot="append"
        type="primary"
        icon="el-icon-search"
        @click="$emit('search', keyword)"
      >
        立即查找
      </el-button>
    </el-input>
    <el-button
      v-if="hasReset"
      type="text"
      @click="
        keyword = null
        $emit('reset', null)
      "
      class="el-button-reset"
    >
      重置
    </el-button>
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
  name: 'InsSearch',
  components: {},
  props: {
    /**
     * 有重置按钮 false
     */
    hasReset: { type: Boolean, default: false },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      keyword: '',
    })

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
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-search {
  visibility: initial;
  &.has-reset {
    padding-right: 60px;
  }

  .el-button-reset {
    position: absolute;
    margin-left: 20px;
  }
}
::v-deep .el-input-group--append {
  & > .el-input__inner {
    // border: 0 !important;
    border: 1px solid #dcdfe6;
  }
  .el-input-group__append {
    border: 0;
    // padding: 0 19px;
    & > button {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 32px;
      margin: 0 -21px;
    }
  }
}
</style>
