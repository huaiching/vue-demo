<script setup>
import { RouterView, useRoute } from 'vue-router'
import { ref } from 'vue'
import router from './router'
import MenuItem from './util/MenuItem.vue'
import { Fold, Expand, Moon, Sunny } from '@element-plus/icons-vue'


const route = useRoute()

// 側邊欄收起狀態
const isCollapse = ref(false)

// 可顯示的 routes
const routesList = router.options.routes.filter(route => {
  return route.component || route.children?.length > 0
})

// 黑暗模式切換（使用 VueUse）
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark({
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'vue-notes-theme',  // 儲存到 localStorage，保持偏好
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- Header -->
      <el-header>
        <div class="header-content">
          <h1 class="title">Vue 學習筆記</h1>

          <!-- 縮放按鈕（在標題右邊） -->
          <el-button text @click="isCollapse = !isCollapse">
            <el-icon>
              <component :is="isCollapse ? Expand : Fold" />
            </el-icon>
          </el-button>
        </div>

        <!-- 黑暗模式切換按鈕（放在標題右邊） -->
          <el-button text @click="toggleDark()">
            <el-icon>
              <component :is="isDark ? Sunny : Moon" />
            </el-icon>
          </el-button>
      </el-header>

      <el-container>
        <!-- Side Menu -->
        <el-aside :width="isCollapse ? '64px' : '300px'">
          <el-menu router :collapse="isCollapse" :default-active="route.path" :collapse-transition="true">
            <MenuItem v-for="route in routesList" :key="route.path" :route="route" />
          </el-menu>
        </el-aside>

        <!-- Main -->
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  height: 100vh;
}

/* Header */
.el-header {
  color: #409eff;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 24px;
}

/* Aside */
.el-aside {
  transition: width 0.3s ease;
}

.el-menu {
  height: 100%;
  border-right: none;
}
</style>
