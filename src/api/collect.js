import request from '@/utils/request'

export const collect = () => {
  return request({
    url: '/user/favorites',
    method: 'GET'
  })
}
