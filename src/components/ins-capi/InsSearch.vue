<!--
名称：巡检任务-时间轴
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-search">
    <!-- {{ msg }} -->
    <!-- <el-button type="primary">主要按钮</el-button> -->
    <el-input
      v-model="keyword"
      placeholder="请输入关键字"
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
  props: {},
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      keyword: '',
    })

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
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-search {
  visibility: initial;
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
