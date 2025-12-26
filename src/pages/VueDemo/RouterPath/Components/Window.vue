<script setup lang="ts">

let params: { name: string; age: number } | null = null;
if (sessionStorage.getItem('params')) {
  params = JSON.parse(sessionStorage.getItem('params') || '{}')
}
</script>

<template>
  <h1>router 的 頁面跳轉 - 新頁面</h1>
  {{ params ? `歡迎，${params.name}，年齡：${params.age}` : '' }}
</template>