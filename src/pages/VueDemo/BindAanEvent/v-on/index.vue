<script setup lang="ts">
import { ref } from 'vue';

const number = ref(0);

const add = () => {
  number.value++;
};
const subtract = () => {
  number.value--;
};
</script>

<template>
  <h1>v-on - 事件綁定</h1>
  <p>目前數字：{{ number }}</p>
  <div>
    <button v-on:click="add"> +1 </button>
  </div>
  <div>
    <button @click="() => {
      number = 0;
    }"> 歸零 </button>
  </div>
  <div>
    <button @click="subtract"> -1 </button>
  </div>
</template>