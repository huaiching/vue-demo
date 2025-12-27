<script setup lang="ts">
import MliBreadcrumb from '@/common/Field/MliBreadcrumb.vue';
import { ref } from 'vue';
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>

<template>
  <MliBreadcrumb />
  測試頁面
  <div>
    <el-date-picker v-model="value1" type="date" placeholder="輸入日期" format="TTT/MM/DD" />
  </div>
  <div>
    <el-date-picker v-model="value2" type="month" placeholder="輸入日期" format="TTT/MM" />
  </div>
  <div>
    <el-date-picker v-model="value3" type="daterange" range-separator="To" start-placeholder="輸入起日"
      end-placeholder="輸入契日" format="TTT/MM/DD" />
  </div>
</template>