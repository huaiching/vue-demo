# 屬性綁定 - v-bind

`v-bind` 主要的作用為 將 `script 中的數據` 綁定到 `HTML元素` 的屬性上。

當 `數據發生變化` 時，`HTML元素的屬性` 會自動更新。

```
<script> --> <template>
```

## 1. 語法

### 基本語法

```html
<template>
  <HTML元素 v-bind:屬性名="變數或表達式" ></HTML元素>
</template>
```

### 簡化語法

因為 v-bind 是很常用的語法，所以 vue 提供一個專屬的簡化寫法 `:`。

```html
<template>
  <HTML元素 :屬性名="變數或表達式" ></HTML元素>
</template>
```

## 2. 範例

```html
<script setup lang="ts">
import { ref } from 'vue';

const titleClass = ref('title');
</script>

<template>
  <h1>v-bind - 屬性單向綁定</h1>
  <h3 v-bind:class="titleClass">文字（完整寫法）</h3>
  <h3 :style="{ color: '#42b983' }">文字（簡化寫法）</h3>
</template>

<style>
  .title {
    color: #42b983;
  }
</style>
```