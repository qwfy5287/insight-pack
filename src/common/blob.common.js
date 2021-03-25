export const BlobType = {
  text: 'text/plain,charset=utf-8',
  excel: 'application/vnd.ms-excel;charset=utf-8',
}

/**
 * 流文件下载
 *
 * 在 api 请求，添加 blob
 *    return request.request({
 *      baseURL: baseUrl,
 *      url: `${prePath}/download`,
 *      method: 'get',
 *      params,
 *      responseType: 'blob',
 *    })
 * @param {*} res 接口返回的流文件数据
 * @param {*} fileName 下载的文件名：文件.csv
 */
export const downloadByBlob = (res, fileName, blobType = 'text/plain,charset=utf-8') => {
  const blob = new Blob([res], { type: blobType })
  const blobUrl = window.URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = blobUrl
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(blobUrl)
}

/**
 * 在 response 拦截器处理blob
 * @param {Object} response response
 * @returns res
 */
export const handleResponseBlob = response => {
  let result = response.data

  if (!response) {
    console.log(`缺少参数 response ${response}`)
    // throw new Error(`缺少参数 response ${response}`)
  }

  if (response.config.responseType === 'stream' || response.config.responseType === 'blob') {
    // 有文件名的是时候，代表下载正确
    // 错误的时候，会返回json：code,msg 等
    // if (response.headers.filename) {
    result = {
      code: '20000',
      filename: response.headers.filename || '服务器出错，请联系管理员.txt',
      data: response.data,
    }
    // }
    // else {
    //   res = { success: false, code: '50001', msg: '服务器出错，请联系管理员', data: null }
    // }
  }

  return result
}
