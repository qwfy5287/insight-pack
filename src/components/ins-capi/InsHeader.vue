<!--
名称：Ins Header
版本：1.0.0
作者：林加炳
时间：2021年05月27日11:12:15

插槽
  left,center,right
-->
<template>
  <div class="ins-header">
    <!-- {{ msg }} -->

    <div class="head-box">
      <!-- Logo 系统名称 -->
      <div class="head-item head-item-left" :style="styleLeft">
        <slot name="left">
          <router-link :title="title" :to="homeUrl" class="headbar-logo">
            <img :src="logo" class="logoImg" />
            <h2 class="logo-text">
              {{ title }}
            </h2>
          </router-link>
        </slot>
      </div>
      <!-- 顶部菜单 -->
      <div class="head-item head-item-center">
        <slot name="center">
          <div class="top-menu-bar">
            <!-- <Topbar /> -->
          </div>
        </slot>
      </div>
      <!-- 用户图标 注销 -->
      <div class="head-item head-item-right">
        <slot name="right">
          <div class="rgt-wrap">
            <el-dropdown class="avatar-container" trigger="hover">
              <div class="avatar-wrapper">
                <!-- <img class="user-avatar" src="../components/user-man.png" alt="" /> -->
                <!-- 用户头像 -->
                <ins-svg-icon
                  class="float-left w-7 h-7"
                  :icon-class="'user-man'"
                  :reset-class="true"
                />
                <!-- 用户名 -->
                <span class="user-root">{{ username || '未登录' }}</span>
                <!-- <i class="el-icon-caret-bottom" /> -->
              </div>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item v-for="(item, index) in list" :key="index">
                  <span style="display: block" @click="handleMenu(item)">{{ item.label }}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </slot>
      </div>
    </div>

    <!-- Headbar -->
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api'

// component
// import InsSvgIcon from 'insight-pack/src/components/ins-capi/InsSvgIcon.vue'
import InsSvgIcon from '../../components/ins-capi/InsSvgIcon.vue'

// use

// common
// import merge from 'lodash/merge'
// import copy from 'fast-copy'
import techLogo from '@/assets/img/tech-logo.png'

// api

export default defineComponent({
  name: 'InsHeader',
  components: { InsSvgIcon },
  props: {
    /**
     * logo 图片
     */
    logo: { type: String, default: techLogo },
    /**
     * logo 标题
     */
    title: { type: String, default: 'Demeter Center' },
    /**
     * 下拉菜单列表
     */
    list: {
      type: Array,
      default: () => {
        return [
          { label: '个人信息', name: 'info' },
          { label: '修改密码', name: 'password' },
          { label: '注销', name: 'logout' },
        ]
      },
    },
    /**
     * 用户名
     */
    username: { type: String, default: null },
    /**
     * 首页路由
     */
    homeUrl: { type: String, default: '/' },
    /**
     * 左栏 宽度
     */
    leftWidth: { type: Number, default: null },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello InsHeader',
    })

    const styleLeft = computed(() => {
      return {
        // 间距 150
        // width: `${this.leftWidth + (75 * 2)}px`
        // 间距 138
        width: `${props.leftWidth}px`,
      }
    })

    const handleMenu = (item) => {
      ctx.emit('menu-click', item)
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
      handleMenu,
      styleLeft,
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-header {
  visibility: initial;
  font-size: inherit;
  height: 60px;
  position: fixed;
  width: 100%;
  z-index: 2001;
  top: 0px;
  background: #0f121b;
  color: #fff;

  .head-box {
    height: 100%;
    display: flex;
    .head-item {
      flex: auto;
      &-center {
        flex-grow: 2;
      }
    }
  }

  // border-bottom: 1px solid rgb(240, 240, 240);
  // box-shadow: 0 5px 10px rgb(240, 240, 240);
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .headbar-logo {
    & > .logoImg {
      height: 28px;
      /* height: 30px; */
      position: absolute;
      top: 50%;
      left: 30px;
      transform: translateY(-50%);
    }
    & > .logo-text {
      position: absolute;
      top: 50%;
      left: 70px;
      transform: translateY(-50%);
      display: inline-block;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      margin: 0;
    }
  }
  .rgt-wrap {
    height: 100%;
    // width: 300px;
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    .el-badge {
      margin-right: 10px;
      cursor: pointer;
      i {
        font-size: 20px;
        color: #e8edf1;
        cursor: pointer;
      }
      .el-badge__content {
        top: 16px;
        right: 10px;
      }
    }
    .avatar-container {
      display: inline-block;
      color: #fff;
      z-index: 1000;
      .avatar-wrapper {
        cursor: pointer;
        line-height: initial;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          margin-right: 10px;
        }
        .user-root {
          margin-left: 10px;
        }
        // .userRoot {
        // }
        // .el-icon-caret-bottom {
        // }
      }
    }
  }

  .iframe-sso-logout {
    height: 58px;
    width: 80px;
    position: absolute;
    opacity: 0.3;
    border: 0;
  }
  .top-menu-bar {
    position: absolute;
    height: 100%;
    top: 0;
    left: 300px;
  }
}
</style>
