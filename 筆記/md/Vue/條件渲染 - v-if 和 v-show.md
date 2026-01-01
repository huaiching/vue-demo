# 條件渲染 - v-if 和 v-show

當 頁面的元件，需要根據條件 進行 `顯示` 或 `隱藏` 時，可以使用 `v-if` 及 `v-show`。

## 1. v-show

單純的條件渲染

- `true`：顯示 元件
- `false`：隱藏 元件

```html
<template>
  <元件 v-show="判斷式" />
</template>
```

### 範例

```html
<script setup lang="ts">
import { ref } from 'vue';

  const show = ref(true);

  const toggleShow = () => {
    show.value = !show.value;
  };
</script>

<template>
  <h1>v-show 簡單的條件渲染</h1>
  <button @click="toggleShow">
    切換顯示狀態 (目前: {{ show ? '顯示' : '隱藏' }})
  </button>
  <div>
    <h3 v-show="show">我出現了</h3>
  </div>
</template>
```

## 2. v-if

複雜情況使用的條件渲染，

- 以下三者搭配使用：
  - v-if
  - v-else-if
  - v-else
- 設定皆為
  - `true`：顯示 元件
  - `false`：隱藏 元件

```html
<template>
  <元件A v-if="判斷式" />
  <元件B v-else-if="判斷式" />
  <元件C v-else />
</template>
```

### 範例

```html
<script setup lang="ts">
import { ref } from 'vue';

const job = ref('')
const changeJob = (newJob: string) => {
  job.value = newJob
}
</script>

<template>
  <h1>v-if 複雜的條件渲染</h1>
  <div>
    <button @click="changeJob('engineer')">工程師</button>
    <button @click="changeJob('designer')">設計師</button>
    <button @click="changeJob('manager')">經理</button>
    <button @click="changeJob('')">清除職業</button>
  </div>
  <div>
    <h3 v-if="job === 'engineer'">我是一名工程師</h3>
    <h3 v-else-if="job === 'designer'">我是一名設計師</h3>
    <h3 v-else-if="job === 'manager'">我是一名經理</h3>
    <h3 v-else>請選擇職業</h3>
  </div>
</template>
```