/**
 * 底部工作列
 */
<template>
  <div class="footer-toolbar">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 純容器元件，無任何邏輯
</script>

<style scoped>
.footer-toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 24px;
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
  gap: 12px; /* 內容內元素之間的間距（可選） */
}
</style>