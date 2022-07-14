import request from '@/utils/request'

export const swipe = () => {
  return request({
    url: '/home/swiper',
    method: 'GET'
  })
}
