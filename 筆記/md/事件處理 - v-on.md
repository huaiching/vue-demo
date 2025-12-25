# 事件處理 - v-on

`v-on` 是用來監聽 `DOM 事件`，並執行對應的 `JavaScript 表達式或方法`。

當事件觸發時，會執行 `綁定的 表達式或方法`。

```
<script> <-- <template>
```

## 1. 語法

### 基本語法

```html
<template>
  <HTML元素 v-on:事件="函式" ></HTML元素>
</template>
```

### 簡化語法

因為 v-on 是很常用的語法，所以 vue 提供一個專屬的簡化寫法 `@`。

```html
<template>
  <HTML元素 @事件="函式" ></HTML元素>
</template>
```

### 直接寫程式碼

```html
<template>
  <HTML元素 @click="() => {
      邏輯處理
    }" ></HTML元素>
</template>
```

## 2. 範例

```html
<script setup lang="ts">
import { ref } from 'vue';

const number = ref(0);

const add = () => {
  number.value++;
};
const subtract = () => {
  number.value--;
};
</script>

<template>
  <h1>v-on - 事件綁定</h1>
  <p>目前數字：{{ number }}</p>
  <div>
    <button v-on:click="add"> +1 </button>
  </div>
  <div>
    <button @click="() => {
      number = 0;
    }"> 歸零 </button>
  </div>
  <div>
    <button @click="subtract"> -1 </button>
  </div>
</template>
```