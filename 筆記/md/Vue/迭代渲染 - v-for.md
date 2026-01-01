# 迭代渲染 - v-for

`v-for` 是 根據 `陣列 或 物件` 進行 `迭代渲染` 的指令，它可以 `重複渲染` 元素 或 模板區塊，非常適合顯示清單、表格、選單等動態內容。

## 語法

```html
<script setup lang="ts">
const 陣列變數 = [ ... ]
</script>

<template>
  <元素 v-for="變數 in 陣列變數" :kye="變數.key ..." > 
    {{ 變數.欄位 }} 
  </元素>
</template>
```

## 範例

### 父元件

```html
<script setup lang="ts">
import { computed, ref } from 'vue';
import Basic from './Charnge/Basic.vue';
import Relation from './Charnge/Relation.vue';
import Benefit from './Charnge/Benefit.vue';

const changeType = ref('basic')

const setChangePage = computed(() => {
  switch (changeType.value) {
    case 'basic':
      return Basic
    case 'relation':
      return Relation
    case 'benefit':
      return Benefit
  }
})

const changeTabs = [
  { type: 'basic', label: '基本變更' },
  { type: 'relation', label: '關係人變更' },
  { type: 'benefit', label: '受益人變更' },
]
</script>

<template>
  <h1>for - 迭代渲染</h1>
  <div>
    <button 
      v-for="tab in changeTabs" 
      :key="tab.type"
      @click="()=>changeType = tab.type">
        {{ tab.label }}
      </button>
  </div>
  <component :is="setChangePage" />
</template>
```

### 子元件

- Basic

```html
<template>
  <h2>基本變更頁面</h2>
</template>
```

- Relation

```html
<template>
  <h2>關係人變更頁面</h2>
</template>
```

- Benefit

```html
<template>
  <h2>受益人變更頁面</h2>
</template>
```
