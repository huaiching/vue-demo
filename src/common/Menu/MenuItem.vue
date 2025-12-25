/**
 * 側邊選單的選單項目生成
 */
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
</script>

<template>
    <!-- 有 children → sub menu -->
    <el-sub-menu v-if="hasChildren" :index="fullPath">
        <template #title>
            <el-icon>
                <component :is="route.meta?.icon" />
            </el-icon>
            <span>{{ route.name }}</span>
        </template>

        <MenuItem v-for="child in route.children" :key="child.path" :route="child" :base-path="fullPath" />
    </el-sub-menu>

    <!-- 無 children → menu item -->
    <el-menu-item v-else :index="fullPath">
        <el-icon>
            <component :is="route.meta?.icon" />
        </el-icon>
        <span>{{ route.name }}</span>
    </el-menu-item>
</template>
