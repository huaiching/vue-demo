import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import { setupMinguoDayjs } from './common/Plougins/MinguoDayjs'
setupMinguoDayjs()

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.use(ElementPlus, { locale: zhTw })

app.mount('#app')
app.config.globalProperties.$dayjs = dayjs