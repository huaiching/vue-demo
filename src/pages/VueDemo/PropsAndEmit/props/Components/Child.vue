<script setup lang="ts">
interface Props {
  name: string
  onHello: (name: string) => void
}

// 接收 props
const props = defineProps<Props>()

</script>

<template>
  <div>
    <button @click="props.onHello(props.name)">
      歡迎訊息
    </button>
  </div>
</template>
