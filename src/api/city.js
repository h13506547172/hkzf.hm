import request from '@/utils/request'

export const getCity = (params) => {
  return request({
    url: '/area/city',
    params
  })
}
// 热门城市
export const hotCity = () => {
  return request({
    url: '/area/hot'
  })
}
