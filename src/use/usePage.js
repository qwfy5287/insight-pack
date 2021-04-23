import { reactive, toRefs, onBeforeMount } from '@vue/composition-api'
import merge from 'lodash/merge'
import { confirmRemove, confirmRemoveBatch } from 'insight-pack/src/common/confirm.common'
import { handleCatch } from 'insight-pack/src/common/common'
import { Message } from 'element-ui'
const messageSuccess = Message.success

const transformResForPortal = (res) => {
  res.list = res.data.datas
  res.total = res.data.totalCount
}

/**
 * use 分页
 * @param {function} callbackFetchData 获取数据的方法
 * @param {object} props props
 * @param {object} ctx ctx
 * @param {Boolean} ctx autoFetchData true
 */
export const usePage = (callbackFetchData, props, ctx, autoFetchData = true) => {
  const state = reactive({
    tableHead: [],
    tableData: [],
    /**
     * 分页参数
     */
    pagerParams: {
      page: 1,
      limit: 10,
      total: 0,
    },
    /**
     * 搜索栏 动态表单
     */
    dynamicForm: {
      // form: [],
    },
    /**
     * 搜索参数
     */
    searchParams: {},
    /**
     * 表格多选数据
     */
    multipleSelection: [],
    /**
     * 加载中
     */
    loading: false,
    /**
     * 是否编辑页
     */
    isEdit: false,
  })

  /**
   * 获取数据
   */
  const fetchData = async () => {
    if (!callbackFetchData) return false

    // try {
    state.loading = true
    const res = await callbackFetchData(
      merge(
        {},
        {
          pageIndex: state.pagerParams.page,
          pageSize: state.pagerParams.limit,
        },
        { paramsRO: state.searchParams }
      )
    ).catch(handleCatch)
    state.loading = false
    if (!res) return false

    //#region 先 转换到标准数据
    if (res?.data?.datas) {
      transformResForPortal(res)
    }

    if (res?.data?.titles) {
      res.list = res.data.list
    }
    //#endregion

    // state.tableData = []
    // state.tableData = res.list
    // state.pagerParams.total = res.total

    //#region open-platform
    state.tableData = []
    if (Object.keys(res.data).includes('recordsTotal')) {
      state.tableData = res.data.data
      state.pagerParams.total = res.data.recordsTotal
    } else {
      state.tableData = res.data
      state.pagerParams.total = res.data?.length
    }
    //#endregion
  }

  /**
   * 搜索
   */
  const search = (arg) => {
    state.searchParams = arg
    state.pagerParams.page = 1
    fetchData()
  }

  /**
   * 搜索 重置
   */
  const reset = (arg) => {
    state.searchParams = arg
    state.pagerParams.page = 1

    // setFormIgnore(state.dynamicForm)

    fetchData()
  }

  /**
   * 处理分页事件
   */
  const insPagerChange = () => {
    fetchData()
  }

  // 表格多选
  const handleSelectionChange = (rows) => {
    state.multipleSelection = rows
  }

  /**
   * 设置 表头
   * @param {*} arg
   */
  const setTableHead = (arg) => {
    state.tableHead = arg
  }

  /**
   * 设置 搜索栏 动态表单
   * @param {*} arg
   */
  const setDynamicForm = (arg) => {
    // 设置表单的 select 的 options, 通过 code
    // setFormOptions(arg)

    state.dynamicForm = arg
  }

  /**
   * Ins 删除 带弹窗确认
   * @param {Object} row 当前行
   * @param {Function} callback 删除接口
   */
  const insRemove = async (row, callback) => {
    // 兼容属性 name, *Name, id, pkid
    const name = row?.name || row[Object.keys(row).find((d) => d.includes('Name'))]
    const id = row?.id || row?.pkid

    const resConfirm = await confirmRemove(name)
    if (resConfirm) {
      const res = await callback({ id: id, pkid: id })
      messageSuccess(res.message)

      state.pagerParams.page = 1
      fetchData()
    }
  }

  /**
   * Ins 删除 popover
   * @param {Object} row 当前行
   * @param {Function} callback 删除接口
   */
  const insRemovePopover = async (row, callback) => {
    const id = row?.id || row?.pkid
    const res = await callback({ id: id, pkid: id })
    messageSuccess(res.message)

    state.pagerParams.page = 1
    fetchData()
  }

  /**
   * Ins 状态 popover
   * @param {Object} row 当前行
   * @param {Function} callback 删除接口
   * @param {String} statusKey 状态属性名称
   */
  const insStatusPopover = async (row, callback, statusKey = 'status') => {
    const id = row?.id || row?.pkid
    const status = row?.[statusKey]
    let nextStatus = status === 0 ? 1 : 0
    const res = await callback({ id: id, pkid: id, [statusKey]: nextStatus })
    messageSuccess(res.message)

    // state.pagerParams.page = 1
    fetchData()
  }

  /**
   * 批量删除公用
   * @param {function} callback 批量删除接口
   */
  const removeBatchCommon = async (callback) => {
    let resConfirm = await confirmRemoveBatch(state.multipleSelection)
    if (resConfirm) {
      // 调用批量删除接口
      const ids = state.multipleSelection.map((d) => d.id).join(',')
      const res = await callback({ ids: ids })
      messageSuccess(res.message)

      state.pagerParams.page = 1
      fetchData()
    }
  }

  //#region ins 标准方法
  /**
   * ins 添加
   * @param {string} url url
   */
  const insAdd = (url) => {
    ctx.root.$router.push({ path: url })
  }
  //#endregion

  //#region == detail, add, edit ==
  /**
   * 详情
   * @param {string} url url
   * @param {string} id id
   */
  const detail = (url, id) => {
    ctx.root.$router.push({ path: url, query: { id: id } })
  }

  /**
   * 添加
   * @param {string} url url
   */
  const add = (url) => {
    ctx.root.$router.push({ path: url })
  }

  /**
   * 编辑
   * @param {string} url url
   * @param {object} row row
   * @param {string} module 模块代码 从列表传递数据，不调详情接口
   * @param {*} query 参数 可选
   */
  const edit = (url, row, module, query) => {
    if (module) {
      sessionStorage.setItem(module + row.pkid, JSON.stringify(row))
    }
    ctx.root.$router.push({ path: url, query: query ?? { pkid: row.pkid } })
  }

  // /**
  //  * 编辑
  //  * @param {string} url url
  //  * @param {object} row row
  //  */
  // const editLocal = (url, row) => {
  //   sessionStorage.setItem(row.pkid, JSON.stringify(row))
  //   ctx.root.$router.push({ path: url, query: { pkid: row.pkid } })
  // }

  //  /**
  //  * 编辑
  //  * @param {string} url url
  //  * @param {string} id id
  //  */
  // const edit = (url, id) => {
  //   ctx.root.$router.push({ path: url, query: { id: id } })
  // }
  //#endregion

  // 生命周期
  onBeforeMount(() => {
    autoFetchData && fetchData()
  })

  return {
    ...toRefs(state),
    fetchData,
    search,
    reset,
    insPagerChange,
    setTableHead,
    setDynamicForm,
    handleSelectionChange,
    removeBatchCommon,
    detail,
    add,
    edit,
    insRemove,
    insRemovePopover,
    insStatusPopover,
    insAdd,
  }
}
