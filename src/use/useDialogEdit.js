import { reactive, toRefs } from '@vue/composition-api'

import merge from 'lodash/merge'
import copy from 'fast-copy'

// import { setFormOptionsByCode } from '@/utils/common'
import { setFormData, setFormOptions } from 'insight-pack/src/common/form.common'
import { getOptions } from '@/common/code.common'

/**
 * use 弹窗编辑
 * @param {Function} callbackFetchData 取数据接口
 * @param {Object} props props
 * @param {Object} ctx ctx
 */
export function useDialogEdit(callbackFetchData, props, ctx, autoFetchData = true) {
  let state = reactive({
    /**
     * 动态表单配置
     */
    dynamicForm: {},
    loading: false,
  })

  //  初始化的参数 用于 重置
  let initState = {
    dynamicFormClone: null,
  }

  //#region ins 标准方法
  /**
   * ins 添加 或 编辑
   * @param {Object} item 数据项
   */
  const insEdit = (item) => {
    // 重置表单数据
    state.dynamicForm = copy(initState.dynamicFormClone)
    // 设置表单的 options, 通过 code
    setFormOptions(state.dynamicForm, getOptions)
    // 绑定数据到表单配置
    setFormData(state.dynamicForm, item)
    // 调用对话框
    ctx.refs.insDialogEditRef.edit(item)
  }

  /**
   * ins 弹窗保存
   * @param {Boolean} autoClose 自动关闭窗口 true
   */
  const insSave = (autoClose = true) => {
    let formData = ctx.refs.insFormRef.toSaveData()
    if (!formData) return false
    ctx.emit('save', formData)
    // 关闭窗口
    autoClose && ctx.refs.insDialogEditRef.close()
  }

  //#endregion

  /**
   * 处理确定 公用
   * @param {Object} ctx setupContext
   * @param {Boolean} autoClose 自动关闭窗口 true
   */
  const insDialogEditSaveCommon = (ctx, autoClose = true) => {
    // 获取表单数据
    const formData = ctx.refs.insForm.toSaveData()
    if (formData) {
      // 如果表单数据校验成功
      const saveData = merge({}, formData)

      // // TODO: 临时
      // console.log('save', saveData)

      ctx.emit('save', saveData)
      // 关闭窗口
      autoClose && (ctx.refs.insDialogEdit.dialogVisible = false)
    } else {
      //
    }
  }

  /**
   * 设置 动态表单
   * @param {Object} dynamicForm 动态表单
   */
  const setDynamicForm = (dynamicForm) => {
    // 克隆 初始化表单 用于 重置
    initState.dynamicFormClone = copy(dynamicForm)

    state.dynamicForm = dynamicForm
  }

  return {
    ...toRefs(state),
    insDialogEditSaveCommon,
    setDynamicForm,
    insEdit,
    insSave,
  }
}
