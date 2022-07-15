import { login } from '@/api/login'
import { getUserInfo } from './my'
import { swipe } from './home'
import { collect } from './collect'
import { rent } from './rent'
import { homeDel } from './detail'

// 登录接口
export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const swipeAPI = swipe
export const collectAPI = collect
export const rentAPI = rent
export const homeDelAPI = homeDel
