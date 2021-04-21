<!--
名称：分页器 
版本：1.0.0 
作者：林加炳
时间：2020年03月19日14:21:26 
-->
<template>
  <div class="ins-pager" :class="{ 'is-space-between': isSpaceBetween }">
    <!-- ins-pager -->
    <el-pagination
      background
      :page-sizes="[5, 10, 20, 30, 40]"
      :total="pagerParams.total"
      :page-size="pagerParams.limit"
      :current-page="pagerParams.page"
      :layout="
        pagerParams.layout ||
        (isSpaceBetween
          ? 'total, sizes, next, pager, prev, jumper'
          : 'total, sizes, prev, pager, next, jumper')
      "
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'InsPager',
  components: {},
  props: {
    /**
     * 分页参数
     *  page 当前页
     *  limit 每页条数
     *  total 总条数
     */
    pagerParams: {
      type: Object,
      default: function () {
        return {
          page: 1,
          limit: 10,
          total: 100,
        }
      },
    },
    /* 是否左右分布 */
    isSpaceBetween: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    async init() {
      await this.fetchData()
    },
    // 获取数据
    async fetchData() {},
    // 渲染页面
    render() {},
    //
    /**
     * 切换页面或每页数量 时触发
     */
    change() {
      this.$emit('change')
    },
    // 事件方法
    handleCurrentChange(page) {
      this.pagerParams.page = page
      this.change()
    },
    handleSizeChange(limit) {
      this.pagerParams.limit = limit
      this.pagerParams.page = 1
      this.change()
    },
  },
}
</script>
<style lang="scss">
.ins-pager {
  visibility: initial;
  width: 100%;
  overflow: auto;
  text-align: center;
  &.is-space-between {
    .el-pagination {
      .el-pagination__total,
      .el-pagination__sizes,
      .el-pagination__jump {
        float: left;
      }
      .btn-prev,
      .btn-next,
      .el-pager {
        float: right;
      }
    }
  }
}
</style>
