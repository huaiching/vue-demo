<script setup lang="ts">
import { ref } from 'vue';
import Child from './Components/Child.vue'

const name = ref('')

</script>

<template>
  <h1>slot - 插槽 - 簡單插槽</h1>
  <div>
    姓名：
    <input v-model="name" />
  </div>
  <Child>
    <p>你好，{{name}}</p>
  </Child>
</template>
