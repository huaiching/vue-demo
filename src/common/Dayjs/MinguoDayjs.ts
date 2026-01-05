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
  const oldParse = prototype.parse

  prototype.parse = function (cfg: any) {
    const { date, args } = cfg

    // 空輸入，不處理
    if (
      !date ||
      date === null ||
      date === undefined ||
      typeof date !== 'string' ||
      date.trim() === '' ||
      !args ||
      !args[1]
    ) {
      return oldParse.call(this, cfg)
    }

    const format = args[1].trim()

    // 只處理含 T 的民國格式
    if (!format.includes('T')) {
      return oldParse.call(this, cfg)
    }

    const input = date.trim()

    // 提取純數字進行判斷
    let digitsOnly = input.replace(/\D/g, '')

    // 輸入西元年 轉換為 民國年
    if (format === 'TTT/MM/DD' && digitsOnly.length === 8) {
      const year = parseInt(digitsOnly.slice(0, 4), 10) - 1911
      const month = parseInt(digitsOnly.slice(4, 6), 10)
      const day = parseInt(digitsOnly.slice(6, 8), 10)
      digitsOnly = String(year).padStart(3, '0') + String(month).padStart(2, '0') + String(day).padStart(2, '0')
    }
    if (format === 'TTT/MM' && digitsOnly.length === 6) {
      const year = parseInt(digitsOnly.slice(0, 4), 10) - 1911
      const month = parseInt(digitsOnly.slice(4, 6), 10)
      digitsOnly = String(year).padStart(3, '0') + String(month).padStart(2, '0')
    }

    // 是否為年月格式（用於決定補日與輸出格式）
    const isMonthPicker = format.includes('TTT/MM') && !format.includes('DD')

    let targetDigits: string | null = null
    let isValidInput = false

    if (isMonthPicker) {
      // 年月選擇器：接受 5 位純數字（如 11412）
      if (digitsOnly.length === 5) {
        targetDigits = digitsOnly + '01'  // 補日為 01 → 變成 7 位處理
        isValidInput = true
      }
    } else {
      // 一般日期選擇器：接受 7 位純數字（如 1141231）
      if (digitsOnly.length === 7) {
        targetDigits = digitsOnly
        isValidInput = true
      }
    }

    // ===== 如果提取到正確長度的純數字，才進行解析 =====
    if (isValidInput && targetDigits) {
      const minguoYearStr = targetDigits.slice(0, 3)
      const monthStr = targetDigits.slice(3, 5)
      const dayStr = targetDigits.slice(5, 7)

      const fullMinguoStr = minguoYearStr + monthStr + dayStr

      if (isValidDate(fullMinguoStr)) {
        const gregorianYear = parseInt(minguoYearStr, 10) + YEAR_BIAS

        let gregorianDateStr: string
        let newFormat: string

        if (isMonthPicker) {
          gregorianDateStr = `${gregorianYear}/${monthStr}/01`
          newFormat = 'YYYY/MM'
        } else {
          gregorianDateStr = `${gregorianYear}/${monthStr}/${dayStr}`
          newFormat = 'YYYY/MM/DD'
        }

        return oldParse.call(this, {
          ...cfg,
          date: gregorianDateStr,
          args: [gregorianDateStr, newFormat],
        })
      } else {
        // ===== 日期無效：回傳 空白日期 =====
        this.$d = new Date(NaN)
        this.$invalid = true
        return this
      }
    }

    // 其他所有情況，一律不干涉
    return oldParse.call(this, cfg)
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