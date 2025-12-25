# 動態切換元件 - component

`component` 是 vue 提供的 `動態切換顯示元件` 的方法，可依照條件 設定 要顯示的子頁面，常用於 `製作分頁表單`。

## 語法

- 使用 `computed` 設定 子元件切換方法
- 透過 `component` 元素，結合 `:is` 綁定要顯示的子元件

```html
<script setup lang="ts">
  const 判斷變數 = ref(初始狀態)

  const 切換函式 = computed(() => {
    switch (判斷變數) {
      case 狀態A:
        return 頁面A
      case 狀態B:
        return 頁面B
      defalut: 
        return 預設頁面
    }
  })
</script>

<template>
  <component :is="切換函式" />
</template>
```

## 範例

### 父元件

```html
<script setup lang="ts">
  import { computed, ref } from 'vue'
  import Basic from './Charnge/Basic.vue'
  import Relation from './Charnge/Relation.vue'
  import Benefit from './Charnge/Benefit.vue'

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
</script>

<template>
  <h1>component - 動態切換元件</h1>
  <div>
    <button @click="()=>changeType = 'basic'">基本變更</button>
    <button @click="()=>changeType = 'relation'">關係人變更</button>
    <button @click="()=>changeType = 'benefit'">受益人變更</button>
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
