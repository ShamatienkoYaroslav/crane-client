// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueMaterial from 'vue-material'
import VueResorse from 'vue-resource'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.use(VueResorse)

Vue.material.registerTheme('default', {
  primary: 'green',
  accent: 'amber',
  warn: 'red'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
