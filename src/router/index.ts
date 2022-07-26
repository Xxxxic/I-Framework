import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    children:[
      {
        path:'/charts',
        name:'charts',
        component: () => import('../components/charts.vue'),
      },
      {
        path:'/productlist',
        name:'productlist',
        component: () => import('../components/productList.vue'),
      },
      {
        path:'/userlist',
        name:'userlist',
        component: () => import('../components/userList.vue'),
      }
    ]
  },
  {
    //为了方便页面的的设置 设置重定向
    path:"/",
    //默认跑到login下
    redirect:"/login"
  }
]

//4.x的路由--设置路由模式：createWebHashHistory  hash模式
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
