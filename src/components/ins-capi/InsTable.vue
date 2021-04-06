<!--
InsTemplate 模板 composition api
默认是页面
  app-container
-->

<template>
  <div class="ins-table">
    <!-- ins-table -->
    <el-table ref="elTable" :data="tableData" v-bind="$attrs" v-on="$listeners">
      <template v-for="(item, index) in getTableHeadFilter">
        <!-- 自定义列 插槽 -->
        <slot
          v-if="item.isSlot === true"
          v-bind="item"
          :name="item.prop"
          :item="item"
          :index="index"
          :label="item.label"
          :prop="item.prop"
        />
        <!-- 自定义列 动态组件 -->
        <component
          :is="item.component"
          v-else-if="item.component"
          :key="`ins_table_${index}`"
          v-bind="item"
          :item="item"
          :index="index"
          :label="item.label"
          :prop="item.prop"
        />
        <!--自定义列 内置 字典列 -->
        <ins-table-column-code-text
          v-else-if="item.element === elements.code || item.code"
          :key="`ins_table_${index}`"
          v-bind="item"
          :item="item"
          :index="index"
          :label="item.label"
          :prop="item.prop"
        />
        <!--自定义列 内置 日期时间列 -->
        <ins-table-column-date-time
          v-else-if="item.element === elements.datetime"
          :key="`ins_table_${index}`"
          v-bind="item"
          :item="item"
          :index="index"
          :label="item.label"
          :prop="item.prop"
        />
        <!-- 默认列 -->
        <!-- :align="align" -->
        <el-table-column
          v-else
          :key="`ins_table_${index}`"
          v-bind="item"
          :label="item.label"
          :prop="item.prop"
        />
      </template>
    </el-table>
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs, reactive, computed } from '@vue/composition-api'
// component
import InsTableColumnCodeText from './ins-table-column/InsTableColumnCodeText.vue'
import InsTableColumnDateTime from './ins-table-column/InsTableColumnDateTime.vue'

// common
import { TableElements } from '../../common/table.common'
export const useCommon = () => {
  //
}
// api
export default defineComponent({
  name: 'InsTable',
  components: { InsTableColumnCodeText, InsTableColumnDateTime },
  props: {
    /**
     * 表格头部配置
     */
    tableHead: { type: Array, default: null, required: true },
    /**
     * 表格数据配置
     */
    tableData: { type: Array, default: null, required: true },
  },
  data() {
    return {}
  },
  setup(props, ctx) {
    let state = reactive({
      msg: 'hello',
      elements: TableElements,
    })

    //#region common
    /**
     * 过滤 tableHead
     */
    let getTableHeadFilter = computed(() => {
      return props.tableHead?.filter(f => {
        return f.hidden !== true
      })
    })
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
      getTableHeadFilter,
    }
  },
})
</script>
<style lang="scss" scoped>
.ins-table {
  visibility: initial;
}
</style>
