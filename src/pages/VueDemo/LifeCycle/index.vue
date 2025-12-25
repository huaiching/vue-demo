<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'

const message = ref('初始內容')
const status = ref('尚未掛載')

// 標記是否第一次掛載
let mounted = false
// 初始渲染完成
onMounted(() => {
  status.value = '元件已掛載完成'
})
// 頁面渲染完成
onUpdated(() => {
  // 只在已掛載後，且 message 改變時更新狀態
  if (mounted) {
    status.value = '畫面已更新'
  }
  mounted = true
})
</script>

<template>
  <h1>生命週期函數</h1>
  <div>
    <p>message：{{ message }}</p>
    <p>status：{{ status }}</p>
    <button @click="message = '內容已變更'">更新內容</button>
  </div>
</template>
