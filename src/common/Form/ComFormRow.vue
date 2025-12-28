<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface ElFormRowProps {
  style?: CSSProperties
}

const props = defineProps<ElFormRowProps>()
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