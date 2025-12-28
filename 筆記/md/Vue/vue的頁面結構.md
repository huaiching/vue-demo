# vue 的 頁面結構

vue 的 頁面檔案 採用 `*.vue` 的檔案格式，將 `TypeScript`、`HTML` 和 `CSS` 分成三部分 整合在一個檔案中。

```html
<script setup lang="ts">
// JavaScript 邏輯與程式碼
</script>

<template>
  <!-- HTML 頁面結構 -->
</template>

<style scoped>
/* CSS 樣式 */
</style>
```

---

## 1. `<script setup lang="ts">` - TypeScript 邏輯區塊

`<script setup>` 是 Vue 3 的 **Composition API 語法糖**，能夠簡化組件的開發流程。

**主要特點：**

- **自動暴露**：所有定義的變數、函式都會自動暴露給 `<template>` 使用
- **無需 return**：不需要像傳統 Vue 2 Options API 一樣手動返回資料
- **更簡潔**：減少樣板代碼，提升開發效率
- **TypeScript 支援**：透過 `lang="ts"` 啟用 TypeScript

**語法格式：**

```html
<script setup lang="ts">
// TypeScript 語法支援
</script>
```

**程式碼組織順序：**

為了保持程式碼的可讀性和維護性，建議依照以下順序組織程式碼：

```html
<script setup lang="ts">
// 1. 引入外部模組
import { ref, computed, watch } from 'vue'

// 2. 引入組件
import MyComponent from '@/components/MyComponent.vue'

// 3. Vue 官方 API（Composables）
const router = useRouter()

// 4. 響應式資料宣告
const count = ref(0)

// 5. 計算屬性
const doubleCount = computed(() => count.value * 2)

// 6. 監聽器
watch(count, (newVal, oldVal) => {
  console.log(`count 從 ${oldVal} 變更為 ${newVal}`)
})

// 7. 自訂函式
const fetchUser = async () => {
  // API 請求邏輯
}

// 8. 生命週期函式（依執行順序排列）
onMounted(() => {
  console.log('已掛載完成')
  fetchUser()
})
</script>
```

--- 

## 2. `<template>` - HTML 結構區塊

`<template>` 區塊定義了組件的 **視覺呈現結構**，類似於傳統 HTML 的 `<body>` 部分。

**主要特點：**

- 可使用標準 **HTML 標籤**
- 可使用 **Vue 自訂指令**（如 `v-if`、`v-for`、`v-model`）
- 可引入並使用 **其他 Vue 組件**
- 支援 **插值語法** 顯示 JavaScript 變數

**插值語法：**

使用 `{{ }}` 雙大括號將 `JavaScript 表達式` 嵌入到 HTML 中：

```html
<template>
  <div>
    <!-- 顯示變數 -->
    <p>當前路由名稱：{{ route.name }}</p>

    <!-- 顯示計算結果 -->
    <p>計數器：{{ count }}</p>
    <p>雙倍計數：{{ count * 2 }}</p>

    <!-- 使用三元運算子 -->
    <p>狀態：{{ isActive ? '啟用' : '停用' }}</p>

    <!-- 呼叫函式 -->
    <p>大寫文字：{{ message.toUpperCase() }}</p>
  </div>
</template>
```

---

## 3. `<style scoped>` - CSS 樣式區塊

`<style scoped>` 定義組件的 **局部樣式**，`scoped` 屬性確保樣式只作用於當前組件。

**主要特點：**

- **樣式隔離**：避免全域樣式污染
- **不影響子組件**：預設不會滲透到子組件內部
- **支援預處理器**：可使用 SCSS、LESS 等

**語法格式：**

> 一個組件可以同時包含 `<style scoped>` 和 `<style>`，分別處理局部和全域樣式。

```html
<!-- 局部樣式：僅作用於當前組件 -->
<style scoped>
.button {
  background-color: #42b983;
  color: white;
}
</style>

<!-- 全域樣式：會影響整個應用程式 -->
<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
```
