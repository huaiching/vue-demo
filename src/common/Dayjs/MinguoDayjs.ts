/**
 * 民國年支援套件（Vue 3 + Element Plus + Day.js）
 *
 * 主要特色：
 * 1. 輸入框顯示民國年格式：TTT/MM/DD → 114/12/27
 * 2. 手動輸入支援多種格式：114/12/27、1141227、1140101、14-01-01、140101 等
 * 3. 選擇器面板標頭顯示「114 年 12 月」
 * 4. 年份選擇面板顯示民國年：109 ~ 118
 * 5. v-model 綁定值仍為標準西元年字串（YYYY-MM-DD）
 */

import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { ElMessage } from 'element-plus'

const YEAR_BIAS = 1911  // 民國紀年與西元紀年的差值（1911）

// ========================================
// 1. 顯示插件：負責將 TTT 轉換為民國年顯示
// ========================================
const minguoEra = (option: any, dayjsClass: any) => {
  const prototype = dayjsClass.prototype
  const oldFormat = prototype.format  // 保存原始 format 方法

  // 覆寫 Day.js 的 format 方法
  prototype.format = function (formatStr: string) {
    // 將 format 中的 TTT 替換為實際民國年（三位補零）
    const result = formatStr.replace(/(\[[^\]]+\])|TTT/g, (match: string, bracket: string) => {
      if (bracket) return bracket  // 保留 [文字] 不變
      const minguoYear = this.$y - YEAR_BIAS  // this.$y 是 Day.js 內部儲存的西元年
      return String(minguoYear).padStart(3, '0')  // 補零至三位：114、015、005
    })
    // 其餘格式交給原始 format 處理
    return oldFormat.call(this, result)
  }
}

// ========================================
// 2. 解析插件：負責將使用者輸入的民國年轉換為 Day.js 可理解的西元年格式
//    支援：有分隔符、無分隔符、西元年輸入，並加入嚴格日期校驗
// ========================================
const minguoEraParse = (option: any, dayjsClass: any) => {
  const prototype = dayjsClass.prototype
  const oldParse = prototype.parse  // 保存原始 parse 方法

  prototype.parse = function (cfg: any) {
    let { date, args } = cfg

    // 基本驗證：無輸入或無格式時直接使用原生解析
    if (
      !date ||
      typeof date !== 'string' ||
      !args ||
      !args[1]
    ) {
      return oldParse.call(this, cfg)
    }

    const format: string = args[1].trim()

    // 只處理包含 TTT 的民國年格式，其他格式不干擾
    if (!format.includes('T')) {
      return oldParse.call(this, cfg)
    }

    let inputDate = date.trim()

    // ========================
    // Step 1: 處理各種輸入格式，統一轉為純數字字串（方便後續處理）
    // ========================
    let digitsOnly = inputDate.replace(/\D/g, '')  // 移除所有非數字

    // 年月格式補日為 01
    if (format === 'TTT/MM') {
      digitsOnly = digitsOnly + '01'
    }
    
    // 處理西元年輸入
    if (digitsOnly.length === 8) {
      const year = parseInt(digitsOnly.slice(0, 4), 10) - 1911
      const month = parseInt(digitsOnly.slice(4, 6), 10)
      const day = parseInt(digitsOnly.slice(6, 8), 10)
      digitsOnly = `${String(year).padStart(3, '0')}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`
    }

    // ========================
    // Step 2: 處理無分隔符純數字輸入（台灣最常見用法）
    //    6碼：民國2位年（如 140101 → 民國14年）
    //    7碼：民國3位年（如 1140101 → 民國114年）
    // ========================
    if (digitsOnly.length === 6 || digitsOnly.length === 7) {
      let minguoYearStr: string
      let monthStr: string
      let dayStr: string = ''

      if (digitsOnly.length === 6) {
        // 6碼：年2碼 + 月2碼 + 日2碼
        minguoYearStr = digitsOnly.slice(0, 2).padStart(3, '0')  // "14" → "014"
        monthStr = digitsOnly.slice(2, 4)
        dayStr = digitsOnly.slice(4, 6)
      } else {
        // 7碼：年3碼 + 月2碼 + 日2碼
        minguoYearStr = digitsOnly.slice(0, 3)
        monthStr = digitsOnly.slice(3, 5)
        dayStr = digitsOnly.slice(5, 7)
      }

      // ========================
      // Step 3: 嚴格日期校驗（使用外部 isValidDate 工具）
      // ========================
      const fullMinguoDateStr = `${minguoYearStr.padStart(3, '0')}${monthStr.padStart(2, '0')}${dayStr.padStart(2, '0')}`

      if (isValidDate(fullMinguoDateStr)) {
        // 日期合法 → 轉換為西元年格式供 Day.js 解析
        const gregorianYear = parseInt(minguoYearStr, 10) + YEAR_BIAS

        let gregorianFormatted: string
        let newFormat: string

        if (format.includes('DD')) {
          gregorianFormatted = `${gregorianYear}/${monthStr.padStart(2, '0')}/${dayStr.padStart(2, '0')}`
          newFormat = 'YYYY/MM/DD'
        } else {
          gregorianFormatted = `${gregorianYear}/${monthStr.padStart(2, '0')}`
          newFormat = 'YYYY/MM'
        }

        return oldParse.call(this, {
          ...cfg,
          date: gregorianFormatted,
          args: [gregorianFormatted, newFormat],
        })
      } else {
        // 日期無效（如 114/01/50、114/02/30）
        // 顯示錯誤訊息
        ElMessage.error('日期格式錯誤，請檢查年月日是否正確')

        return null
      }
    }
  }
}

// ========================================
// 3. 覆寫 year() 方法：讓面板標頭與年份選擇器顯示民國年
// ========================================
const overrideYearMethod = () => {
  const originalYear = dayjs.prototype.year

  dayjs.prototype.year = function (setter?: number) {
    if (typeof setter === 'number') {
      // 設定年份時：傳入民國年 → 轉西元儲存
      return originalYear.call(this, setter + YEAR_BIAS)
    }
    // 取年份時：返回民國年
    return originalYear.call(this) - YEAR_BIAS
  }
}

/**
 * 檢查傳入的年月日是否為合法日期
 * @param date 純數字字串（民國7位 或 西元8位）
 * @returns boolean
 */
export const isValidDate = (date: string): boolean => {
  let year = 0
  let month = 0
  let day = 0

  if (date.length === 8) {
    // 西元年
    year = parseInt(date.slice(0, 4), 10)
    month = parseInt(date.slice(4, 6), 10)
    day = parseInt(date.slice(6, 8), 10)
  } else if (date.length === 7) {
    // 民國年
    year = parseInt(date.slice(0, 3), 10) + YEAR_BIAS
    month = parseInt(date.slice(3, 5), 10)
    day = parseInt(date.slice(5, 7), 10)
  } else {
    return false
  }

  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false

  // 使用 dayjs 精準檢查該月實際天數（考慮閏年）
  const maxDay = dayjs(`${year}-${month}`, 'YYYY-M').daysInMonth()
  return day <= maxDay
}

// ========================================
// 輔助函數：跳脫正則特殊字元（用於處理分隔符 /）
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ========================================
// 初始化函數：專案啟動時呼叫
export function setupMinguoDayjs() {
  dayjs.locale('zh-tw')           // 設定繁體中文語系
  dayjs.extend(customParseFormat) // 啟用自訂格式解析

  // 套用插件
  dayjs.extend(minguoEra)         // 顯示民國年
  dayjs.extend(minguoEraParse)    // 解析民國年輸入

  // 讓面板顯示民國年
  overrideYearMethod()
}