<script setup lang="ts">
import { ref } from 'vue';

  const show = ref(true);

  const toggleShow = () => {
    show.value = !show.value;
  };
</script>

<template>
  <h1>v-show 簡單的條件渲染</h1>
  <button @click="toggleShow">
    切換顯示狀態 (目前: {{ show ? '顯示' : '隱藏' }})
  </button>
  <div>
    <h3 v-show="show">我出現了</h3>
  </div>
</template>