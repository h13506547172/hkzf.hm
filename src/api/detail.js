import request from '@/utils/request'

export const homeDel = (homeCode) => {
  return request({
    url: `/houses/${homeCode}`,
    method: 'GET'
  })
}
