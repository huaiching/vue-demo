<script setup lang="ts">
import Child from './Components/Child.vue'

// 接收子元件 emit 的方法
const handleHello = (msg: string): void => {
  alert(`歡迎 ${msg} !`)
}
</script>

<template>
  <Child @hello="handleHello" />
</template>
