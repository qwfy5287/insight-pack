<!--
名称：数值-单位
版本：1.0.0
作者：林加炳
时间：2020年03月23日17:49:59

-->
<template>
  <div class="ins-input-unit">
    <!-- ins-input-unit 数值 单位 -->
    <el-form-item :rules="setRangeRules(rules)" :prop="`${$attrs.prop}.value[0]`">
      <el-input-number
        ref="elInputNumberStart"
        :value="modelValue[0]"
        :min="(attr && attr.min) || start.min"
        :max="getStartMax"
        v-bind="attr"
        controls-position="right"
        @change="startChange"
        @input.native="startInput"
      />
      <el-select v-model="modelValue[1]" :placeholder="'单位'" @change="unitChange">
        <el-option
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  name: 'InsInputUnit',
  components: {},
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    modelValue: { type: Array, required: true },
    options: {
      type: Array,
      default: function() {
        return [
          // { label: 'MB', value: '01' },
          // { label: 'GB', value: '02' }
        ]
      },
    },
    rules: {
      type: Array,
      default: function() {
        return []
      },
    },
    attr: {
      type: Object,
      default: function() {
        return {}
      },
    },
  },
  data() {
    return {
      start: {
        min: 0,
        max: 1000000000000,
      },
    }
  },
  computed: {
    getStartMax() {
      return (this.attr && this.attr.max) || this.start.max
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
    //
    getPartValue(val) {
      let result
      if (val !== undefined && val !== null) {
        result = val
      } else {
        result = undefined
      }
      return result
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
    unitChange(arg) {
      this.$emit('change', [this.getPartValue(this.modelValue[0]), arg])
    },
    startInput: debounce(function(e) {
      const val = this.getInputStringValue(e.target.value)
      if (val) {
        this.$refs.elInputNumberStart?.setCurrentValue(val)
      }
    }, 500),
    startChange(val) {
      let unitValue = null
      if (val) {
        if (this.modelValue[1] || this.modelValue[1] === 0) {
          unitValue = this.modelValue[1]
        } else {
          unitValue = this.options?.[0]?.value ?? null
        }
      }
      this.$emit('change', [val, unitValue])
    },
    /**
     * 设置默认 message
     */
    setRangeRules(rules) {
      let result = null
      if (rules) {
        result = rules.map(d => {
          if (!d.message) {
            d.message = '请输入' // + label
          }
          return d
        })
      }
      return result
    },
  },
}
</script>
<style lang="scss" scoped>
.ins-input-unit {
  visibility: initial;
  padding-right: 90px;
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }

  .el-input-number {
    width: 100%;
  }
  .el-select {
    position: absolute;
    width: 80px;
    margin-left: 10px;
  }
}
</style>
