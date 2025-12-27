<script setup lang="ts">
import ComFormCol from '@/common/Form/ComFormCol.vue';
import ComFormRow from '@/common/Form/ComFormRow.vue';


const navigateList = [
  {
    key: 'elementPlus',
    title: 'Element Plus UI 組件',
    desc: '各種 Element Plus 的 基本UI組件',
    url: 'https://element-plus.org/zh-CN/component/overview'
  },
  {
    key: 'elementIcom',
    title: 'Element Plus Icon',
    desc: 'Element 提供的各種圖示，方便在應用程式中使用',
    url: 'https://element-plus.org/zh-CN/component/icon'
  },
  {
    key: 'css',
    title: 'CSS 教學',
    desc: '包含 CSS 的基本用法 與 進階技巧',
    url: 'https://steam.oxxostudio.tw/category/css/index.html'
  },
  {
    key: 'JavaScript',
    title: 'JavaScript 教學',
    desc: '包含 JavaScript 用法教學 與 查詢網站',
    url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript'
  },
]

const handleOpenUrl = (url: string) => {
  window.open(url, '_blank');
};

const colSize = (4 / navigateList.length < 1) ? 1 : (4 / navigateList.length)
console.log('colSize', colSize)
</script>


<template>
  <com-form-row :gutter="16">
    <com-form-col v-for="navigate in navigateList" :key="navigate.key" :col-size="colSize">
      <el-card shadow="hover" class="navigate-card" @click="handleOpenUrl(navigate.url)">
        <template #header>
          <span style="font-size: 18px; font-weight: bold;">
            {{ navigate.title }}
          </span>
        </template>

        <div class="card-content">
          {{ navigate.desc }}
        </div>
      </el-card>
    </com-form-col>
  </com-form-row>

</template>

<style scoped>
.navigate-card {
  height: 150px;
  text-align: center;
}

.navigate-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(76, 88, 92, 0.747);
}
</style>