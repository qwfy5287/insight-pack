import { isRef } from '@vue/composition-api'
import { getParentIdsById, treeToList } from './tree.common'
/**
 * InsForm elements
 */
export const Elements = {
  secbar: 'secbar',
  iconSecbar: 'iconSecbar',
  range: 'range',
  inputUnit: 'inputUnit',
  input: 'input',
  textarea: 'textarea',
  inputNumber: 'inputNumber',
  /**
   * 带时间
   *  attr:{type:'datetime'}
   */
  date: 'date',
  dateRange: 'dateRange',
  timeRange: 'timeRange',
  checkbox: 'checkbox',
  select: 'select',
  selectMulti: 'selectMulti',
  selectGroup: 'selectGroup',
  rowsForm: 'rowsForm',
  InsFormInline: 'InsFormInline',
  showText: 'showText',
  numberRangeLink: 'numberRangeLink',
  password: 'password',
  /**
   * 级联选择
   */
  cascader: 'cascader',
}

export const FormItem = {
  label: null,
  name: null,
  element: null,
  value: null,
  rules: [],
  attr: { disabled: false },
  /**
   * 是否查看
   */
  isView: false,
  /**
   * 是否渲染
   */
  isRender: true,
  // ignore: false,
}

/**
 * 获取表单数据
 * @param {*} dynamicForm
 */
export const getFormData = (dynamicForm) => {
  let result = {}
  const form = getDynamicForm(dynamicForm)
  if (!form) return false
  Object.keys(form).forEach((key) => {
    const item = form[key]
    if (item.element === Elements.cascader) {
      // [1,2,3] > 3
      result[key] = item.value[item.value.length - 1]
    } else if (item.element !== Elements.secbar) {
      // secbar 表单项 不生成属性值
      result[key] = item.value
    }
  })

  // for (let prop in dynamicForm) {
  //   let d = dynamicForm[prop];

  //   if (d.element === Elements.cascader) {
  //     // [1,2,3] > 3
  //     result[prop] = d.value[d.value.length - 1];
  //   } else if (d.element !== Elements.secbar) {
  //     // secbar 表单项 不生成属性值
  //     result[prop] = d.value;
  //   }
  // }

  return result
}

/**
 * 获取 toRefs 的 dynamicForm
 */
export const getDynamicForm = (dynamicForm) => {
  return isRef(dynamicForm) ? dynamicForm.value : dynamicForm
}

/**
 * 设置表单数据
 * @param {Object} dynamicForm 动态表单
 * @param {Object} dataItem 数据
 */
export const setFormData = (dynamicForm, dataItem) => {
  if (!dataItem) return false

  const form = getDynamicForm(dynamicForm)
  if (!form) return false
  Object.keys(form).forEach((key) => {
    const item = form[key]
    const curVal = dataItem[key]
    if (curVal !== undefined && curVal !== null) {
      if (item.element === Elements.cascader) {
        // 3 > [1,2,3]
        const parentIds = getParentIdsById(curVal, treeToList(item.options))
        item.value = [...parentIds, curVal]
      } else {
        item.value = curVal
      }
    }
  })
}

/**
 * 设置 表单的 options 根据配置的 code
 * @param {Object} dynamicForm dynamicForm
 * @param {Function} callbackGetOptions getOptions
 */
export const setFormOptions = (dynamicForm, callbackGetOptions) => {
  const form = getDynamicForm(dynamicForm)
  if (!form) return false
  Object.keys(form).forEach((key) => {
    const item = form[key]
    if (item.code) {
      item.options = callbackGetOptions(item.code) || []
    }
  })
}

// /**
//  * 获取 rules
//  *   整合 错误提示 message
//  */
// export const getRulesWithMessage = ({ element, rules } = FormItem) => {
//   let result = null

//   result = rules?.map((d) => {
//     if (!d.message && !d.validator) {
//       if (['input', 'textarea'].includes(element)) {
//         d.message = '请输入' //+ label
//       } else {
//         d.message = '请选择' //+ label
//       }
//     }

//     return d
//   })

//   return result
// }
