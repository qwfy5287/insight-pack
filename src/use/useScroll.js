import { toRefs, reactive, onBeforeMount, onUnmounted, onMounted } from '@vue/composition-api'

import throttle from 'lodash/throttle'

export const useScroll = (props, ctx) => {
  const state = reactive({
    isTop: false,
    isBottom: false,
    // 节流时间 默认 300 毫秒
    delay: { type: Number, default: 300 },
    /**
     * 顶部滚动距离
     */
    scrollTop: 0,
  })

  // 节流
  const handleScroll = throttle(function () {
    handleOnBottom()
    // ctx.emit('scroll')
  }, state.delay)

  /**
   * 滚动到底部
   */
  const handleOnBottom = () => {
    // 变量scrollTop是滚动条滚动时，距离顶部的距离
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // 变量windowHeight是可视区的高度
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    // 变量scrollHeight是滚动条的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    // 滚动条到底部的条件
    const isBottom = scrollTop + windowHeight === scrollHeight
    // if (scrollTop + windowHeight === scrollHeight) {
    //   // 写后台加载数据的函数
    // console.log('距顶部' + scrollTop + '可视区高度' + windowHeight + '滚动条总高度' + scrollHeight)
    // }
    if (isBottom) {
      //   console.log('🚀 ~ file: useScroll.js ~ line 38 ~ handleOnBottom ~ isBottom', isBottom)
      //   ctx.emit('onBottom')
      state.isBottom = isBottom
    }

    //
    state.scrollTop = scrollTop
  }

  onBeforeMount(() => {
    // console.log('🚀 ~ file: useScroll.js ~ line 10 ~ onBeforeMount ~ onBeforeMount')
  })

  onUnmounted(() => {
    // console.log('🚀 ~ file: useScroll.js ~ line 14 ~ onUnmounted ~ onUnmounted')
    // if (this.element) {
    //   document.querySelector(this.element).removeEventListener('scroll', this.handleScroll)
    // } else {
    window.removeEventListener('scroll', handleScroll)
    // }
  })

  onMounted(() => {
    // if (this.element) {
    //   document.querySelector(this.element).addEventListener('scroll', this.handleScroll)
    // } else {
    window.addEventListener('scroll', handleScroll)
    // }
  })

  return {
    ...toRefs(state),
  }
}
