<!--
名称：巡检任务-时间轴
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="page-container ins-template">
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
  name: 'InsTemplate',
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
.ins-template {
  visibility: initial;
}
</style>
