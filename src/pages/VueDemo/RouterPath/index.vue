<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const routerPush = (path: string) => {
  const data = { name: '測試用戶', age: 25 }
  sessionStorage.setItem('params', JSON.stringify(data))
  router.push(path)
}
const windowPath = (path: string) => {
  const data = { name: '測試用戶', age: 25 }
  sessionStorage.setItem('params', JSON.stringify(data))
  window.open(path, '_blank')
  sessionStorage.removeItem('params');
}
</script>

<template>
  <h1>router 的 頁面跳轉 - 原頁面</h1>
  <div>
    <button @click="routerPush('/vueDemo/RouterPath/router')">回首頁</button>
  </div>
  <div>
    <button @click="windowPath('/vueDemo/RouterPath/window')">回首頁 (開新分頁)</button>
  </div>
</template>