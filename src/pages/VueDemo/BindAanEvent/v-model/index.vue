<script setup lang="ts">
import { ref } from 'vue';

const name = ref();
const age = ref();
const phone = ref();
const address = ref();
</script>

<template>
  <h1>v-model - 雙向綁定</h1>
  <div>
    <p>姓名</p>
    <input v-model="name">
  </div>
  <div>
    <p>年齡 (number)</p>
    <input v-model.number="age">
  </div>
  <div>
    <p>電話 (lazy)</p>
    <input v-model.lazy="phone">
  </div>
  <div>
    <p>地址 (lazy)</p>
    <input v-model.trim="address">
  </div>
  <div>
    <p>輸入結果：</p>
    <p>我是{{ name }}，今年{{ age }}歲，電話是{{ phone }}，地址是{{ address }}。</p>
  </div>
</template>