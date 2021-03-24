<!--
名称：插槽- aside & main
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-slot-aside-main-panel">
    <el-container>
      <el-aside width="300px">
        <slot name="aside">
          aside
        </slot>
      </el-aside>
      <el-main class="ml-5 p-0">
        <slot>
          main
        </slot>
      </el-main>
    </el-container>
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
  name: 'InsSlotAsideMainPanel',
  components: {},
  props: {},
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
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
.ml-5 {
  margin-left: 1.25rem;
}
.p-0 {
  padding: 0px;
}

.ins-slot-aside-main-panel {
  visibility: initial;
}
</style>
