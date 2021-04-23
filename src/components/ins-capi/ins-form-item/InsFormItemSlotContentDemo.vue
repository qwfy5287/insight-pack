<!--
名称：Ins 表格项 插槽内容 示例
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-form-item-slot-content-demo">
    <!-- {{ msg }} -->
    <!-- 用于 触发 表单的校验 -->
    <el-input v-show="false" :value="modelValue" />
    内容
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
  name: 'InsFormItemSlotContentDemo',
  components: {},
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    modelValue: { type: String, required: true },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      resSystem: [],
      resInterface: [],
    })

    /**
     * 更新 modelValue
     */
    const emitModelValueChange = (tableData) => {
      let result = tableData?.map((d) => ({
        systemId: d.systemId,
        interfaceId: d.interfaceId,
        allTotal: d.allTotal ?? null,
        dayTotal: d.dayTotal ?? null,
      }))

      if (result?.length) {
        ctx.emit('change', JSON.stringify(result))
      } else {
        ctx.emit('change', '')
      }
    }

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
      emitModelValueChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-form-item-slot-content-demo {
  visibility: initial;
}
</style>
