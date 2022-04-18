import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/wind-manager/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/wind-manager/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/wind-manager/user/logout',
    method: 'post'
  })
}
