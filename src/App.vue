<script setup>
import { RouterView, useRoute } from 'vue-router'
import { ref } from 'vue'
import router from './router'
import MenuItem from './util/MenuItem.vue'
import { Fold, Expand } from '@element-plus/icons-vue'

const route = useRoute()

// 側邊欄收起狀態
const isCollapse = ref(false)

// 可顯示的 routes
const routesList = router.options.routes.filter(route => {
  return route.component || route.children?.length > 0
})
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
      </el-header>

      <el-container>
        <!-- Side Menu -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
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
  background-color: white;
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
  font-size: 18px;
}

/* Aside */
.el-aside {
  background-color: #f0f2f5;
  transition: width 0.3s ease;
}

.el-menu {
  height: 100%;
  border-right: none;
}
</style>
