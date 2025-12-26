import { ref } from 'vue'
import { defineStore } from 'pinia'

// 定義資料類型
export interface User {
  clientId: string
  name: string
  age: number
  address: string
  phone: string
}

export const useUserStore = defineStore('user', () => {
  // 資料初始化
  const user = ref<User>({
    clientId: '',
    name: '',
    age: 0,
    address: '',
    phone: ''
  })
  // setting
  const setUser = (newUser: User) => {
    user.value = newUser
  }
  // 初始化使用者資料方法
  const initUser = () => {
    user.value = {
      clientId: '',
      name: '',
      age: 0,
      address: '',
      phone: ''
    }
  }

  return {
    user,
    initUser,
    setUser
  }
})