<script setup lang="ts">
import { ref } from 'vue';
import Child from './Components/Child.vue'

// 傳給子元件的變數
const name = ref('')

// 傳給子元件的函式
const sayHello = (name: string): void => {
  alert(`Hello ${name} !`)
}
</script>

<template>
  <h1>props - 資料傳遞 (父傳子)</h1>
  <div>
    姓名：<input v-model="name" placeholder="請輸入名稱" />
  </div>
  
  <Child :name="name" :onHello="sayHello" />
</template>
