<!--
名称：Ins 排序
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-sort">
    <!-- {{ msg }} -->
    <!-- ins-sort
    <div>
      <ul class=" h-3">
        <li v-for="(item, index) in list" :key="index" class="float-left">
          {{ item.label }}
          <i>u</i>
          <i>d</i>
        </li>
      </ul>
    </div> -->
    <div>
      <!-- :default-sort="{ prop: 'address', order: 'descending' }" -->
      <el-table :data="tableData" style="width: 100%" @sort-change="sortChange">
        <!-- <el-table-column prop="date" label="日期" width="180" sortable="custom"> </el-table-column> -->
        <!-- <el-table-column prop="name" label="姓名" width="180" sortable="custom"> </el-table-column> -->
        <!-- <el-table-column prop="address" label="地址" sortable="custom"> </el-table-column> -->

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
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      list: [{ label: '名称' }, { label: '日期' }, { label: '数量' }],
      active: 1,
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
      //   tableHead: [
      //     { label: '日期', prop: 'date' },
      //     { label: '姓名', prop: 'name' },
      //     { label: '地址', prop: 'address' },
      //   ],
    })

    const sortChange = (column, prop, order) => {
      console.log(
        '🚀 ~ file: InsSort.vue ~ line 77 ~ sortChange ~ column, prop, order',
        column,
        prop,
        order
      )
      ctx.emit('sortChange', column, prop, order)
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
