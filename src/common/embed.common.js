/**
 * 获取 是否嵌入模式
 * 是
 *  http://localhost:8080/#/home?embed
 *  http://localhost:8080/#/home?embed=true
 * 否
 *  http://localhost:8080/#/home?embed=false
 */
export const getIsEmbed = () => {
  let result = false

  let searchStr = window.location.href.split('?')[1]
  let urlParams = new URLSearchParams(searchStr)
  //   let queryObj = {}
  //   if (urlParams.get('proId')) {
  //     queryObj.proId = urlParams.get('proId')
  //   }
  //   if (searchStr && searchStr.includes('embed')) {
  //     queryObj.embed = ''
  //   }
  if (searchStr && searchStr.includes('embed') && urlParams?.get('embed') !== 'false') {
    // queryObj.embed = "";
    result = true
  }

  //   console.log('🚀 ~ file: embed.common.js ~ line 20 ~ getIsEmbed ~ result', result)

  return result
}
