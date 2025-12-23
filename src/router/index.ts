import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: "/home",
      name: "首頁",
      component: () => import('@/pages/Home/index.vue'),
      meta: { icon: 'House' }
    },
    {
      path: "/demo",
      name: "測試",
      meta: { icon: 'Location' },
      children: [
        {
          path: "demo",
          name: "測試頁面",
          component: () => import('@/pages/Demo/index.vue')
        },
      ]
    },
    {
      path: "/vueDemo",
      name: "Vue 測試",
      meta: { icon: 'Cellphone' },
      children: [
        {
          path: "ReactiveData",
          name: "響應式頁面",
          children: [
            {
              path: "Ref",
              name: "ref - 基本響應式數據",
              component: () => import('@/pages/VueDemo/ReactiveData/Ref/index.vue')
            },
            {
              path: "Reactive",
              name: "Reactive - 響應式對象",
              component: () => import('@/pages/VueDemo/ReactiveData/Reactive/index.vue')
            },
            {
              path: "Computed",
              name: "Computed - 計算屬性",
              component: () => import('@/pages/VueDemo/ReactiveData/Computed/index.vue')
            },
          ]
        },
      ]
    },
  ],
})

export default router