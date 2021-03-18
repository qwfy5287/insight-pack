import Vue from 'vue'

import '../assets/tailwind.css'

/**
 * VueCompositionApi
 */
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

/**
 * ElementUI
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
  size: 'small',
})
