<!--
名称：Ins Iframe
版本：1.0.0
作者：林加炳
时间：2021

路由示例
{
  path: "resource",
  name: "Resource",
  component: InsIframe,
  meta: {
    title: "资源管理",
    // icon: 'table',
    embedUrl: `${embedHostScheduler}/#/dispatch/resources?proId=ALL&embed`,
  },
},
-->
<template>
  <div class="page-container ins-iframe">
    <!-- {{ msg }} -->
    <!-- {{ $route.meta.embedUrl }} -->
    <iframe v-if="url" ref="iFrameSsoLogout" :src="url" class="iframe-sso-logout" />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api'

// component

// use

// common
// import merge from 'lodash/merge'
// import copy from 'fast-copy'

// api

export default defineComponent({
  name: 'InsIframe',
  components: {},
  beforeRouteUpdate(to, from, next) {
    // debugger
    // react to route changes...
    // don't forget to call next()
  },
  props: {},
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      // url: 'http://192.168.11.122:8098/xh-smart/index.html#/permission/authority/profile?embed',
      // url: 'http://192.168.11.122:8098/xh-smart/index.html#/permission/role?embed',
      url: '/',
    })

    watch(
      () => 'ctx.root.$route',
      (a, c) => {
        // debugger
        // console.log('🚀 ~ file: InsIframe.vue ~ line 41 ~ watch ~ a, c', a, c)
      }
    )

    const render = () => {
      //
    }

    const init = () => {
      state.url = ctx.root.$route.meta?.embedUrl
      // console.log('🚀 ~ file: InsIframe.vue ~ line 55 ~ init ~ state.url', state.url)
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

<style lang="scss" scoped>
.ins-iframe {
  visibility: initial;
  overflow: hidden;
  & > iframe {
    border: 0;
    margin: 0;
    padding: 0;

    width: 100%;
    min-height: 500px;
    height: calc(100vh - 60px - 50px);
  }
}
</style>
