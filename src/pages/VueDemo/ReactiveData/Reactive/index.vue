<script setup lang="ts">
import { reactive } from 'vue';
// 建立 reactive
const state = reactive({
    count: 0
})
// 修改 reactive 的值
const add = () => {
    state.count = state.count + 1
}   
</script>


<template>
    <h1>reactive - 響應式對象</h1>
    <div>
        <p>目前數值：{{ state.count }}</p>
        <button @click="add">加 1</button>
    </div>
</template>>