# vue-router - 路由管理

`vue-router` 是 vue 官方提供的 路由管理工具。

下面會進行 簡單的介紹，更詳細的資訊可前往官網 https://router.vuejs.org/zh/guide/

> 此說明 將根據 `App.vue` 中建立的 layout 頁面來進行說明

## 路由配置檔案

**檔案位置：**

路由設定檔，位於 `src/router/index.ts`。

**基本配置結構：**

| 屬性          | 說明                    | 範例                                      |
| ----------- | --------------------- | --------------------------------------- |
| `path`      | URL 路徑（第一層必須以 `/` 開頭） | `/home`                                 |
| `name`      | 路由名稱（唯一識別）            | `'首頁'`                                  |
| `component` | 對應的頁面組件               | `() => import('@/pages/Home.vue')`      |
| `redirect`  | 路由重定向                 | `'/home'`                               |
| `children`  | 子路由陣列                 | `[{ path: 'detail', ... }]`             |
| `meta`      | 自訂資料（如權限、圖示）          | `{ icon: 'House', requiresAuth: true }` |

> **提示：** `@` 符號代表 `src/` 目錄

```ts
import { createRouter, createWebHistory, RouterView } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 路由配置
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: "/home",
      name: "首頁",
      component: () => import('@/pages/Home/index.vue'),
      meta: { 
        icon: 'House'
      }
    },
    {
      path: "/demo",
      name: "測試",
      meta: { 
        icon: 'Location'
      },
      children: [
        {
          path: "page",
          name: "測試頁面",
          component: () => import('@/pages/Demo/index.vue')
        },
      ]
    },
  ],
})

// 生命週期函數
router.beforeEach((to, from) => {
  console.log('路由守衛 - beforeEach')
  console.log('to:', to.path)
  console.log('from:', from.path)
})

export default router
```

## 生命週期函數

![alt text](image/router_01.png)

要進行 Menu 的權限控管，可利用 `beforEach`，當 `無權限` 時，`return form.path` 返回上一頁。

- `to`：要前往的 router 資訊
- `form`：目前所在的 router 資訊

```ts
router.beforeEach((to, from) => {
  if(!to.mata.requires) {
    alert('無權限!!')
    return from.path
  }
})
```

## 動態路由

動態路由用於處理**帶有參數的 URL**，例如：使用者詳情、文章頁面、產品資訊等。

**路由定義：**

使用 `:` 來標記動態段，參數名稱可自訂，如：`:id`。

如果非必填，於最後面加上 `?` 表示，如：`:keyword?`。

```ts
{
  path: '/user/:id',              // :id 為動態參數
  name: '使用者詳情',
  component: () => import('@/pages/UserDetail/index.vue'),
  meta: { 
    icon: 'User',
    requiresAuth: true          // 可搭配權限使用
  }
},

{
  path: '/article/:category/:articleId',  // 多個動態參數
  name: '文章詳情',
  component: () => import('@/pages/ArticleDetail/index.vue')
},
{
  path: '/search/:keyword?',              // 可選參數，在後面加上【?】
  name: '搜尋',
  component: () => import('@/pages/Search/index.vue')
},
{
  path: '/:pathMatch(.*)*',       // 萬用路由，放在最後，用來處理 404
  name: 'NotFound',
  component: () => import('@/pages/NotFound/index.vue')
}
```

**在頁面組件中取得參數：**

透過 `useRoute()` 可取得 該頁面的 router 相關資料。

藉由 `router.params` 即可獲得相關參數。

```html
<!-- 在 UserDetail/index.vue 中 -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// 取得單一參數
const userId = computed(() => route.params.id as string)

// 取得多參數
const articleId = computed(() => route.params.articleId as string)
const category = computed(() => route.params.category as string)
</script>
```

## 頁面跳轉

在頁面中 要進行 頁面跳轉：

- 原分頁跳轉，可透過 `router.path(前往URL)` 處理。
- 新開分頁跳轉，可透過 `window.open(前往URL, '_blank')` 處理。

```html
<script setup lang="ts">
import MliBreadcrumb from '@/common/Field/MliBreadcrumb.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const routerPush = (path: string) => {
    router.push(path)
}
const windowPath = (path: string) => {
     window.open(path, '_blank')
}
</script>

<template>
    <MliBreadcrumb />
    測試頁面
    <div>
        <button @click="routerPush('/home')">回首頁</button>
    </div>
    <div>
        <button @click="windowPath('/home')">回首頁 (開新分頁)</button>
    </div>
</template>
```

如果需要隱式夾帶數據，可參考以下方式處理

- 原頁面跳轉
  
  > 參數銷毀 `sessionStorage.removeItem()` 於 接收端 執行。
  
  - 傳送端（原頁面）
    
    ```ts
    const data = { name: '測試用戶', age: 25 }
    sessionStorage.setItem('params', JSON.stringify(data))
    window.open('/vueDemo/RouterPath/router', '_blank')
    ```
  
  - 接收端（新頁面）
    
    ```ts
    let params: { name: string; age: number } | null = null;
    if (sessionStorage.getItem('params')) {
      params = JSON.parse(sessionStorage.getItem('params') || '{}')
      sessionStorage.removeItem('params');
    }
    ```

- 新開分頁跳轉
  
  > 參數銷毀 `sessionStorage.removeItem()` 於 傳送端 執行。
  
  - 傳送端（原頁面）
    
    ```ts
    const data = { name: '測試用戶', age: 25 }
    sessionStorage.setItem('params', JSON.stringify(data))
    window.open('/vueDemo/RouterPath/window', '_blank')
    sessionStorage.removeItem('params');
    ```
  
  - 接收端（新頁面）
    
    ```ts
    let params: { name: string; age: number } | null = null;
    if (sessionStorage.getItem('params')) {
      params = JSON.parse(sessionStorage.getItem('params') || '{}')
    }
    ```

## 重要的 layout 核心組件

- `RouterLink`：路由導航組件
  
  | 屬性                   | 說明                    |
  | -------------------- | --------------------- |
  | `to`                 | 目標路由（字串或物件）           |
  | `replace`            | 使用 replace 模式（不留歷史記錄） |
  | `active-class`       | 連結激活時的 CSS 類名         |
  | `exact-active-class` | 連結精確激活時的 CSS 類名       |
  
  ```html
  <RouterLink to="要前往的URL">按鈕的名稱</RouterLink>
  ```

- `RouterView`：路由視圖組件
  
  - 負責顯示當前路由對應的組件內容。
    
    ```html
    <RouterView />
    ```
