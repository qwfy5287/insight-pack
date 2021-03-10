<!--
名称：表格-公用列-字典文本
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <!-- 自定义组件-->
  <el-table-column v-bind="$attrs" class="ins-table-column-code-text">
    <template #default="{ row, column }">
      <!-- {{ $attrs }} -->
      {{ getText(row[column.property], item.code) }}
    </template>
  </el-table-column>
</template>
<script>
import { getOptionText } from '@/common/code.common'
import { defineComponent, onMounted, toRefs, reactive } from '@vue/composition-api'
// component
// common
// api
export default defineComponent({
  name: 'InsTableColumnCodeText',
  components: {},
  props: {
    /**
     * table head 配置
     */
    item: { type: Object, default: null, required: true },
  },
  data() {
    return {}
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
    })
    /**
     * 获取 列的文本
     */
    const getText = (val, code) => {
      let result = val
      if (val) {
        result = getOptionText(code, val)
      }
      return result
    }

    onMounted(() => {})

    return {
      ...toRefs(state),
      getText,
    }
  },
})
</script>
<style lang="scss" scoped>
.ins-table-column-code-text {
  visibility: initial;
}
</style>
