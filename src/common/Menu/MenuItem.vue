<script setup>
import { computed } from 'vue'

const props = defineProps({
    route: {
        type: Object,
        required: true
    },
    basePath: {
        type: String,
        default: ''
    }
})

const fullPath = computed(() => {
    if (!props.basePath) return props.route.path
    return `${props.basePath}/${props.route.path}`.replace(/\/+/g, '/')
})

const hasChildren = computed(() => {
    return props.route.children && props.route.children.length > 0
})

const hasName = computed(() => {
    return props.route.name && props.route.name.toString().trim() !== ''
})
</script>

<template>
    <!-- 有 children 且有 name 才顯示子選單 -->
    <el-sub-menu v-if="hasChildren && hasName" :index="fullPath">
        <template #title>
            <el-icon>
                <component :is="route.meta?.icon" />
            </el-icon>
            <span>{{ route.name }}</span>
        </template>

        <MenuItem 
            v-for="child in route.children" 
            :key="child.path" 
            :route="child" 
            :base-path="fullPath" 
        />
    </el-sub-menu>

    <!-- 無 children 但有 name 才顯示選單項目 -->
    <el-menu-item v-else-if="!hasChildren && hasName" :index="fullPath">
        <el-icon>
            <component :is="route.meta?.icon" />
        </el-icon>
        <span>{{ route.name }}</span>
    </el-menu-item>

    <!-- 如果沒有 name，什麼都不渲染 -->
</template>