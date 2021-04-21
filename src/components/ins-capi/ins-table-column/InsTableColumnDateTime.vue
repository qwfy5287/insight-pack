<!--
名称：表格-公用列-日期时间
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <!-- 自定义组件-->
  <el-table-column
    v-bind="$attrs"
    class="ins-table-column-date-time"
    :width="($attrs && $attrs.width) || 140"
  >
    <template #default="{ row, column }">
      <!-- {{ $attrs }} -->
      {{ getText(row[column.property]) }}
    </template>
  </el-table-column>
</template>
<script>
import { defineComponent, onMounted, toRefs, reactive } from '@vue/composition-api'
// component
// common
import { parseTime } from '@/utils'
// api
export default defineComponent({
  name: 'InsTableColumnDateTime',
  components: {},
  props: {},
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
    const getText = (arg) => {
      let result = arg
      if (arg) {
        result = parseTime(new Date(arg), '{yyyy}-{mm}-{dd} {hh}:{ii}:{ss}')
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
.ins-table-column-date-time {
  visibility: initial;
}
</style>
