# 監聽器 - watch

`watch` 是用來監聽 `資料變化` 時，能夠執行 `副作用` 的 vue 內建函式。

適用場景：
- 根據資料變化，呼叫 API
- 根據資料變化，進行 資料同步作業

可監聽的資料類型：
- ref
  > 若 ref 為 `物件 {}`，則 無法監聽 物件的內部屬性
- reactive
- getter 函數
  > () => state.value

監聽的的資料，可以是 `一筆`，也可以是 `多筆` (用 陣列形式 表示)

## 語法

- 語法結構
  ```ts
  watch(source, callback, options?)
  ```
  - `source` : 監聽的資料
  - `callback` : 資料變化
    - ()
    - (新數值, 舊數值)
  - `options` : 額外選項
    - `immediate` : 建立時立即執行一次回調
      - true / false(預設)
    - `deep` : 深度監聽（對物件內部屬性變化也觸發）
      - true / false(預設)



- 應用方式

```ts
<script setup lang="ts">
// 1. 監聽單一 ref
watch(ref 變數, (新數值, 舊數值) => {
  邏輯處理
})

// 2. 監聽多個 ref資料（陣列形式）
watch([ref 變數A, ...], ([變數A 的 新數值, 變數A 的 舊數值], ...) => {
  邏輯處理
})

// 3. 監聽 reactive 物件的屬性
watch(() => reactive變數.屬性, (新數值, 舊數值) => {
  邏輯處理
})

// 4. 深度監聽整個 reactive 物件
watch(user, (newUser, oldUser) => {
  邏輯處理
}, { deep: true })
</script>
```


## 範例

```html
<script setup lang="ts">
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('尚未變更')

watch(count, (newVal, oldVal) => {
  message.value = `從 ${oldVal} 變成 ${newVal}`
})
</script>

<template>
  <h1>watch - 監聽器</h1>
  <button @click="count++">
    點我 +1（{{ count }}）
  </button>
  <button @click="count--">
    點我 -1（{{ count }}）
  </button>

  <p>{{ message }}</p>
</template>

```