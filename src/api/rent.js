import request from '@/utils/request'

export const rent = () => {
  return request({
    url: '/user/houses',
    method: 'GET'
  })
}
