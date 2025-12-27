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
import { isValidDate } from './rocDateUtils'  // 自訂日期校驗工具
import { ElMessage } from 'element-plus'

const YEAR_BIAS = 1911  // 民國紀年與西元紀年的差值（1911）

// ========================================
// 1. 顯示插件：負責將 TTT 轉換為民國年顯示
// ========================================
const minguoEra = (_o: any, c: any) => {
  const prototype = c.prototype
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
const minguoEraParse = (_o: any, c: any) => {
  const prototype = c.prototype
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

    // 處理西元年輸入（如 20250101 → 轉為民國格式 1140101）
    if (format === 'TTT/MM/DD' && digitsOnly.length === 8) {
      const year = parseInt(inputDate.slice(0, 4), 10) - 1911
      const month = parseInt(inputDate.slice(4, 6), 10)
      const day = parseInt(inputDate.slice(6, 8), 10)
      digitsOnly = `${String(year).padStart(3, '0')}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`
    }

    // 處理西元年輸入 + 年月格式補日為 01（如輸入 202501 → 轉為 1140101）
    if (format === 'TTT/MM' && digitsOnly.length === 6) {
      const year = parseInt(inputDate.slice(0, 4), 10) - 1911
      const month = parseInt(inputDate.slice(4, 6), 10)
      digitsOnly = `${String(year).padStart(3, '0')}${String(month).padStart(2, '0')}01`
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

      const minguoYear = parseInt(minguoYearStr, 10)
      const month = parseInt(monthStr, 10)
      const day = dayStr ? parseInt(dayStr, 10) : 1  // 年月格式無日時預設為1日

      // ========================
      // Step 3: 嚴格日期校驗（使用外部 isValidDate 工具）
      // ========================
      const fullMinguoDateStr = `${minguoYearStr.padStart(3, '0')}${monthStr.padStart(2, '0')}${dayStr.padStart(2, '0')}`

      if (isValidDate(fullMinguoDateStr)) {
        // 日期合法 → 轉換為西元年格式供 Day.js 解析
        const gregorianYear = minguoYear + YEAR_BIAS

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
        // 顯示錯誤訊息，並讓 Element Plus 顯示紅框
        let newFormat: string = format.includes('DD') ? 'YYYY/MM/DD' : 'YYYY/MM'
        ElMessage.error('日期格式錯誤，請輸入正確的民國或西元年月日')

        return oldParse.call(this, {
          ...cfg,
          date: null,  // 強制無效，讓元件顯示錯誤狀態
          args: [null, newFormat],
        })
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