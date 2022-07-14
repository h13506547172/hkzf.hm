import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 房屋管理页面
  {
    path: '/rent',
    component: () => {
      return import('@/views/rent/index.vue')
    }
  },
  // 我的收藏页面
  {
    path: '/collect',
    component: () => {
      return import('@/views/collect/index.vue')
    }
  },
  // 登录路由
  {
    path: '/login',
    component: () => {
      return import('@/views/login/index.vue')
    }
  },
  // 首页找房资讯我的
  {
    path: '/',
    component: () => {
      return import('@/views/layout/index.vue')
    },
    children: [
      {
        path: '/',
        component: () => {
          return import('@/views/home/index')
        },
        meta: {
          active: 0
        }
      },
      {
        path: '/zf',
        component: () => {
          return import('@/views/zf/index')
        },
        meta: {
          active: 1
        }
      },
      {
        path: '/info',
        component: () => {
          return import('@/views/information/index')
        },
        meta: {
          active: 2
        }
      },
      {
        path: '/my',
        component: () => {
          return import('@/views/my/index')
        },
        meta: {
          active: 3
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
