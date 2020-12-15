import Vue from 'vue'
import App from './App.vue'
// import 'jquery'
// import { Button } from 'mint-ui';
import mintui from 'mint-ui'
import 'mint-ui/lib/style.css'
// Vue.component(Button.name, Button)
Vue.use(mintui)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
