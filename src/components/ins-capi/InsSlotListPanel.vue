<!--
名称：插槽 列表 面板
版本：1.0.0
作者：林加炳
时间：2021

参数 
  title: 标题 
  searchbar: 搜索栏插槽 
  toolbar: 工具栏插槽
  默认插槽 
  pagebar: 分页栏插槽
依赖
  InsSlotPanel
搜索栏，右侧的迷你工具栏样式 toolbar-mini
-->
<template>
  <div class="ins-slot-list-panel" :class="{ embed: embed }">
    <!-- {{ msg }} -->
    <ins-slot-panel :title="title" :show-title="!(embed === true)">
      <!-- 顶部数据面板 -->
      <div v-if="showInfobox" class="infobox">
        <slot name="infobox" />
      </div>
      <!-- 搜索栏 -->
      <div class="searchbar relative">
        <slot name="searchbar" />
      </div>
      <!-- 工具栏 -->
      <div class="toolbar">
        <slot name="toolbar" />
      </div>
      <!-- 内容区 -->
      <div class="contentbox">
        <slot />
      </div>
      <!-- 分页栏 -->
      <div class="pagebar">
        <slot name="pagebar" />
      </div>
    </ins-slot-panel>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api'

// component
import InsSlotPanel from './InsSlotPanel.vue'

// use

// common
// import merge from 'lodash/merge'
// import copy from 'fast-copy'

// api

export default defineComponent({
  name: 'InsSlotListPanel',
  components: { InsSlotPanel },
  props: {
    /**
     * 面板标题
     */
    title: { type: String, default: null },
    showSearchbar: { type: Boolean, default: true },
    showToolbar: { type: Boolean, default: true },
    showPagebar: { type: Boolean, default: true },
    showInfobox: { type: Boolean, default: false },
    /**
     * 嵌入模式
     * padding 0
     * border  0
     */
    embed: { type: Boolean, default: false },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
    })

    const render = () => {
      // statePage.setTableHead([
      //   {
      //     label: '标题',
      //     prop: 'speName',
      //   },
      //   {
      //     label: '备注',
      //     prop: 'speDesc',
      //   },
      // ])
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

<style lang="scss">
.relative {
  position: relative;
}

.ins-slot-list-panel {
  visibility: initial;
  .toolbar {
    text-align: right;
  }

  .pagebar {
    margin-top: 20px;
    text-align: center;
  }
  &.embed {
    .ins-slot-panel {
      padding: 0;
      border: 0;
    }
  }
}

// 搜索栏，右侧的迷你工具栏
.toolbar-mini {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
