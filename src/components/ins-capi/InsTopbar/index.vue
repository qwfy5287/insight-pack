<template>
  <div :class="{ 'has-logo': showLogo }" class="ins-top-bar">
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
import Logo from './Logo.vue'
import InsSidebarItem from './InsSidebarItem.vue'
// import variables from './ins-top-bar-var.scss'
// import variables from '@/styles/variables.scss'

// common
import { listToTree, treeToListForRouter } from '../../../common/tree.common'

export default {
  name: 'InsTopbar',
  components: { InsSidebarItem, Logo },
  props: {
    /**
     * 只显示 第一级 false
     */
    onlyFirst: { type: Boolean, default: false },
    /**
     * 指定 根路径
     *  /example
     */
    rootPath: { type: String, default: null },
  },
  data() {
    return {
      mode: { vertical: 'vertical', horizontal: 'horizontal' },
      cacheOneChildrenList: [],
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      let result = []

      let list = treeToListForRouter(this.$router.options.routes, 'path', 'name')
      list?.forEach((d) => (d.path = d.fullPath))
      let tree = listToTree(list)
      result = tree

      //#region 指定 根路径
      if (this.rootPath) {
        let firstLevelItem = tree.find((d) =>
          // d.fullPath.startsWith(`/${this.$route.path.split('/')[1]}`)
          d.fullPath.startsWith(this.rootPath)
        )
        result = firstLevelItem?.children
      }
      //#endregion

      //#region 只显示第一级
      if (this.onlyFirst) {
        result?.forEach((d) => {
          if (d?.children?.length > 1) {
            // d.children = []
            // d.hidden = true
            d?.children.forEach((d) => (d.hidden = true))
          } else {
            this.cacheOneChildrenList.push(d.path)
          }
        })
      }
      //#endregion

      return result
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route

      let result = path

      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        result = meta.activeMenu
      }

      //#region 指定 根路径，先从路径中排除
      let newPath = route.path
      if (this.rootPath) {
        newPath = route.path.replace(this.rootPath, '')
      }
      //#endregion

      //#region 只显示第一级
      let firstPath = '/' + newPath.split('/')[1]
      if (this.onlyFirst && !this.cacheOneChildrenList.includes(firstPath)) {
        result = (this.rootPath ? this.rootPath : '') + firstPath
      }
      //#endregion

      return result
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      // return variables
      // 菜单颜色 配置
      return {
        menuText: '#e8edf1',
        menuActiveText: '#ffffff',
        subMenuActiveText: '#3390ff',
        menuBg: '#0f121b',
        menuHover: '#0f121b',
        subMenuBg: '#fafafa',
        subMenuHover: '#ecf5ff',
        sideBarWidth: '210px',
      }
    },
    isCollapse() {
      // return !this.sidebar.opened
      // TODO: 临时 一直显示顶部 菜单
      return false
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
