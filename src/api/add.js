import request from '@/utils/request'

export const pubHouse = (data) => {
  return request({
    url: '/user/houses',
    method: 'POST',
    data
  })
}
// 发布房屋所需的条件
export const pubRequire = () => {
  return request({
    url: '/houses/params'
  })
}
// 上传图片
export const upImg = (formData) => {
  return request({
    url: '/houses/image',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
