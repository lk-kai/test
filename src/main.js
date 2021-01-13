import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import 'jquery'
// import { Button } from 'mint-ui';
import mintui from 'mint-ui'
import 'mint-ui/lib/style.css'
// Vue.component(Button.name, Button)
Vue.use(mintui)
import { Toast } from 'mint-ui';
Vue.prototype.$Toast = Toast
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// import { Button } from 'element-ui';
// Vue.use(Button)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
