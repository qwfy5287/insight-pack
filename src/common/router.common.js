import { treeToListForRouter, listToTree } from './tree.common'

/**
 * 通过 item.path 获取完整路径
 */
export const getFullPath = (basePath, routePath, $router) => {
  let result = basePath
  if (routePath) {
    result = $router.matcher.getRoutes().find((d) => d.path.endsWith(routePath))?.path
  }
  return result
}

/**
 * 获取子路由
 * @param {Array} routes 全部路由 this.$router.options.routes
 * @param {String} path 当前路由地址 this.$route.path
 * @returns
 */
export const getChildrenRoutes = (routes, path) => {
  let result = null
  let list = treeToListForRouter(routes, 'path', 'name')
  list?.forEach((d) => (d.path = d.fullPath))
  let tree = listToTree(list)
  let firstLevelItem = tree.find((d) => d.fullPath.startsWith(`/${path.split('/')[1]}`))
  result = firstLevelItem?.children
  return result
}
