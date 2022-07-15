// 封装本地存储模块

// 存值
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 取值
export const getItem = (key) => {
  // 如果不能转换为对象，则表示不是JSON字符串
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

// 删除值
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
