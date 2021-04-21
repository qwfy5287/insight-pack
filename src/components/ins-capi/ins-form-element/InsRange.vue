<!--
名称：数值-区间
版本：1.0.0
作者：林加炳
时间：2020年03月12日10:24:52

备注
  调用时要有 el-from
-->

<template>
  <div class="ins-range">
    <!-- ins-range -->

    <el-form-item
      class="num-range"
      :rules="setRangeRules(rules[0])"
      :prop="`${$attrs.prop}.value[0]`"
    >
      <el-input-number
        ref="elInputNumberStart"
        :value="modelValue[0]"
        :min="(attr[0] && attr[0].min) || start.min"
        :max="getStartMax"
        v-bind="attr[0]"
        controls-position="right"
        @change="startChange"
        @input.native="startInput"
      />
    </el-form-item>
    <span :span="2" class="num-range-split"> 至 </span>
    <el-form-item
      class="num-range"
      :rules="setRangeRules(rules[1])"
      :prop="`${$attrs.prop}.value[1]`"
    >
      <el-input-number
        ref="elInputNumberEnd"
        :value="modelValue[1]"
        :min="getEndMin || end.min"
        :max="(attr[1] && attr[1].max) || end.max"
        v-bind="attr[1]"
        controls-position="right"
        @change="endChange"
        @input.native="endInput"
      />
    </el-form-item>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'

export default {
  name: 'InsRange',
  components: {},
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    modelValue: { type: Array, required: true },
    rules: {
      type: Array,
      default: function () {
        return []
      },
    },
    attr: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      start: {
        min: 0,
        max: 1000000000000,
      },
      end: {
        min: 0,
        max: 1000000000000,
      },
      // elInputNumberStart: ref < ElInputNumberType > null,
      // elInputNumberEnd: ref < ElInputNumberType > null
    }
  },
  computed: {
    getStartMax() {
      return (
        this.getPartValue(this.modelValue[1]) ||
        (this.attr[1] && this.attr[1].max) ||
        this.start.max
      )
    },
    getEndMin() {
      return (
        this.getPartValue(this.modelValue[0]) || (this.attr[0] && this.attr[0].min) || this.end.min
      )
    },
  },
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
    getPartValue(val) {
      let result
      if (val !== undefined && val !== null) {
        result = val
      } else {
        result = undefined
      }
      return result
    },
    startChange(val) {
      this.$emit('change', [val, this.getPartValue(this.modelValue[1])])
    },
    endChange(val) {
      this.$emit('change', [this.getPartValue(this.modelValue[0]), val])
    },
    /**
     * 设置默认 message
     */
    setRangeRules(rules) {
      let result = null
      if (rules) {
        result = rules.map((d) => {
          if (!d.message) {
            d.message = '请输入' // + label
          }
          return d
        })
      }
      return result
    },
    // 事件方法
    modelValueChange(val) {
      this.$emit('change', val)
    },
    /**
     * 手动输入时
     */
    getInputStringValue(val) {
      let result
      const valNum = Number(val)
      if (val !== '' && !Number.isNaN(valNum)) {
        result = valNum
      } else {
        result = undefined
      }
      return result
    },
    startInput: debounce(function (e) {
      const val = this.getInputStringValue(e.target.value)
      if (val) {
        this.$refs.elInputNumberStart?.setCurrentValue(val)
      }
    }, 500),
    endInput: debounce(function (e) {
      const val = this.getInputStringValue(e.target.value)
      if (val) {
        this.$refs.elInputNumberEnd?.setCurrentValue(val)
      }
    }, 500),
  },
}
</script>
<style lang="scss" scoped>
.ins-range {
  visibility: initial;

  .num-range {
    width: 45%;
    display: inline-block;
    margin-bottom: 0;
    & > div > .el-input-number {
      width: 100%;
    }
  }
  .num-range-split {
    width: 10%;
    display: inline-block;
    text-align: center;
  }
}
</style>
