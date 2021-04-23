<!--
名称：Ins 表单项 插槽
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <el-form-item :label="label" v-bind="$attrs">
    <slot> 内容 </slot>
  </el-form-item>
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
  name: 'InsFormItemSlot',
  components: {},
  props: {
    label: { type: String, default: '' },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
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
.ins-form-item-slot {
  visibility: initial;
}
</style>
