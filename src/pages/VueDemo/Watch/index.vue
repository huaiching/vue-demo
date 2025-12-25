<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('尚未變更')

watch(count, (newVal, oldVal) => {
  message.value = `從 ${oldVal} 變成 ${newVal}`
})
</script>

<template>
  <h1>watch - 監聽器</h1>
  <button @click="count++">
    點我 +1（{{ count }}）
  </button>
  <button @click="count--">
    點我 -1（{{ count }}）
  </button>

  <p>{{ message }}</p>
</template>
