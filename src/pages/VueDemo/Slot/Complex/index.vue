<script setup lang="ts">
import { ref } from 'vue';
import Child from './Components/Child.vue'

const header = ref('')
const main = ref('')
const footer = ref('')
</script>

<template>
  <h1>slot - 插槽 - 具名插槽</h1>
  <div>
    header 內容：
    <input v-model="header" />
  </div>
  <div>
    main 內容：
    <input v-model="main" />
  </div>
  <div>
    footer 內容：
    <input v-model="footer" />
  </div>
  <Child v-slot:header>
    <p>Header : {{ header }}</p>
  </Child>
  <Child #main>
    <p>Main : {{ main }}</p>
  </Child>
  <Child #footer>
    <p>Footer : {{ footer }}</p>
  </Child>
</template>
