<script setup lang="ts">
import { ref } from 'vue'

const titleClass = ref('title')
</script>

<template>
  <h1>v-bind - 屬性綁定</h1>
  <h3 v-bind:class="titleClass">文字（完整寫法）</h3>
  <h3 :style="{ color: '#42b983' }">文字（簡化寫法）</h3>
</template>

<style>
  .title {
    color: #42b983;
  }
</style>