import { reactive, toRefs, set, isRef } from '@vue/composition-api'
import { Message } from 'element-ui'
const messageSuccess = Message.success

export const useTableLocal = (props, ctx) => {
  const state = reactive({
    msg: 'hello',
  })

  /**
   * 获取 toRefs 的 tableData
   */
  const getTableData = (tableData) => {
    return isRef(tableData) ? tableData.value : tableData
  }

  const localCreate = async (data, tableData) => {
    const tableDataValue = getTableData(tableData)
    if (data) {
      data.pkid = 'pkid_' + tableDataValue.length
      tableDataValue.push(data)
    }
  }

  const localUpdate = async (data, tableData) => {
    const tableDataValue = getTableData(tableData)
    let index = tableDataValue.findIndex((d) => d.pkid === data.pkid)
    set(tableDataValue, index, data)
  }

  const localDelete = async (data, tableData) => {
    const tableDataValue = getTableData(tableData)
    let index = tableDataValue.findIndex((d) => d.pkid === data.pkid)
    if (index !== undefined && index !== null) {
      tableDataValue.splice(index, 1)
    }
  }

  /**
   * ins 保存
   * @param {Array} tableData 表格数据
   * @param {Boolean} autoClose 自动关闭窗口
   * @param {Object} saveData 手动传入表单数据
   * @returns
   */
  const insSaveLocal = async (tableData, autoClose = true, saveData) => {
    const formData = saveData ?? ctx.refs.insFormRef.toSaveData()
    if (!formData) return false
    let res = formData.pkid
      ? await localUpdate(formData, tableData)
      : await localCreate(formData, tableData)
    res && ctx.root.$message.success(res.message)
    // 跳转到列表页, 没有地址的时候不跳转
    // listUrl && toMain(listUrl, 'save')
    // ctx.emit('save', formData)
    ctx.emit('save', res)
    // 关闭窗口
    autoClose && ctx.refs.insDialogTopEditRef.close()

    // 添加时
    if (!formData.pkid) {
      return res
    }
  }

  /**
   * Ins 删除 popover
   * @param {Object} row 当前行
   * @param {Function} callback 删除接口
   */
  const insRemovePopoverLocal = async (row, tableData) => {
    const id = row?.id || row?.pkid
    const res = await localDelete({ id: id, pkid: id }, tableData)
    res && messageSuccess(res.message)

    // state.pagerParams.page = 1
    // fetchData()
  }

  return {
    ...toRefs(state),
    insSaveLocal,
    insRemovePopoverLocal,
  }
}
