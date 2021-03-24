import '../src/common/tree.common'

import InsPager from './ins-pager'

const components = [InsPager]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  InsPager,
}
