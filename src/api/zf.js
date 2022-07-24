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

// 筛选房屋
export const filterHouseAPI = (
  cityId,
  stat,
  end,
  area,
  rentType,
  price,
  more
) => {
  return request({
    url: '/houses',
    params: {
      cityId,
      stat,
      end,
      area,
      rentType,
      price,
      more
    }
  })
}
