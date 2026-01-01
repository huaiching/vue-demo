# 響應式數據 - ref、reactive 和 computed

響應式數據：當 數據資料改變時，可以同步進行頁面重新渲染。

## 1. ref - 基本響應式數據

### 特性

- 可擺放 `任何型態` 的資料
- 數值 會放在 `value` 屬性中
- 監聽器 (watch) 無法監聽內部屬性

### 語法

- 宣告
  
  ```ts
  const 變數 = ref(數值)
  ```

- Setting
  
  > 變數.value = 新數值

- Getting
  
  - script 
    
    > 變數.value
  
  - template
    
    > {{ 變數 }}

### 範例

```html
<script setup lang="ts">
import { ref } from 'vue';

// 建立 ref
const count = ref(0)

// 修改 ref 的值
const add = () => {
  count.value = count.value + 1
}
</script>

<template>
  <h1>ref - 基本響應式數據</h1>
  <div>
    <p>目前數值：{{ count }}</p>
    <button @click="add">加 1</button>
  </div>
</template>
```

## 2. reactive - 響應式對象

### 特性

- 可擺放 `物件 { }` 或 `陣列[]`
- `監聽器` 可監聽 內部欄位

### 語法

- 宣告
  
  ```ts
  const 變數 = reactive(數值)
  ```

- Setting
  
  > 變數.欄位 = 新數值

- Getting
  
  - script 
    
    > 變數.欄位
  
  - template
    
    > {{ 變數.欄位 }}

### 範例

```html
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
```

## 3. computed - 計算屬性

### 特性

用來描述 `依賴響應式狀態` 的複雜邏輯

當 `響應式狀態` 的內容改變時，`計算屬性` 的數值 也會 `同步改變`，並且 `重新渲染畫面`

### 語法

- 宣告
  
  ```ts
  cosnt 變數 = computed(() => {
    處理邏輯
    return 經過邏輯判斷後，要回傳的數值
  })
  ```

- Getting
  
  - script 
    
    > 變數.value
  
  - template
    
    > {{ 變數 }}

### 範例

```html
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
// 建立 reactive
const user = reactive({
  name: '王大明',
  age: 10
})
// 建立 computed 屬性
const isAdult = computed(() => {
  const adultDesc = user.age >= 18 ? "已成年" : "未成年"
  return `我是${user.name}，今年${user.age}歲，${adultDesc}。`
})
// 使用 computed 屬性
const message = ref(isAdult.value)
</script>

<template>
  <h1>{{ message }}</h1>
</template>
```
