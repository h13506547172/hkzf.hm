import request from '@/utils/request'
// 查询本地区的value信息
export const cityIdAPI = (name) => {
  return request({
    url: '/area/info',
    params: { name: name }
  })
}
// 查询房源的经纬度信息
export const getMapAPI = (id) => {
  return request({
    url: '/area/map',
    params: {
      id // 地区code
    }
  })
}

// 房屋具体信息
export const homeDelAPI = (cityId) => {
  return request({
    url: '/houses',
    params: {
      cityId
    }
  })
}
