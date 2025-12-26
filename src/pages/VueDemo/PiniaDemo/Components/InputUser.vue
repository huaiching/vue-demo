<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore, type User } from '../Pinia/UserStore'

const userData = ref<User>({
  clientId: '',
  name: '',
  age: 0,
  address: '',
  phone: ''
})
const store = useUserStore()

const save = () => {
  store.setUser(userData.value)
  alert('資料已儲存！')
}

const reset = () => {
  userData.value = {
    clientId: '',
    name: '',
    age: 0,
    address: '',
    phone: ''
  }
  store.initUser()
}
</script>

<template>
  <h2>輸入使用者資料</h2>
  <form @submit.prevent="save">
    <label>
      客戶證號:
      <input v-model="userData.clientId" required />
    </label>
    <br /><br />
    <label>
      姓　　名:
      <input v-model="userData.name" required />
    </label>
    <br /><br />
    <label>
      年　　齡:
      <input type="number" v-model.number="userData.age" required />
    </label>
    <br /><br />
    <label>
      地　　址:
      <input v-model="userData.address" required />
    </label>
    <br /><br />
    <label>
      電　　話:
      <input v-model="userData.phone" required />
    </label>
    <br /><br />
    <button type="submit">儲存資料</button>
    <button type="button" @click="reset" style="margin-left: 10px;">重置</button>
  </form>
</template>