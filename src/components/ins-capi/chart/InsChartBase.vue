<!--
名称：Ins 图表 base
版本：1.0.0
作者：林加炳
时间：2021年06月02日13:53:16
-->
<template>
  <div class="page-container ins-chart-base">
    {{ msg }}
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
  name: 'InsChartBase',
  components: {},
  props: {},
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello InsChartBase',
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
.ins-chart-base {
  visibility: initial;
}
</style>
