<!--
名称：Ins Lottie svg 动画
版本：1.0.0
作者：林加炳
时间：2021年04月28日11:03:58

// lottie-web
// https://www.yuque.com/lottie/document/web
-->
<template>
  <div class="ins-lottie">
    <!-- {{ msg }} -->
    <div ref="lottieContainerRef" :style="style"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from '@vue/composition-api'

// component

// use

// common
// import merge from 'lodash/merge'
// import copy from 'fast-copy'
import lottie from 'lottie-web'

// api

export default defineComponent({
  name: 'InsLottie',
  components: {},
  props: {
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    /**
     * 渲染方式
     */
    renderer: { type: String, default: 'svg' },
    /**
     * 循环播放 true
     */
    loop: { type: Boolean, default: true },
    /**
     * 自动播放 true
     */
    autoplay: { type: Boolean, default: true },
    /**
     * json url
     * json 路径，页面会通过一个 http 请求获取 json
     * https://lottiefiles.com/featured 示例网站
     * svg火箭动画
     * https://assets2.lottiefiles.com/packages/lf20_pqdnvhfb.json
     */
    path: {
      type: String,
      default: () => '',
    },
    /**
     * 动画数据 优先级> path
     *  json 动画数据，与 path 互斥，建议使用 path，因为 animationData 会将数据打包进来，会使得 js bundle 过大
     */
    animationData: { type: Object, default: () => null },
    /**
     * 渲染设置
     */
    rendererSettings: { type: Object, default: () => {} },
  },
  setup(props, ctx) {
    const state = reactive({
      msg: 'hello',
      style: {
        width: props.width ? `${props.width}px` : '100%',
        height: props.height ? `${props.height}px` : '100%',
        overflow: 'hidden',
        margin: '0 auto',
      },
      lottieInstance: null,
    })

    const play = () => {
      state.lottieInstance.play()
    }

    const stop = () => {
      state.lottieInstance.stop()
    }

    const pause = () => {
      state.lottieInstance.pause()
    }

    /**
     * 设置播放速度，1 表示1倍速度，0.5 表示 0.5倍速度
     */
    const setSpeed = (speed = 1) => {
      state.lottieInstance.setSpeed(speed)
    }

    /**
     * 正反向播放，1 表示 正向，-1 表示反向
     */
    const setDirection = (direction = 1) => {
      state.lottieInstance.setDirection(direction)
    }

    /**
     * 跳到某一帧或某一秒停止，第二个参数 iFrame 为是否基于帧模式还是时间，默认为 false
     */
    const goToAndStop = (arg, isFrame = false) => {
      state.lottieInstance.goToAndStop(arg, isFrame)
    }

    /**
     * 跳到某一帧或某一秒开始，第二个参数 iFrame 为是否基于帧模式还是时间，默认为 false
     */
    const goToAndPlay = (arg, isFrame = false) => {
      state.lottieInstance.goToAndPlay(arg, isFrame)
    }

    const destroy = () => {
      state.lottieInstance.destroy()
    }

    const render = () => {
      //
      state.lottieInstance = lottie.loadAnimation({
        container: ctx.refs.lottieContainerRef,
        renderer: props.renderer,
        loop: props.loop,
        autoplay: props.autoplay,
        path: props.path,
        animationData: props.animationData,
        rendererSettings: props.rendererSettings,
      })
      ctx.emit('created', state.lottieInstance)

      //

      /**
       * 完成事件 loop=false 时，一次
       */
      state.lottieInstance.onComplete = function (event) {
        // console.log(
        //   '🚀 ~ file: InsLottie.vue ~ line 101 ~ state.lottieInstance.onComplete ~ event',
        //   event
        // )
      }

      /**
       * 完成事件 loop=true 时，多次
       * {
       * currentLoop: 1
       * direction: 1
       * totalLoops: true
       * type: "loopComplete"
       * }
       */
      state.lottieInstance.onLoopComplete = function (event) {
        // console.log(
        //   '🚀 ~ file: InsLottie.vue ~ line 105 ~ state.lottieInstance.onLoopComplete ~ event',
        //   event
        // )
      }
    }

    const init = () => {
      render()
    }

    onMounted(() => {
      init()
    })

    onUnmounted(() => {
      destroy()
    })

    return {
      ...toRefs(state),
      play,
      stop,
      pause,
      setSpeed,
      setDirection,
      goToAndStop,
      goToAndPlay,
    }
  },
})
</script>

<style lang="scss" scoped>
.ins-lottie {
  visibility: initial;
}
</style>
