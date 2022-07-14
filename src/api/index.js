import { login } from '@/api/login'
import { getUserInfo } from './my'
import { swipe } from './home'
import { collect } from './collect'
// 登录接口
export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const swipeAPI = swipe
export const collectAPI = collect
