# vue 的 頁面結構

vue 3 的頁面布局，與 傳統 html 類似，分為以下三部分

- `script setup` : JavaScript 部分
  - 此為 `vue 3` 的語法糖，會自動將 `邏輯` 暴露給 `template` 使用，減少 `傳統 vue` 開發時的繁複設定
  - 這裡便會擺放
    - import
    - 官方相關的變數宣告
    - 自訂的變數宣告
    - 函式
    - 生命週期函式 (依照生命週期執行順序擺放)
- `template` : html body 部分
  - 要顯示的 `頁面布局設定`
  - 可使用 `html 標籤` 及 `vue的頁面標籤`
  - 使用 `Java Script 元素` 需要使用 `{{ }}` 標示，如：`{{ route.name }}`
- `style scoped` : css 部分
  - 有設定 `scoped` 屬性，該樣式為 本地樣式，只會部屬在當前頁面上，不會渲染到 子組件中

```html
<script setup>
    /** Java Script 及 程式邏輯 **/
</script>

<template>
    <!-- 頁面樣式 -->
</template>

<style scoped>
    /** CSS 樣式 **/
</style>
```
