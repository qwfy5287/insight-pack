<!--
InsTemplate 模板 composition api
默认是页面
  app-container
-->
<template>
  <div class="ins-form">
    <!-- ins-form -->

    <!-- :label-width="showLabel ? '100px' : '0px'" -->
    <el-form
      ref="ruleFormRef"
      class="el-form-dynamic clearfix"
      :model="dynamicForm"
      :label-width="($attrs && $attrs['label-width']) || '100px'"
      v-bind="$attrs"
    >
      <template v-for="(item, index) in dynamicForm">
        <!-- 1. 自定义表单项 插槽 slot -->
        <slot
          v-if="item.isSlot === true"
          :name="item.name"
          :item="item"
          :index="index"
          :label="getLabel(showLabel, item)"
          :prop="`${index}.value`"
          :rules="getRulesWithMessage(item)"
        />

        <!-- 2. 自定义表单项 动态组件 component -->
        <!-- 传入 prop，用于表单验证 -->
        <!-- 接收组件的 change 事件 -->
        <component
          :is="item.component"
          v-else-if="item.component"
          :key="`form_item_${index}`"
          :index="index"
          :item="item"
          :label="getLabel(showLabel, item)"
          :prop="`${index}.value`"
          :rules="getRulesWithMessage(item)"
          @change="change(item)"
        />

        <!-- :item="item" -->

        <!-- 表单项: 区间数值 range  -->
        <el-form-item
          v-else-if="item.element === elements.range"
          :key="`form_item_${index}`"
          :label="getLabel(showLabel, item)"
          :class="getFormItemClass(item)"
        >
          <ins-range
            v-model="item.value"
            :prop="`${index}`"
            :rules="item.multiRules"
            :attr="item.multiAttr"
            @change="change(item)"
          />
        </el-form-item>

        <!-- 表单项：数值 带 单位 inputUnit -->
        <el-form-item
          v-else-if="item.element === elements.inputUnit"
          :key="`form_item_${index}`"
          :label="getLabel(showLabel, item)"
          :class="getFormItemClass(item)"
        >
          <ins-input-unit
            v-model="item.value"
            :options="item.options"
            :prop="`${index}`"
            :rules="item.rules"
            :attr="item.attr"
            @change="change(item)"
          />
        </el-form-item>

        <!-- 3. default -->
        <el-form-item
          v-else-if="item.isRender !== false"
          v-show="item.show !== false"
          :key="`form_item_${index}`"
          :label="getLabel(showLabel, item)"
          :prop="`${index}.value`"
          :rules="getRulesWithMessage(item)"
          :class="getFormItemClass(item)"
          :style="getFormItemStyle(item)"
        >
          <!-- isView 查看 -->
          <span v-if="(isView && item.isView !== false) || item.isView" class="input-text">
            {{ getTextForIsView(item) }}
          </span>

          <!-- 文本框 input -->
          <el-input
            v-else-if="item.element === elements.input"
            v-model.trim="item.value"
            v-bind="item.attr"
            :maxlength="(item.attr && item.attr.maxlength) || 64"
            :placeholder="getPlaceholder(item)"
            :clearable="getClearable(item)"
            @input="inputChange(item)"
          />

          <!-- 密码框 password -->
          <el-input
            v-else-if="item.element === elements.password"
            v-model.trim="item.value"
            v-bind="item.attr"
            :maxlength="(item.attr && item.attr.maxlength) || 16"
            :placeholder="getPlaceholder(item)"
            :clearable="getClearable(item)"
            show-password
            @input="inputChange(item)"
          />

          <!-- 文本域 textarea -->
          <el-input
            v-else-if="item.element == elements.textarea"
            v-model="item.value"
            v-bind="item.attr"
            :class="{ 'show-word-limit': Boolean(item.attr && item.attr.maxlength) }"
            :maxlength="(item.attr && item.attr.maxlength) || 128"
            :autosize="{ minRows: 3, maxRows: 5 }"
            :placeholder="getPlaceholder(item)"
            :clearable="getClearable(item)"
            type="textarea"
            @input="inputChange(item)"
          />

          <!-- 数字框 inputNumber -->
          <el-input-number
            v-else-if="item.element === elements.inputNumber"
            v-model="item.value"
            v-bind="item.attr"
            controls-position="right"
            clearable
            class="w-full"
            @change="change(item)"
          />

          <!-- 单选 select -->
          <el-select
            v-else-if="item.element == elements.select"
            v-model="item.value"
            v-bind="item.attr"
            :placeholder="getPlaceholder(item.label)"
            clearable
            filterable
            class=" w-full"
            @change="change(item)"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>

          <!-- 日期 date -->
          <!-- 
            带时间
            attr:{type:'datetime'}
           -->
          <el-date-picker
            v-else-if="item.element === elements.date"
            v-model="item.value"
            v-bind="item.attr"
            class=" w-full"
            @change="change(item)"
          />

          <!-- 级联选择 cascader -->
          <el-cascader
            v-else-if="item.element == elements.cascader"
            v-model="item.value"
            :placeholder="getPlaceholder(item.label)"
            clearable
            filterable
            v-bind="item.attr"
            class=" w-full"
            :options="item.options"
            @change="change(item)"
          >
          </el-cascader>

          <div v-else>
            没有对应的控件类型：
            {{ item }}
          </div>
        </el-form-item>
      </template>

      <!-- 4. 表单按钮 -->
      <el-form-item v-if="isSubmit" class="search-btn clear-both">
        <el-button type="primary" @click="submitForm"> {{ submitText }} </el-button>
        <el-button @click="resetForm"> {{ resetText }} </el-button>
      </el-form-item>
    </el-form>

    <!-- <div>
      {{ dynamicForm }}
    </div> -->
  </div>
</template>
<script>
import { defineComponent, onMounted, toRefs, reactive, ref } from '@vue/composition-api'
// component
import InsRange from './ins-form-element/InsRange.vue'
import InsInputUnit from './ins-form-element/InsInputUnit.vue'

import InsSlotFormItem from './InsSlotFormItem.vue'

// common
import { Elements, getFormData, FormItem } from '../../common/form.common'
import debounce from 'lodash/debounce'
// api
// const
export const useCommon = (props, ctx) => {
  //
  if (!props) {
    throw new Error('缺少参数 props')
  }
  if (!ctx) {
    throw new Error('缺少参数 ctx')
  }

  /**
   * 获取 表单项 class
   *  单列，多列
   *  子项是自定义组件时，是否显示必填 *
   */
  const getFormItemClass = item => {
    let result = {}
    result = {
      'is-required': getRangeRequired(item.multiRules) || getInputUnitRequired(item.rules),
      'col-2': item.col === 2,
      'col-3': item.col === 3,
      'col-3-2': item.col === '2/3',
      'not-float': item.float === false,
    }
    return result
  }

  /**
   * 获取 formItem 样式
   *  width 宽度
   */
  const getFormItemStyle = ({ width }) => {
    return width ? { width: width } : {}
  }

  /**
   * InsRange 是否必填项
   *   2个值都是必填：返回 true
   */
  const getRangeRequired = multiRules => {
    let result = false
    multiRules?.forEach(d => {
      d?.forEach(sd => {
        if (sd.required === true) {
          result = true
        }
      })
    })
    return result
  }

  /**
   * InsInputUnit 是否必填项
   *   值是必填：返回 true
   */
  const getInputUnitRequired = rules => {
    let result = false
    rules?.forEach(sd => {
      if (sd.required === true) {
        result = true
      }
    })
    return result
  }

  /**
   * 获取文本，当 isView:true
   */
  const getTextForIsView = (item = FormItem) => {
    let result = item?.value
    if (item.element === Elements.input) {
      result = item.value
    }
    return result
  }
  /**
   * 获取 placeholder
   */
  const getPlaceholder = (item = FormItem) => {
    let result = null
    if (props.showPlaceholder) {
      result = item?.attr?.placeholder || item.label
    }
    return result
  }
  const getClearable = (item = FormItem) => {
    return item.attr && item.attr.clearable !== false && true
  }
  const getLabel = (showLabel, item) => {
    return showLabel ? item.label : null
  }
  /**
   * 表单项值改变
   */
  const change = item => {
    ctx.emit('change', item)
  }
  /**
   * 文本框 输入 值改变
   */
  const inputChange = debounce(function(item) {
    change(item)
  }, 500)
  /**
   * 获取 rules
   *   整合 错误提示 message
   */
  const getRulesWithMessage = ({ element, rules } = FormItem) => {
    let result = null
    result = rules?.map(d => {
      if (!d.message && !d.validator) {
        if (['input', 'textarea'].includes(element) || !element) {
          d.message = '请输入' //+ label
        } else {
          d.message = '请选择' //+ label
        }
      }
      return d
    })
    return result
  }
  return {
    getTextForIsView,
    getPlaceholder,
    change,
    inputChange,
    getRulesWithMessage,
    getClearable,
    getLabel,
    getRangeRequired,
    getFormItemClass,
    getFormItemStyle,
  }
}
export default defineComponent({
  name: 'InsForm',
  components: { InsRange, InsSlotFormItem, InsInputUnit },
  props: {
    /**
     * 动态表单配置
     *  title:{}
     *  content:{}
     */
    dynamicForm: { type: Object | null, required: true },
    /**
     * 显示提交按钮 （true）
     */
    isSubmit: { type: Boolean, default: true },
    isView: { type: Boolean, default: false },
    showPlaceholder: { type: Boolean, default: true },
    showLabel: { type: Boolean, default: true },
    submitText: { type: String, default: '保存' },
    resetText: { type: String, default: '重置' },
  },
  data() {
    return {}
  },
  setup(props, ctx) {
    let state = reactive({
      msg: 'hello',
      elements: Elements,
      ruleFormRef: ref(null),

      // dynamicForm: {
      //   id: {
      //     label: '编号',
      //     name: 'id',
      //     element: Elements.input,
      //     value: '01',
      //     rules: [{ required: true }],
      //     attr: { disabled: false },
      //     isView: true,
      //   },
      //   title: {
      //     label: '标题',
      //     name: 'title',
      //     element: Elements.input,
      //     value: 'abc',
      //     rules: [{ required: true }],
      //     attr: { disabled: false },
      //   },
      //   content: {
      //     label: '内容',
      //     name: 'content',
      //     element: Elements.textarea,
      //     value: null,
      //     rules: [{ required: false }],
      //     attr: { disabled: false, placeholder: '内容不超过128个字。' },
      //   },
      // },
    })
    let {
      getTextForIsView,
      getPlaceholder,
      change,
      inputChange,
      getRulesWithMessage,
      getClearable,
      getRangeRequired,
      getFormItemClass,
      getFormItemStyle,
      getLabel,
    } = useCommon(props, ctx)
    //#region common
    /**
     * 转换表单 到 保存数据
     * OnlyReturnShow:是否只返回show不为false的项
     */
    const toSaveData = (OnlyReturnShow = false) => {
      let result = {}
      state.ruleFormRef?.validate(valid => {
        if (valid) {
          result = getFormData(props.dynamicForm)
        }
      })
      return Object.keys(result).length > 0 && result
    }
    /**
     * 提交表单
     */
    const submitForm = () => {
      const result = toSaveData()
      if (result) {
        ctx.emit('save', result)
        console.log('submitForm', result)
        // console.log('InsForm result: ', result)
      }
    }
    /**
     * 重置表单
     */
    const resetForm = () => {
      state.ruleFormRef?.resetFields()
      ctx.emit('reset', {})
    }
    //#endregion
    /**
     * 渲染页面
     */
    const render = () => {}
    /**
     * 获取数据
     */
    const fetchData = async () => {
      // stateEdit.loading.value = true
      // let res = null
      // if (ctx.root.$route.query.pkid) {
      //   res = await roleDetail({ pkid: ctx.root.$route.query.pkid })
      // }
      // state.item = res?.data
      // stateEdit.loading.value = false
    }
    /**
     * 初始化
     */
    const init = async () => {
      render()
      await fetchData()
    }
    onMounted(() => {
      init()
    })
    return {
      ...toRefs(state),
      submitForm,
      resetForm,
      getTextForIsView,
      getPlaceholder,
      change,
      inputChange,
      getRulesWithMessage,
      getClearable,
      getRangeRequired,
      getFormItemClass,
      getFormItemStyle,
      getLabel,
      toSaveData,
    }
  },
})
</script>
<style lang="scss" scoped>
.ins-form {
  visibility: initial;

  // 表单项 两列
  .col-2 {
    width: 50%;
    float: left;
    // clear: none !important;
  }
  // 表单项 三列
  .col-3 {
    width: 33%;
    float: left;
    // clear: none !important;
  }
  .col-3-2 {
    width: 66%;
    float: left;
    // clear: none !important;
  }
}
::v-deep .el-form {
  > .el-form-item {
    clear: both;
    &.col-2 {
      clear: none;
    }
    &.col-3 {
      clear: none;
    }
    &.not-float {
      float: none;
    }
  }
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>
