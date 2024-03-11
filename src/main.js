import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'jquery'
// import { Button } from 'mint-ui';
import mintui from 'mint-ui'
import 'mint-ui/lib/style.css'
// Vue.component(Button.name, Button)
import vdr from 'vue-draggable-resizable-gorkys'
Vue.use(mintui)
import { Toast } from 'mint-ui'
Vue.prototype.$Toast = Toast
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vdr', vdr)
import VueDndZone from 'vue-dnd-zone'
Vue.use(VueDndZone)
import 'vue-dnd-zone/vue-dnd-zone.css'
import 'animate.css';
// import { Button } from 'element-ui';
// Vue.use(Button)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
