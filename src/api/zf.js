import request from '@/utils/request'
// 获取筛选房屋的条件
export const filtrateAPI = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}
