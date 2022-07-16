import request from '@/utils/request'

export const pubHouse = (data) => {
  return request({
    url: '/user/houses',
    method: 'POST',
    data
  })
}
