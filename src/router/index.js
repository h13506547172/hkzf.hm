import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 城市列表
  {
    path: '/city',
    component: () => {
      return import('@/views/city/index')
    }
  },
  // 搜索小区页面
  {
    path: '/rent/search',
    component: () => {
      return import('@/views/rent/search')
    }
  },
  // 发布房源页面
  {
    path: '/rent/add',
    name: 'rentadd',
    component: () => {
      return import('@/views/rent/add.vue')
    }
  },
  // 详细页面
  {
    path: '/detail',
    component: () => {
      return import('@/views/detail/index')
    }
  },
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
    redirect: '/ ',
    component: () => {
      return import('@/views/layout/index.vue')
    },
    children: [
      {
        path: '/ ',
        component: () => {
          return import('@/views/home/index')
        }
      },
      {
        path: '/zf',
        component: () => {
          return import('@/views/zf/index')
        }
      },
      {
        path: '/info',
        component: () => {
          return import('@/views/information/index')
        }
      },
      {
        path: '/my',
        component: () => {
          return import('@/views/my/index')
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
