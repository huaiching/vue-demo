# el-from 表單頁面

## formRef 資料儲存物件

formRef 是 Element Plus 在操作表單 (el-form) 的資料儲存物件。

**宣告：**

```ts
const formRef = ref<FormInstance>()
```

**常用方法：**

取得資料

```ts
// 假設 form 有欄位 email
// 要取得 email 欄位資料可用
const email = formRef.email
```

修改資料

```ts
// 假設 form 有欄位 email
// 要修改 email 欄位資料可用
form.email = 'abc@abc.com'
```

`validate()`：驗證整張表單

```ts
try {
    await formRef.value?.validate()
    // 驗證成功
  } catch {
    // 驗證失敗
  }
```

`validateField()`：驗證指定欄位

```ts
try {
    formRef.value?.validateField(['email', 'password'])
    // 驗證成功
  } catch {
    // 驗證失敗
  }
```

`resetFields()`：重設表單

```ts
const reset = () => {
    formRef.value?.resetFields()
}
```

## el-form 表單介紹

> 官網連結：https://element-plus.org/zh-CN/component/form

el-form 需要事先準備以下幾個關鍵資料：

**formRef（表單實例引用）**

> **作用**：取得 `<el-form>` 的實例物件，用來手動觸發驗證、重置表單、取得欄位值等操作。

```ts
const formRef = ref<FormInstance>()
```

|方法|說明|
|-|-|
|formRef.value|取得欄位資料|
|formRef.value?.validate()|驗證整個表單|
|formRef.value?.validateField(['欄位'])|驗證指定欄位|
|formRef.value?.resetFields()|重置表單|

**form（表單資料物件）**

> **作用**：儲存表單所有欄位的值，並作為 <el-form> 的 :model 綁定來源。

```ts
const form = reactive({
  email: '',      // 對應 el-form-item 的 prop="email"
  address: '',    // 對應 el-form-item 的 prop="address"
  // 其他欄位...
})
```

**rules（驗證規則）**

> **作用**：定義每個欄位的驗證條件（如必填、Email 格式、長度等）。

```ts
const rules: FormRules = {
  email: [
    { required: true, message: '請輸入 Email', trigger: 'blur' },
    { type: 'email', message: 'Email 格式不正確', trigger: 'blur' }
  ],
  address: [
    { required: true, message: '請輸入地址', trigger: 'change' }
  ]
  // 其他欄位...
}
```

|屬性|類型|說明|
|-|-|-|
|required|boolean|是否必填|
|message|string|驗證失敗時的錯誤訊息|
|trigger|string \ string[]|觸發驗證的時機 <br/> - `blur`：離開輸入框 <br/> - `change`：值改變|
|type|string|內建類型驗證 <br/> `email`、`string`、`number`、`boolean`、`array`、`object`、`date`、`url`、`integer`|
|min / max|number|字串/數字/陣列長度範圍|
|pattern|RegExp|自訂正則表達式|
|validator|(rule, value, callback) => void|自訂驗證函式 <br/> `成功`：callback() <br/> `失敗`：callback(new Error('錯誤訊息'))|

**el-form 常用屬性：**

> 表單的全局設定 
-  `ref`、`:model`、`:rules` 格式詳見範例。


|必填|屬性|類型|預設值|說明|
|---|---|---|---|---|
|O|ref|FormInstance|-|表單實例引用|
|O|:model|Object|-|表單資料物件|
|O|:rules|FormRules|-|驗證規則物件|
|-|label-position|left / right / top|right|標籤位置，top = 上下排列|
|-|label-width|String / Number|-|標籤寬度（如 '100px' 或 'auto'）|
|-|size|large / default / small|default|表單元件大小|
|-|disabled|Boolean|false|是否禁用|


**el-form-item 常用屬性：**
> 表單的欄位標題設定

|必填|屬性|類型|預設值|說明|
|---|---|---|---|---|
|O|prop|String|-|對應 :model 中的欄位名稱，用來綁定驗證規則|
|O|label|String|-|標籤文字|
|-|required|Boolean|false|是否為必填欄位|
|-|:rules|FormRules|-|驗證規則物件 (可覆蓋全局設定)|

**el 表單元件 常用屬性：**
> 介紹 `el-input`、`el-select` 這類 表單元件 共用的屬性

|必填|屬性|類型|預設值|說明|
|---|---|---|---|---|
|O|v-model|String / Number|-|雙向綁定值（表單資料來源）|
|-|placeholder|String|-|提示文字|
|-|disabled|Boolean|false|是否禁用|
|-|readonly|Boolean|false|是否唯讀 (維持輸入樣式，但不可輸入資料)|

## 範例

> `ProBreadcrumb`、`ProFormFooter`、`ProFormRow`、`ProFormCol` 為自製元件。
> `ProFormRow` 於 `template` 會變成 `pro-form-row` (此為 vue 特性)

```html
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import PromBreadcrumb from '@/common/Field/ProBreadcrumb.vue'
import ProFormFooter from '@/common/Field/ProFormFooter.vue'
import ProFormRow from '@/common/Form/ProFormRow.vue'
import ProFormCol from '@/common/Form/ProFormCol.vue'

// form 實例
const formRef = ref<FormInstance>()

// 表單資料
const form = reactive({
  email: '',
  address: ''
})

// 驗證規則
const rules: FormRules = {
  email: [
    { required: true, message: '請輸入 Email', trigger: 'blur' },
    {
      type: 'email',
      message: 'Email 格式不正確',
      trigger: 'blur'
    }
  ]
}

// 送出
const submit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      alert('Email 驗證通過：' + form.email)
    }
  })
}
</script>

<template>
  <pro-breadcrumb />
  <el-form ref="formRef" :model="form" :rules="rules" label-position="top" label-width="auto" >
    <pro-form-row>
      <pro-form-col :col-size=1>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="請輸入 Email" />
        </el-form-item>
      </pro-form-col>
      <pro-form-col :col-size=1>
        <el-form-item label="地址" prop="address" >
          <el-input v-model="form.address" placeholder="請輸入 地址" />
        </el-form-item>
      </pro-form-col>
    </pro-form-row>

    <pro-form-footer>
      <el-button type="primary" @click="submit">
        送出
      </el-button>
    </pro-form-footer>
  </el-form>
</template>
```