<script setup lang="ts">
import { computed, ref } from 'vue';
import Basic from './Charnge/Basic.vue';
import Relation from './Charnge/Relation.vue';
import Benefit from './Charnge/Benefit.vue';


const changeType = ref('basic')

const setChangePage = computed(() => {
  switch (changeType.value) {
    case 'basic':
      return Basic
    case 'relation':
      return Relation
    case 'benefit':
      return Benefit
  }
})
</script>

<template>
  <h1>component - 動態切換元件</h1>
  <div>
    <button @click="()=>changeType = 'basic'">基本變更</button>
    <button @click="()=>changeType = 'relation'">關係人變更</button>
    <button @click="()=>changeType = 'benefit'">受益人變更</button>
  </div>
  <component :is="setChangePage" />
</template>