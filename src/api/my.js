import request from '@/utils/request'

export const getUserInfo = (data) => {
  return request({
    url: '/user',
    method: 'GET'
  })
}
