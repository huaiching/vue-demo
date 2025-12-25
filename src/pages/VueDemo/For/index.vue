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

const changeTabs = [
  { type: 'basic', label: '基本變更' },
  { type: 'relation', label: '關係人變更' },
  { type: 'benefit', label: '受益人變更' },
]
</script>

<template>
  <h1>for - 迭代渲染</h1>
  <div>
    <button 
      v-for="tab in changeTabs" 
      :key="tab.type"
      @click="()=>changeType = tab.type">
        {{ tab.label }}
      </button>
  </div>
  <component :is="setChangePage" />
</template>