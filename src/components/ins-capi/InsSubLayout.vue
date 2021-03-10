<!--
名称：子路由 模板
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <router-view :key="key" />
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api'

// component

// use

// common
// import merge from 'lodash/merge'
// import copy from 'fast-copy'

// api

export default defineComponent({
  name: 'InsSubLayout',
  components: {},
  props: {},
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
    })

    const key = computed(() => {
      return ctx.root.$route.path
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
      key,
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-sub-layout {
  visibility: initial;
}
</style>
