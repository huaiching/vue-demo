<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import ComFormBreadcrumb from '@/common/Field/ComFormBreadcrumb.vue'
import ComFormFooter from '@/common/Field/ComFormFooter.vue'
import ComFormRow from '@/common/Form/ComFormRow.vue'
import ComFormCol from '@/common/Form/ComFormCol.vue'

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
  <com-form-breadcrumb />
  <el-form ref="formRef" :model="form" :rules="rules" label-position="top" label-width="auto" >
    <com-form-row>
      <com-form-col :col-size=1>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="請輸入 Email" />
        </el-form-item>
      </com-form-col>
      <com-form-col :col-size=1>
        <el-form-item label="地址" prop="address" >
          <el-input v-model="form.address" placeholder="請輸入 地址" />
        </el-form-item>
      </com-form-col>
    </com-form-row>

    <com-form-footer>
      <el-button type="primary" @click="submit">
        送出
      </el-button>
    </com-form-footer>
  </el-form>
</template>
