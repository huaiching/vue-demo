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
  ],
})

export default router