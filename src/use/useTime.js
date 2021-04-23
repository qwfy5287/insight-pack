import { formatTime as ft, parseTime as pt } from 'insight-pack/src/common/time.common'

/**
 * use Time
 * @returns
 */
export const useTime = () => {
  /**
   *
   * @param {*} time
   * @param {*} option
   * @returns
   */
  const formatTime = (time, option) => {
    return ft(time, option)
  }

  /**
   *
   * @param {*} time
   * @param {*} option
   * @returns
   */
  const parseTime = (time, option) => {
    return pt(time, option)
  }

  return {
    formatTime,
    parseTime,
  }
}
