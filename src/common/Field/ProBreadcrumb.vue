/**
 * 麵包屑組件：根據當前路由自動生成麵包屑導航
 */
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 自動生成麵包屑資料，只保留有 name 的路由
const breadcrumbList = computed(() => {
  return route.matched
    .filter(item => item.name) // 只顯示有 name 的路由
    .map(item => ({
      path: item.path,
      title: item.name || '未命名'
    }))
})
</script>

<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="item.path"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style scoped>
/* 主容器：整個麵包屑的整體樣式 */
.app-breadcrumb {
  padding: 0 10px 30px 0;     /* 上 0、右 10px、下 30px、左 0 → 控制與周圍元素的間距 */
  font-size: 14px;            /* 統一麵包屑文字大小 */
}
</style>