<!--
名称：Ins 排序
版本：1.0.0
作者：林加炳
时间：2021

事件
sort-change
-->
<template>
  <div class="ins-sort">
    <!-- {{ msg }} -->
    <!-- :default-sort="{ prop: 'address', order: 'descending' }" -->
    <el-table style="width: 100%" :default-sort="defaultSort" @sort-change="sortChange">
      <el-table-column
        v-for="(item, index) in tableHead"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        sortable="custom"
      >
      </el-table-column>
    </el-table>
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
  name: 'InsSort',
  components: {},
  props: {
    tableHead: {
      type: Array,
      default: () => {
        return [
          { label: '日期', prop: 'date' },
          { label: '姓名', prop: 'name' },
          { label: '地址', prop: 'address' },
        ]
      },
    },
    /**
     * 默认排序
     * { prop: 'catalogPkid', order: 'descending' }
     */
    defaultSort: { type: Object, default: () => ({}) },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      tableData: [
        // {
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄',
        // },
        // {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1517 弄',
        // },
        // {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1519 弄',
        // },
        // {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1516 弄',
        // },
      ],
    })

    const sortChange = ({ prop, order }) => {
      ctx.emit('sort-change', prop, order)
    }

    const render = () => {
      //
    }

    const init = () => {
      render()
      // 有默认排序时，手动触发事件
      if (props.defaultSort.prop && props.defaultSort.order) {
        ctx.emit('sort-change', props.defaultSort.prop, props.defaultSort.order)
      }
    }

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(state),
      sortChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-sort {
  visibility: initial;
}
::v-deep .el-table__body-wrapper {
  display: none;
}
</style>
