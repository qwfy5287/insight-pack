<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      :mode="mode.horizontal"
    >
      <ins-sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        class="ins-sidebar-item"
      />
    </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import InsSidebarItem from './InsSidebarItem'
import variables from './ins-top-bar-var.scss'
// import variables from '@/styles/variables.scss'

// common
import { listToTree, treeToListForRouter } from 'insight-pack/src/common/tree.common'

export default {
  name: 'InsTopbar',
  components: { InsSidebarItem, Logo },
  data() {
    return {
      mode: { vertical: 'vertical', horizontal: 'horizontal' },
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      // debugger

      // console.log(
      //   '🚀 ~ file: index.vue ~ line 46 ~ routes ~ this.$router.options.routes',
      //   this.$router.options.routes
      // )
      let list = treeToListForRouter(this.$router.options.routes, 'path', 'name')
      list?.forEach(d => (d.path = d.fullPath))
      // console.log('🚀 ~ file: index.vue ~ line 49 ~ routes ~ list', list)
      let tree = listToTree(list)
      let firstLevelItem = tree.find(d =>
        // d.fullPath.startsWith(`/${this.$route.path.split('/')[1]}`)
        d.fullPath.startsWith(`/portal`)
      )
      // console.log('🚀 ~ file: index.vue ~ line 52 ~ routes ~ firstLevelItem', firstLevelItem)
      return firstLevelItem?.children
      //
      // return this.$router.options.routes[4]?.children
      // return [this.$router.options.routes[4]]
      // return this.$router.options.routes
    },
    activeMenu() {
      // debugger
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
}
</script>
<style lang="scss" scoped>
.ins-sidebar-item {
  // width: 150px;
  // padding-left: 20px;
  // padding-right: 20px;
  float: left;
}
::v-deep .el-menu {
  &.el-menu--horizontal {
    border-bottom: 0;
    font-weight: bold;
  }
  .el-submenu {
    .el-submenu__icon-arrow {
      margin-top: -4px;
    }
  }
  .el-menu-item.is-active {
    // border-bottom-width: 4px;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: #3390ff !important;
  }
  .el-submenu.is-active .el-submenu__title {
    // border-bottom-width: 4px;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: #3390ff !important;
  }
}
</style>
