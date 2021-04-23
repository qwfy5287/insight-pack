import Vue from 'vue/dist/vue.esm'

function vueRender({ loading }) {
  return new Vue({
    el: '#sub-app-container',
    data() {
      return {
        loading,
      }
    },
    template: `
      <div id="sub-app-container">
        <h4 v-if="loading" class="sub-app-loading">Loading...</h4>
        <div id="sub-app-viewport"></div>
      </div>
    `,
  })
}

let app = null

export default function render({ loading }) {
  if (!app) {
    app = vueRender({ loading })
  } else {
    app.loading = loading
  }
}
