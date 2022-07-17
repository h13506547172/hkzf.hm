import request from '@/utils/request'

export const homeDel = (homeCode) => {
  return request({
    url: `/houses/${homeCode}`,
    method: 'GET'
  })
}
export const shoucang = (homeCode) => {
  return request({
    url: `/user/favorites/${homeCode}`,
    method: 'POST'
  })
}
