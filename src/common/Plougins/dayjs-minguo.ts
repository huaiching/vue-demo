/**
 * 完整民國年支援套件（Vue + Element Plus + Day.js）
 * 效果 100% 等同於你 React + AntD 的 MliDatePicker
 *
 * 特色：
 * 1. 輸入框顯示 TTT/MM/DD → 114/12/27
 * 2. 手動輸入支援 114/12/27、14-01-01、5/5/5 等
 * 3. 選擇器面板標頭顯示「114 年 12 月」
 * 4. 年份選擇面板顯示 109 ~ 118 等民國年
 * 5. v-model 仍是標準西元年（安全）
 */

import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import customParseFormat from 'dayjs/plugin/customParseFormat'

const YEAR_BIAS = 1911

// ========================================
// 1. 顯示插件：支援 format="TTT/MM/DD"
const minguoEra = (_o: any, c: any) => {
  const prototype = c.prototype
  const oldFormat = prototype.format

  prototype.format = function (formatStr: string) {
    const result = formatStr.replace(/(\[[^\]]+\])|TTT/g, (match: string, bracket: string) => {
      if (bracket) return bracket
      const minguoYear = this.$y - YEAR_BIAS
      return String(minguoYear).padStart(3, '0')  // 114、015、005
    })
    return oldFormat.call(this, result)
  }
}

// ========================================
// 2. 解析插件：支援輸入民國年（已修正 TypeScript 安全）
const minguoEraParse = (_o: any, c: any) => {
  const prototype = c.prototype
  const oldParse = prototype.parse

  prototype.parse = function (cfg: any) {
    const { date, args } = cfg

    if (
      !date ||
      typeof date !== 'string' ||
      date.length < 3 ||
      !args ||
      !args[1]
    ) {
      return oldParse.call(this, cfg)
    }

    const format: string = args[1]
    const regex = /(\[[^\]]+\])|T{1,3}([-/])?/g
    const match = regex.exec(format)

    if (!match) {
      return oldParse.call(this, cfg)
    }

    let inputDate = date
    const index = match.index
    let charAtdate: string
    let endIndex: number

    if (match[2]) {
      // 有分隔符：TTT-MM-DD 或 TTT/MM/DD
      const separator = match[2]
      const beforeLength = format.substring(0, index).length
      const afterBefore = date.substring(beforeLength)
      const tttWithSepRegex = new RegExp(`(\\d{1,3})${escapeRegExp(separator)}`)
      const sepMatch = tttWithSepRegex.exec(afterBefore)

      if (!sepMatch || !sepMatch[1]) {
        return oldParse.call(this, cfg)
      }

      charAtdate = sepMatch[1]
      endIndex = beforeLength + charAtdate.length
    } else {
      // 無分隔符：嚴格按 TTT 長度取
      endIndex = index + match[0].length
      charAtdate = date.substring(index, endIndex)

      if (!/^\d+$/.test(charAtdate)) {
        return oldParse.call(this, cfg)
      }
    }

    const num = parseInt(charAtdate, 10)
    if (isNaN(num)) {
      return oldParse.call(this, cfg)
    }

    const gregorianYear = num + YEAR_BIAS
    const newYearStr = gregorianYear.toString()

    inputDate = inputDate.substring(0, index) + newYearStr + inputDate.substring(endIndex)

    const newFormat = format.replace(regex, 'YYYY')

    return oldParse.call(this, {
      ...cfg,
      date: inputDate,
      args: [inputDate, newFormat],
    })
  }
}

// ========================================
// 3. 覆寫 year() 方法
// Element Plus 面板標頭與年份表直接用 dayjs().year() 取值
// 覆寫後，所有地方都會自動變成民國年
const overrideYearMethod = () => {
  const originalYear = dayjs.prototype.year

  dayjs.prototype.year = function (setter?: number) {
    if (typeof setter === 'number') {
      // 設定年份時（內部很少用，但保險起見）
      // 傳入的是民國年 → 轉西元儲存
      return originalYear.call(this, setter + YEAR_BIAS)
    }
    // 取年份時 → 返回民國年
    return originalYear.call(this) - YEAR_BIAS
  }
}

// ========================================
// 輔助：跳脫正則特殊字元
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ========================================
// 匯出初始化函數
export function setupMinguoDayjs() {
  dayjs.locale('zh-tw')
  dayjs.extend(customParseFormat)

  // 套用原版插件（TTT 格式顯示與解析）
  dayjs.extend(minguoEra)
  dayjs.extend(minguoEraParse)

  // 【關鍵】覆寫 year()，讓面板標頭與年份選擇器顯示民國年
  overrideYearMethod()
}