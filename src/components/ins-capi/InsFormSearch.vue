<!--
名称：表单-搜索
版本：1.0.0
作者：林加炳
时间：2021
-->
<template>
  <div class="ins-form-search">
    <!-- ins-form-search -->

    <!-- :label-width="showLabel ? '100px' : '0px'" -->
    <el-form
      ref="ruleFormRef"
      class="el-form-dynamic"
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
          :label="showLabel && item.label"
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
          :label="showLabel && item.label"
          :prop="`${index}.value`"
          :rules="getRulesWithMessage(item)"
          @change="change(item)"
        />

        <!-- 3. default -->
        <el-form-item
          v-else-if="item.isRender !== false"
          :key="`form_item_${index}`"
          :label="showLabel && item.label"
          :prop="`${index}.value`"
          :rules="getRulesWithMessage(item)"
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

          <el-checkbox-group
            v-else-if="item.element == elements.checkbox"
            v-model="item.value"
            class="el-checkbox-group-ins"
            @change="change(item)"
          >
            <!-- 普通checkbox -->
            <template v-if="!item.isButton">
              <el-checkbox
                v-for="(checkItem, checkIndex) in item.options"
                :key="checkIndex"
                :disabled="(item.attr && item.attr.disabled) || item.disabled"
                :label="checkItem.value"
                :title="checkItem.label"
                >{{ checkItem.label }}</el-checkbox
              >
            </template>
            <!-- 按钮样式的checkbox -->
            <template v-else>
              <el-checkbox-button
                v-for="(checkItem, checkIndex) in item.options"
                :key="checkIndex"
                :disabled="(item.attr && item.attr.disabled) || item.disabled"
                :label="checkItem.value"
                :title="checkItem.label"
                >{{ checkItem.label }}</el-checkbox-button
              >
            </template>
          </el-checkbox-group>

          <div v-else>
            没有对应的控件类型：
            {{ item }}
          </div>
        </el-form-item>
      </template>

      <!-- 4. 表单按钮 -->
      <el-form-item v-if="isSubmit" class="search-btn">
        <el-button type="primary" @click="submitForm"> {{ submitText }} </el-button>
        <el-button @click="resetForm"> 重置 </el-button>
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
  const getLabel = arg => {
    return arg
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
  }
}
export default defineComponent({
  name: 'InsForm',
  components: {},
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
      toSaveData,
    }
  },
})
</script>
<style lang="scss" scoped>
.ins-form-search {
  visibility: initial;
}

::v-deep .el-checkbox-group-ins {
  margin-bottom: -8px;
  .el-checkbox-button--small {
    .el-checkbox-button__inner {
      border-radius: 4px;
      margin-right: 8px;
      border: 1px solid #dcdfe6;
      margin-bottom: 8px;
      box-shadow: none;
    }
    &.is-checked {
      .el-checkbox-button__inner {
        background-color: rgba(51, 144, 255, 0.2);
        border: 1px solid #3390ff;
        color: #3390ff;
      }
    }
    // #3390FF
  }
}
</style>
