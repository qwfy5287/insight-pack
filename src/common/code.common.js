import store from '@/store'

/**
 * 获取 字典选项,通过字典编码
 * @param {Object} codes 字典数据
 * @param {String} code 字典编码
 * @return {[]} array
 */
export function getOptionsByCodes(codes, code) {
  let result = []
  if (codes == null) {
    throw new Error('codes 不能为空')
  } else if (!code) {
    throw new Error('code 不能为空')
  } else {
    let existItem = codes.filter(d => d.dictionaryType === code)
    if (existItem?.length) {
      result = existItem
        .map(d => ({
          label: d.dictionaryValue,
          value: d.dictionaryCode,
          sort: d.dicSort || 0,
        }))
        .sort((a, b) => {
          return a.sort - b.sort
        })
    } else {
      //   if (code === 'maxHist') {
      //     let arr = []
      //     for (let i = 1; i <= 30; i++) {
      //       let obj = {
      //         label: `${i}天`,
      //         value: i,
      //       }
      //       arr.push(obj)
      //     }
      //     result = arr
      //   }
    }
  }
  return result
}

/**
 * 获取 字典选项
 * @param {String} code code
 */
export const getOptions = code => {
  let result = []
  if (code) {
    result = getOptionsByCodes(store.getters.codes, code)
  }
  return result
}
