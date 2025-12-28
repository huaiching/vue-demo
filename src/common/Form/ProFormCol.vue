/**
 * 行布局：支援響應式布局，將 24 格布局 轉為 4 格布局 (預設 1 格)
 */
 <script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ColProps } from 'element-plus'

interface ProFormColProps { 
  /** 
   * 佔用欄位份數 (基於 4 欄系統: 1 份 = span 6)。
   * 可以是數字或響應式物件 { xs: 4, md: 2, lg: 1 }
   */
  colSize?: number | Partial<ColProps> 
  
  /** 完整的 el-col 屬性 (用於傳遞 offset, push 等) */
  colProps?: Partial<ColProps> 
}

const props = defineProps<ProFormColProps>() 
const attrs = useAttrs()

// 基礎轉換倍率：4 欄系統下，1 份 = 24 / 4 = 6
const GRID_MULTIPLIER = 6

/**
 * 將欄位份數轉換為 Element Plus 的 span 值
 */
const convertToSpan = (value: number): number => {
  if (value <= 0) return 24
  return value * GRID_MULTIPLIER
}

/**
 * 計算最終的 EL-COL 屬性
 */
const finalColProps = computed<ColProps>(() => {
  let outputProps: Record<string, any> = {}

  // 1. 處理 colSize 屬性 (優先級最高)
  if (props.colSize !== undefined) {
    // 處理字串轉數字的情況
    const colSizeValue = typeof props.colSize === 'string' 
      ? Number(props.colSize) 
      : props.colSize

    if (typeof colSizeValue === 'number' && !isNaN(colSizeValue)) {
      // 單純的數字值 - 設定基礎 span 和響應式斷點
      const baseSpan = convertToSpan(colSizeValue)
      
      // 設定響應式斷點：螢幕越小，佔用的欄位越多
      outputProps.span = baseSpan  // 預設值 (>=1920px)
      outputProps.xs = 24          // 手機 (<768px): 全寬
      outputProps.sm = baseSpan >= 12 ? 24 : 12  // 平板 (≥768px): 最多 2 欄
      outputProps.md = baseSpan    // 桌面 (≥992px): 使用原始值
      outputProps.lg = baseSpan    // 大桌面 (≥1200px): 使用原始值
      outputProps.xl = baseSpan    // 超大桌面 (≥1920px): 使用原始值
    } else if (typeof colSizeValue === 'object' && colSizeValue !== null) {
      // 響應式物件，例如 { xs: 4, md: 2, lg: 1 }
      for (const key in colSizeValue) {
        if (key in colSizeValue) {
          const value = colSizeValue[key as keyof ColProps]
          if (typeof value === 'number') {
            const sizeKey = key as keyof ColProps
            outputProps[sizeKey] = convertToSpan(value)
          }
        }
      }
    }
  }

  // 2. 合併 colProps，並明確排除 RWD 屬性（已由 colSize 處理）
  const { 
    span: _s1, 
    xs: _xs1, 
    sm: _sm1, 
    md: _md1, 
    lg: _lg1, 
    xl: _xl1, 
    ...restColProps 
  } = props.colProps || {}

  // 3. 合併透傳的 attrs，同樣排除 RWD 屬性
  const { 
    span: _s2, 
    xs: _xs2, 
    sm: _sm2, 
    md: _md2, 
    lg: _lg2, 
    xl: _xl2, 
    ...restAttrs 
  } = attrs

  // 4. 最終屬性合併 (優先級: colSize > colProps > attrs)
  return {
    ...restColProps,      // colProps 的其他屬性 (offset, push 等)
    ...(restAttrs as object), // 透傳的其他屬性
    ...outputProps,       // colSize 計算出的 span/RWD 屬性 (最高優先級)
  } as ColProps
})
</script>

<template>
  <el-col v-bind="finalColProps">
    <slot />
  </el-col>
</template>