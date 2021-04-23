import { onBeforeMount, reactive, toRefs, computed } from '@vue/composition-api'

// import merge from 'lodash/merge'
import copy from 'fast-copy'
import { handleCatch } from 'insight-pack/src/common/common'
import { setFormData, setFormOptions } from 'insight-pack/src/common/form.common'
import { getOptions } from '@/common/code.common'

/**
 * use 编辑
 */
/**
 *
 * @param {Function} callbackFetchData 获取数据接口
 * @param {Object} props props
 * @param {Object} ctx ctx
 * @param {Boolean} autoFetchData 自动获取数据
 */
export function useEdit(callbackFetchData, props, ctx, autoFetchData = true) {
  const state = reactive({
    /**
     * 动态表单配置
     */
    dynamicForm: {},
    /**
     * 加载中
     */
    loading: false,
    titlePre: '',
    isAddPage: computed(() => ctx.root.$route.path.includes('/add')),
    isEditPage: computed(() => ctx.root.$route.path.includes('/edit')),
  })

  //  初始化的参数 用于 重置
  const initState = {
    dynamicFormClone: null,
  }

  /**
   * 加载动画 短
   */
  const loadingShort = () => {
    state.loading = true
    setTimeout(() => {
      state.loading = false
    }, 0.2 * 1000)
  }

  /**
   * 获取 页面标题
   * @param {string} lastTitle 模块名称
   */
  const getTitle = (lastTitle) => {
    let result = null
    // 编辑或添加
    state.titlePre = ctx.root.$route.query.pkid ? '编辑' : '添加'
    result = `${state.titlePre}${lastTitle}`

    if (props.isView) {
      result = `${lastTitle}详情`
    }

    return result
  }

  /**
   * 添加 或 编辑 公用 会重置表单
   * @param {Object} item 数据项
   */
  const editCommon = (item) => {
    // 重置表单数据
    state.dynamicForm = copy(initState.dynamicFormClone)
    // 设置表单的 options, 通过 code
    setFormOptions(state.dynamicForm, getOptions)
    // 绑定数据到表单配置
    setFormData(state.dynamicForm, item)
  }

  /**
   * ins 保存
   * @param {Function} callbackCreate 添加接口
   * @param {Function} callbackUpdate 更新接口
   * @param {Function} listUrl 列表页地址
   */
  const insSave = async (callbackCreate, callbackUpdate, listUrl, saveData) => {
    const formData = saveData ?? ctx.refs.insFormRef.toSaveData()
    if (!formData) return false
    console.log('🚀 ~ file: InfoEdit.vue ~ line 64 ~ save ~ formData', formData)
    const res = formData.pkid ? await callbackUpdate(formData) : await callbackCreate(formData)
    ctx.root.$message.success(res.message)
    // 跳转到列表页, 没有地址的时候不跳转
    listUrl && toMain(listUrl, 'save')

    // 添加时
    if (!formData.pkid) {
      return res
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

  /**
   * 获取数据 详情
   *  绑定数据到表单
   */
  const fetchData = async () => {
    state.loading = true
    const res = await callbackFetchData?.().catch(handleCatch)
    state.loading = false
    // if (!res) return false

    editCommon(res)
  }

  //#region cancel
  /**
   * 取消
   */
  const cancel = (url) => {
    // 跳转到列表页
    ctx.root.$router.push({ path: url, params: { action: 'cancel' } })
  }

  /**
   * 跳转到列表页
   */
  const toMain = (url, type = 'cancel') => {
    // 跳转到列表页
    ctx.root.$router.push({ path: url, params: { action: type } })
  }
  //#endregion

  onBeforeMount(() => {
    // 修改或添加
    if (ctx.root.$route.query.pkid) {
      state.titlePre = '编辑'
    } else {
      state.titlePre = '添加'
    }
    autoFetchData && fetchData()
  })

  return {
    ...toRefs(state),
    editCommon,
    setDynamicForm,
    getTitle,
    cancel,
    toMain,
    insSave,
    fetchData,
    loadingShort,
  }
}
