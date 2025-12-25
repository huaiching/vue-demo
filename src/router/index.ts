import { createRouter, createWebHistory, RouterView } from 'vue-router'

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
          name: "響應式資料",
          children: [
            {
              path: "Ref",
              name: "ref - 基本響應式數據",
              component: () => import('@/pages/VueDemo/ReactiveData/ref/index.vue')
            },
            {
              path: "Reactive",
              name: "Reactive - 響應式對象",
              component: () => import('@/pages/VueDemo/ReactiveData/reactive/index.vue')
            },
            {
              path: "Computed",
              name: "Computed - 計算屬性",
              component: () => import('@/pages/VueDemo/ReactiveData/computed/index.vue')
            },
          ]
        },
        {
          path: "BindAanEvent",
          name: "資料綁定與事件處理",
          children: [
            {
              path: "v-bind",
              name: "v-bind - 屬性綁定",
              component: () => import('@/pages/VueDemo/BindAanEvent/v-bind/index.vue')
            },
            {
              path: "v-on",
              name: "v-on - 事件處理",
              component: () => import('@/pages/VueDemo/BindAanEvent/v-on/index.vue')
            },
            {
              path: "v-model",
              name: "v-model - 雙向綁定",
              component: () => import('@/pages/VueDemo/BindAanEvent/v-model/index.vue')
            },
          ]
        },
        {
          path: "PropsAndEmit",
          name: "資料傳遞",
          children: [
            {
              path: "child",
              name: "嵌套元件",
              component: () => import('@/pages/VueDemo/PropsAndEmit/child/index.vue')
            },
            {
              path: "props",
              name: "props - 資料傳遞 (父傳子)",
              component: () => import('@/pages/VueDemo/PropsAndEmit/props/index.vue')
            },
            {
              path: "emit",
              name: "emit - 資料傳遞 (子傳父)",
              component: () => import('@/pages/VueDemo/PropsAndEmit/emit/index.vue')
            },
          ]
        },
        {
          path: "IfAndShow",
          name: "條件渲染",
          children: [
            {
              path: "v-show",
              name: "v-show - 簡單的條件渲染",
              component: () => import('@/pages/VueDemo/IfAndSohw/v-show/index.vue')
            },
            {
              path: "v-if",
              name: "v-if - 複雜的條件渲染",
              component: () => import('@/pages/VueDemo/IfAndSohw/v-if/index.vue')
            },
          ]
        },
        {
          path: "Component",
          name: "動態切換元件",
          component: () => import('@/pages/VueDemo/Component/index.vue')
        },
        {
          path: "For",
          name: "迭代渲染",
          component: () => import('@/pages/VueDemo/For/index.vue')
        },
      ]
    },
  ],
})

export default router