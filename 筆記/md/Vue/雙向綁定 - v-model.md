# 雙向綁定 - v-model

`v-model` 是結合 `v-bind` 跟 `v-on` 的語法糖，用來將 `數據` 與 `HTML元素屬性` 進行雙向綁定。。

- 當使用者在表單中 `輸入內容` 時，`響應式資料` 會自動更新。
- 當 `響應式資料` 改變時，`表單元素的值` 也會自動更新。

```
<script> <--> <template>
```

## 1. 語法

`v-model` 可以用於

- 文本輸入
  - input
  - textarea
- 單選按鈕
  - radio
- 複選框
  - checkbox
- 下拉選單
  - select
- 自定義元件

### 基本語法

```html
<script setup lang="ts">
import { ref } from 'vue'

const 狀態變數 = ref(初始值)
</script>

<template>
  <HTML元素 type="text" v-model="狀態變數"/>
</template>
```

### 修飾符

`v-model` 可以藉由 `修飾符` 進行 進階操作。（以同時設定很多個）

- lazy
  
  > `離開焦點`，才會觸發資料同步
  
  ```html
  <input type="text" v-model.lazy="狀態變數"/>
  ```

- number
  
  > 當 `輸入值 為 數字` 時，會 `自動轉型` 為 `數字型態`
  
  - 數字 + 文字 = 只留下數字
  
  - 文字 + 數字 = 文字型態
  
  ```html
  <input type="text" v-model.number="狀態變數"/>
  ```

- trim
  
  > 自動過濾首尾空白
  
  ```html
  <input type="text" v-model.trim="狀態變數"/>
  ```

## 2. 範例

```html
<script setup lang="ts">
import { ref } from 'vue';

const name = ref();
const age = ref();
const phone = ref();
const address = ref();
</script>

<template>
  <h1>v-model - 雙向綁定</h1>
  <div>
    <p>姓名</p>
    <input v-model="name">
  </div>
  <div>
    <p>年齡 (number)</p>
    <input v-model.number="age">
  </div>
  <div>
    <p>電話 (lazy)</p>
    <input v-model.lazy="phone">
  </div>
  <div>
    <p>地址 (lazy)</p>
    <input v-model.trim="address">
  </div>
  <div>
    <p>輸入結果：</p>
    <p>我是{{ name }}，今年{{ age }}歲，電話是{{ phone }}，地址是{{ address }}。</p>
  </div>
</template>
```