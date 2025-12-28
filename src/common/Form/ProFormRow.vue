/**
 * 列布局：攔寬預設為 10
 */
<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface ProFormRowProps {
  style?: CSSProperties
}

const props = defineProps<ProFormRowProps>()
</script>

<template>
  <el-row
    tag="div"
    :gutter="10"
    justify="start"
    v-bind="$attrs"
    :style="props.style"
  >
    <slot />
  </el-row>
</template>