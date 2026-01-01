# 插槽 - slot

`slot` 可以讓 父組件可以向子組件「插入」自訂內容，實現高度靈活的內容分發。

簡單說：子組件預留一個「洞」（slot），父組件決定要放什麼進去。

## 1. 基本用法：單一插槽

![alt text](image/slot_01.png)

- 子元件
  
  > 不需要 預設內容 可使用 `<slot />`

```html
<template>
    <slot> 空白時的預設內容 </slot>
</template>
```

- 父元件

```html
<template>
    <子元件> 要傳遞的內容 </子元件>
</template>
```

### 範例

- 父元件

```html
<script setup lang="ts">
import { ref } from 'vue';
import Child from './Components/Child.vue'

const name = ref('')

</script>

<template>
  <h1>slot - 插槽 - 簡單插槽</h1>
  <div>
    姓名：
    <input v-model="name" />
  </div>
  <Child>
    <p>你好，{{name}}</p>
  </Child>
</template>
```

- 子元件

```html
<template>
  <div>
    <slot />
  </div>
</template>
```

## 2. 進階用法：具名插槽 (多個插槽)

子元件 在 多個位置 設定插槽，並給予 `name` 屬性。

父元件 透過 `v-slot:` 設定 `子元件 插槽 的 name`，將內容 傳遞給 指定插槽。（`v-slot:` 可縮寫為 `#`）

![alt text](image/slot_02.png)

- 子元件
  
  > 不需要 預設內容 可使用 `<slot name="插槽名" />`

```html
<template>
    <slot name="插槽名A"> 空白時的預設內容 </slot>
    <slot name="插槽名B"> 空白時的預設內容 </slot>
</template>
```

- 父元件

```html
<template>
    <子元件 v-slot:插槽名A> 要傳遞的內容 </子元件>
    <子元件 #插槽名B> 要傳遞的內容 </子元件>
</template>
```

### 範例

- 父元件

```html
<script setup lang="ts">
import { ref } from 'vue';
import Child from './Components/Child.vue'

const header = ref('')
const main = ref('')
const footer = ref('')
</script>

<template>
  <h1>slot - 插槽 - 具名插槽</h1>
  <div>
    header 內容：
    <input v-model="header" />
  </div>
  <div>
    main 內容：
    <input v-model="main" />
  </div>
  <div>
    footer 內容：
    <input v-model="footer" />
  </div>
  <Child v-slot:header>
    <p>Header : {{ header }}</p>
  </Child>
  <Child #main>
    <p>Main : {{ main }}</p>
  </Child>
  <Child #footer>
    <p>Footer : {{ footer }}</p>
  </Child>
</template>
```

- 子元件

```html
<template>
  <slot name="header" />
  <slot name="main" />
  <slot name="footer" />
</template>
```