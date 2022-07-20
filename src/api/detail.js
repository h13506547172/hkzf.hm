import request from '@/utils/request'

export const homeDel = (homeCode) => {
  return request({
    url: `/houses/${homeCode}`,
    method: 'GET'
  })
}
// 查看是否收藏
export const isShoucang = (homeCode) => {
  return request({
    url: `/user/favorites/${homeCode}`,
    method: 'GET'
  })
}
// 添加收藏
export const addShoucang = (homeCode) => {
  return request({
    url: `/user/favorites/${homeCode}`,
    method: 'POST'
  })
}
// 删除收藏
export const removeShoucang = (homeCode) => {
  return request({
    url: `/user/favorites/${homeCode}`,
    method: 'DELETE'
  })
}
