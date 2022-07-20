import request from '@/utils/request'

export const cityIdAPI = (name) => {
  return request({
    url: '/area/info',
    params: { name: name }
  })
}
export const communityAPI = (params) => {
  return request({
    url: '/area/community',
    params
  })
}
