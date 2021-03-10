<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon ins-svg-icon"
    v-on="$listeners"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate'

import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'InsSvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    resetClass: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.className)
    },
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.resetClass) return ''

      if (this.className) {
        return 'ins-svg-icon ' + this.className
      } else {
        return 'ins-svg-icon'
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`,
      }
    },
  },
})
</script>

<style scoped>
.ins-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
