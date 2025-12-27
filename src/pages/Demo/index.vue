<script setup lang="ts">
import MliBreadcrumb from '@/common/Field/MliBreadcrumb.vue';
import { ref } from 'vue';
const value1 = ref('')
</script>

<template>
    <MliBreadcrumb />
    測試頁面
    <div>
        <el-date-picker v-model="value1" type="date" placeholder="輸入日期" format="TTT/MM/DD" />
    </div>
</template>