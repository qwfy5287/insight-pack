<!--
名称：编辑面板 
版本：1.0.0 
作者：林加炳
时间：2020-05-18 14:50:41
-->
<template>
  <div class="ins-slot-edit-panel">
    <!-- ins-slot-edit-panel -->
    <ins-slot-panel :title="title" :has-back="hasBack" :show-title="showTitle">
      <!-- 内容区 -->
      <div class="contentbox">
        <slot />
      </div>
      <!-- 工具栏 -->
      <div class="toolbar text-center">
        <slot name="toolbar" />
      </div>
    </ins-slot-panel>
  </div>
</template>
<script>
import InsSlotPanel from './InsSlotPanel.vue'

export default {
  name: 'InsSlotEditPanel',
  components: { InsSlotPanel },
  props: {
    /**
     * 面板标题
     */
    title: { type: String, default: null },
    hasBack: { type: Boolean, default: false },
    showTitle: { type: Boolean, default: true },
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
  },
}
</script>
<style lang="scss" scoped>
.text-center {
  text-align: center;
}

.ins-slot-edit-panel {
  visibility: initial;
  // .toolbar {
  //   margin-left: 118px;
  // }
}
::v-deep .ins-slot-panel {
  .body {
    padding-top: 20px;
  }
}
</style>
<style lang="scss">
.ins-slot-edit-panel > .el-loading-mask {
  z-index: 1;
}
</style>
