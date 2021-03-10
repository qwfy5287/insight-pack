/**
 * 处理异常，输出信息，不中断代码
 * @param {*} err 异常信息
 */
export const handleCatch = err => {
  console.log('🚀 ~ file: common.js ~ line 6 ~ handleCatch ~ err', err)
}

/**
 * session 存储
 * @param {*} key
 * @param {*} val
 */
export const setSessionStorage = (key, val) => {
  window.sessionStorage.setItem(key, JSON.stringify(val))
}

/**
 * session 获取
 * @param {*} key
 */
export const getSessionStorage = key => {
  let res = window.sessionStorage.getItem(key)
  return JSON.parse(res)
}
