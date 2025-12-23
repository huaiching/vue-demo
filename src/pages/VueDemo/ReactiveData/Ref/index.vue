<script setup lang="ts">
import { ref } from 'vue';

// 建立 ref
const count = ref(0)

// 修改 ref 的值
const add = () => {
  count.value = count.value + 1
}
</script>

<template>
  <h1>ref - 基本響應式數據</h1>
  <div>
    <p>目前數值：{{ count }}</p>
    <button @click="add">加 1</button>
  </div>
</template>