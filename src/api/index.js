import { login } from '@/api/login'
import { getUserInfo } from './my'
import { swipe } from './home'
import { collect } from './collect'
import { rent } from './rent'
import { homeDel, isShoucang, addShoucang, removeShoucang } from './detail'
import { pubHouse, pubRequire, upImg } from './add'
import { getCity, hotCity } from './city'
// 全部导入并导出
export * from './rentSearch'

// 登录接口
export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const swipeAPI = swipe
export const collectAPI = collect
export const rentAPI = rent
export const homeDelAPI = homeDel
export const pubHouseAPI = pubHouse
export const getCityAPI = getCity
export const hotCityAPI = hotCity
export const isShoucangAPI = isShoucang
export const addShoucangAPI = addShoucang
export const removeShoucangAPI = removeShoucang
export const pubRequireAPI = pubRequire
export const upImgAPI = upImg
