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
