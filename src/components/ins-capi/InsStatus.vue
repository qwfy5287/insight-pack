<!--
名称：巡检任务-时间轴
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <span class="ins-status">
    <!-- {{ msg }} -->
    <el-tag :class="activeItem.class">{{ activeItem.label }}</el-tag>
  </span>
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
  name: 'InsStatus',
  components: {},
  props: {
    active: { type: String, default: '01' },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      list: [
        {
          label: '已保存',
          value: '01',
          class: 'c01',
        },
        {
          label: '已上架',
          value: '02',
          class: 'c02',
        },
        {
          label: '已下架',
          value: '03',
          class: 'c03',
        },
        {
          label: '已挂载',
          value: '04',
          class: 'c04',
        },
      ],
      // active: '02',
    })

    const activeItem = computed(() => {
      return state.list.find((d) => d.value === props.active) ?? {}
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
      activeItem,
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-status {
  visibility: initial;

  .c01 {
    color: #ffffff;
    background-color: #3390ff;
    border-color: #3390ff;
  }
  .c02 {
    color: #ffffff;
    background-color: #15bc83;
    border-color: #15bc83;
  }
  .c03 {
    color: #ffffff;
    background-color: #bdc8d2;
    border-color: #bdc8d2;
  }
  .c04 {
    color: #ffffff;
    background-color: #3390ff;
    border-color: #3390ff;
  }
}
</style>
