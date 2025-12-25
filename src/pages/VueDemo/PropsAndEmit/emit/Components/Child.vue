<script setup lang="ts">
import { ref } from 'vue';


const name = ref('');

// 定義 emit 型別
const emit = defineEmits(["hello"])

// 觸發 emit
const sendHello = (): void => {
  emit('hello', name.value)
}
</script>

<template>
  <div>
    姓名：<input v-model="name" placeholder="請輸入名稱" />
  </div>
  <button @click="sendHello">
    送出問候
  </button>
</template>
