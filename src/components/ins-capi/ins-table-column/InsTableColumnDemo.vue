<!--
名称：表格-公用列-示例
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <!-- 自定义组件-->
  <el-table-column v-bind="$attrs" class="ins-table-column-demo">
    <template #default="{ row, column }">
      <!-- {{ $attrs }} -->
      {{ row[column.property] }} 内容
    </template>
  </el-table-column>
</template>
<script>
import { defineComponent, onMounted, toRefs, reactive } from '@vue/composition-api'
// component
// common
// api
export default defineComponent({
  name: 'InsTableColumnDemo',
  components: {},
  props: {
    /**
     * table head 配置
     */
    item: { type: Object, default: null },
  },
  data() {
    return {}
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
    })
    //#region common
    //#endregion
    /**
     * 渲染页面
     */
    const render = () => {}
    /**
     * 获取数据
     */
    const fetchData = async () => {
      // stateEdit.loading.value = true
      // let res = null
      // if (ctx.root.$route.query.pkid) {
      //   res = await roleDetail({ pkid: ctx.root.$route.query.pkid })
      // }
      // state.item = res?.data
      // stateEdit.loading.value = false
    }
    /**
     * 初始化
     */
    const init = async () => {
      render()
      await fetchData()
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
.ins-table-column-demo {
  visibility: initial;
}
</style>
