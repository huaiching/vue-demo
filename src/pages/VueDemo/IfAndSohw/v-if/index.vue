<script setup lang="ts">
import { ref } from 'vue';

const job = ref('')
const changeJob = (newJob: string) => {
  job.value = newJob
}
</script>

<template>
  <h1>v-if 複雜的條件渲染</h1>
  <div>
    <button @click="changeJob('engineer')">工程師</button>
    <button @click="changeJob('designer')">設計師</button>
    <button @click="changeJob('manager')">經理</button>
    <button @click="changeJob('')">清除職業</button>
  </div>
  <div>
    <h3 v-if="job === 'engineer'">我是一名工程師</h3>
    <h3 v-else-if="job === 'designer'">我是一名設計師</h3>
    <h3 v-else-if="job === 'manager'">我是一名經理</h3>
    <h3 v-else>請選擇職業</h3>
  </div>
</template>