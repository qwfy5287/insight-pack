/**
 * 首字母大写
 * @param {String} source 源
 * @returns {String} result
 */
export function firstUpperCase(source) {
  return source.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

/**
 * 判断字符串是否为JSON字符串
 * @param {*} str
 */
export function isJSON(str) {
  if (typeof str == "string") {
    try {
      let obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else {
    console.error("It is not a string!");
    return false;
  }
}
