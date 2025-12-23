<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
// 建立 reactive
const user = reactive({
  name: '王大明',
  age: 10
})
// 建立 computed 屬性
const isAdult = computed(() => {
  const adultDesc = user.age >= 18 ? "已成年" : "未成年"
  return `我是${user.name}，今年${user.age}歲，${adultDesc}。`
})
// 使用 computed 屬性
const message = ref(isAdult.value)
</script>

<template>
  <h1>{{ message }}</h1>
</template>