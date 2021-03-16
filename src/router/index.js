import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决重复跳转同一路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/login',
    name:'Login',
    component: () => import(/* webpackChunkName: "about" */ '../view/login/login.vue'),
  },
  {
    path: '/home',
    redirect: '/home/list1',
    component: () => import(/* webpackChunkName: "about" */ '../view/home/home.vue'),
    children: [
      {
        path: '/home/list1',
        meta: {
          index: 0
        },
        component: () => import(/* webpackChunkName: "about" */ '../view/list1/list1.vue'),
      }, {
        path: '/home/list2',
        meta: {
          index: 1
        },
        component: () => import(/* webpackChunkName: "about" */ '../view/list2/list2.vue'),
      },

    ]
  },
  {
    // path: '/echarts/:id',
    path: '/echarts',
    name: 'Echarts',
    component: () => import(/* webpackChunkName: "about" */ '../view/echarts/echarts.vue'),
  }, {
    path: '/banner',
    name: 'Banner',
    component: () => import(/* webpackChunkName: "about" */ '../view/banner/banner.vue'),
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function(to, from, next) {
    if (!localStorage.getItem("token")) {
        if (to.path !== '/login') {
            return next('/login')
        }
    }
    next()
})
export default router
