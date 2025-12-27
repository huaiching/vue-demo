/**
 * 民國年日期工具（Vue 3 + Element Plus 版）
 * 支援：
 *   - 民國年：1140101、114/01/01、114-01-01、140101、50101
 *   - 西元年：20250101、2025/01/01
 *   - 自動補零與嚴格驗證
 */

import dayjs, { Dayjs } from 'dayjs'
import { ElMessage } from 'element-plus'

const YEAR_BIAS = 1911

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

/**
 * 將民國年日期字串轉換為 Dayjs 物件（年月日）
 * @param input 輸入字串，例如：1140101、114/01/01、20250101
 * @returns Dayjs | null
 */
export const parseRocDate = (input: string): Dayjs | null => {
  if (!input || typeof input !== 'string') {
    return null
  }

  // 移除所有非數字
  let value = input.replace(/\D/g, '')

  // 西元年轉民國年格式（方便統一處理）
  if (value.length === 8) {
    const gregorianYear = parseInt(value.slice(0, 4), 10)
    const minguoYear = gregorianYear - YEAR_BIAS
    value = String(minguoYear).padStart(3, '0') + value.slice(4)
  }

  // 補零到 7 位：1140101
  if (value.length === 6) {
    value = '0' + value   // 140101 → 0140101
  } else if (value.length === 5) {
    value = '00' + value  // 50101 → 0050101
  } else if (value.length !== 7) {
    ElMessage.error('日期格式錯誤，請輸入正確的民國或西元年月日')
    return null
  }

  // 嚴格驗證日期是否合法（含閏年）
  if (!isValidDate(value)) {
    ElMessage.error('日期不存在，請檢查年月日是否正確')
    return null
  }

  // 轉為 TTT/MM/DD 格式讓 dayjs 搭配 minguoEra 插件解析
  const dateStr = `${value.slice(0, 3)}/${value.slice(3, 5)}/${value.slice(5, 7)}`

  const date = dayjs(dateStr, 'TTT/MM/DD')

  return date.isValid() ? date : null
}

/**
 * 將民國年月字串轉換為 Dayjs 物件（年月）
 * @param input 輸入字串，例如：11401、114/01、202501
 * @returns Dayjs | null
 */
export const parseRocDateMonth = (input: string): Dayjs | null => {
  if (!input || typeof input !== 'string') {
    return null
  }

  let value = input.replace(/\D/g, '')

  // 西元年轉民國
  if (value.length === 6) {
    const gregorianYear = parseInt(value.slice(0, 4), 10)
    const minguoYear = gregorianYear - YEAR_BIAS
    value = String(minguoYear).padStart(3, '0') + value.slice(4)
  }

  // 補零到 5 位：11401
  if (value.length === 4) {
    value = '0' + value   // 1401 → 01401
  } else if (value.length === 3) {
    value = '00' + value  // 501 → 00501
  } else if (value.length !== 5) {
    ElMessage.error('年月格式錯誤，請輸入正確的民國或西元年月')
    return null
  }

  const month = parseInt(value.slice(3, 5), 10)
  if (month < 1 || month > 12) {
    ElMessage.error('月份必須在 1 ~ 12 之間')
    return null
  }

  const dateStr = `${value.slice(0, 3)}/${value.slice(3, 5)}`

  const date = dayjs(dateStr, 'TTT/MM')

  return date.isValid() ? date : null
}