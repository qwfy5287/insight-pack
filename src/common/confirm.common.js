import { MessageBox, Message } from "element-ui";

/**
 * 确认框 删除
 * @param {string} rowName 当前行的名称
 */
export async function confirmRemove(rowName, attr = {}) {
  let result = null;
  Object.assign(attr, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  });
  result = await MessageBox.confirm(
    `此操作将永久删除 ( ${rowName || "当前记录"} ), 是否继续?`,
    "提示",
    attr
  ).catch(() => {
    console.log("取消删除");
  });

  return result;
}

/**
 * 确认框 批量删除
 * @param {Object} multipleSelection 勾选的行
 */
export async function confirmRemoveBatch(
  multipleSelection,
  message = `此操作将永久删除 ${multipleSelection.length} 条记录, 是否继续?`
) {
  let result = null;

  if (multipleSelection?.length) {
    // const ids = this.multipleSelection.map(d => d.id).join(',')

    result = await MessageBox.confirm(message, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).catch(() => {
      console.log("取消批量删除");
    });
  } else {
    Message.error("请勾选要删除的项。");
  }

  return result;
}

/**
 * 确认框 提示
 * @param {string} message 信息
 */
export async function confirm(message, attr = {}) {
  let result = null;
  Object.assign(attr, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  });
  result = await MessageBox.confirm(`${message}`, "提示", attr).catch(() => {
    console.log("取消");
  });

  return result;
}
