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
