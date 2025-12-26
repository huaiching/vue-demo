# Pinia - 全域資料管理

`Pinia` 是 vue 官方推薦的 全域資料管理工具，透過此工具，可以解決 資料傳統上需要逐層傳遞 的麻煩。

## 設定 Pinia 函式

使用 `defineStore` 進行設定

- 第一個參數：資料的變數名稱
- 第二個參數：要回傳的方法

```ts
export interface 資料類型 {
  欄位定義 ...
}

export const Pinia函式 = defineStore(變數, ()=>{
  // 資料初始化
  const user = ref<資料類型>(初始值)
  // setting & getting
  ....
  // 資料清空方法
  ....
  // 應用函式
  ....
  return {
      變數,
      setting,
      getting,
      資料清空方法,
      應用函式
  }
})
```

## 頁面使用

- 載入 Pinia
  ```ts
  const piniaStore = Pinia函式()
  ```
- 使用 變數
  ```ts
  const 變數 = piniaStore.變數
  ```
- 使用 函式
  ```ts
  piniaStore.應用函式(參數)
  ```

## 範例

### Pinia 設定

- UserStore.ts

```ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

// 定義資料類型
export interface User {
  clientId: string
  name: string
  age: number
  address: string
  phone: string
}

export const useUserStore = defineStore('user', () => {
  // 資料初始化
  const user = ref<User>({
    clientId: '',
    name: '',
    age: 0,
    address: '',
    phone: ''
  })
  // setting
  const setUser = (newUser: User) => {
    user.value = newUser
  }
  // 初始化使用者資料方法
  const initUser = () => {
    user.value = {
      clientId: '',
      name: '',
      age: 0,
      address: '',
      phone: ''
    }
  }

  return {
    user,
    initUser,
    setUser
  }
})
```

### 主元件

```html
<script setup lang="ts">
import InputUser from './Components/InputUser.vue';
import DisplayUser from './Components/DisplayUser.vue';
</script>

<template>
  <h1>Pinia - 全域資料管理</h1>
  <InputUser />
  <hr />
  <DisplayUser />
</template>
```

### 子元件

- InputUser.vue

  ```html
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useUserStore, type User } from '../Pinia/UserStore'
  
  const userData = ref<User>({
    clientId: '',
    name: '',
    age: 0,
    address: '',
    phone: ''
  })
  const store = useUserStore()
  
  const save = () => {
    store.setUser(userData.value)
    alert('資料已儲存！')
  }
  
  const reset = () => {
    userData.value = {
      clientId: '',
      name: '',
      age: 0,
      address: '',
      phone: ''
    }
    store.initUser()
  }
  </script>
  
  <template>
    <h2>輸入使用者資料</h2>
    <form @submit.prevent="save">
      <label>
        客戶證號:
        <input v-model="userData.clientId" required />
      </label>
      <br /><br />
      <label>
        姓　　名:
        <input v-model="userData.name" required />
      </label>
      <br /><br />
      <label>
        年　　齡:
        <input type="number" v-model.number="userData.age" required />
      </label>
      <br /><br />
      <label>
        地　　址:
        <input v-model="userData.address" required />
      </label>
      <br /><br />
      <label>
        電　　話:
        <input v-model="userData.phone" required />
      </label>
      <br /><br />
      <button type="submit">儲存資料</button>
      <button type="button" @click="reset" style="margin-left: 10px;">重置</button>
    </form>
  </template>
  ```

- DisplayUser.vue

  ```html
  <script setup>
  import { useUserStore } from '../Pinia/UserStore'
  
  const store = useUserStore()
  </script>
  
  <template>
    <h2>顯示使用者資料</h2>
    <div v-if="store.user.clientId">
      <p>客戶證號: {{ store.user.clientId }}</p>
      <p>姓　　名: {{ store.user.name }}</p>
      <p>年　　齡: {{ store.user.age }}</p>
      <p>地　　址: {{ store.user.address }}</p>
      <p>電　　話: {{ store.user.phone }}</p>
    </div>
    <div v-else>
      <p>尚未輸入任何使用者資料</p>
    </div>
  </template>
  ```