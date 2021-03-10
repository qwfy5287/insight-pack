<!--
名称：插槽 表单项 rules 在子项
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <!-- <div class="ins-slot-form-item"> -->
  <!-- 'is-required': getRangeRequired(item.multiRules), -->
  <el-form-item
    :label="item.label"
    class="el-form-item-range"
    :rules="[]"
    :class="{
      'col-2': item.col === 2,
      'col-3': item.col === 3,
      'col-3-2': item.col === '2/3',
    }"
  >
    <slot />
  </el-form-item>
  <!-- {{ msg }} -->
  <!-- 11 -->
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
  name: 'InsSlotFormItem',
  components: {},
  props: {
    item: { type: Object, default: {} },
  },
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
.ins-slot-form-item {
  visibility: initial;
}
</style>
