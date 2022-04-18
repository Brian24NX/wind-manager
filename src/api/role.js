import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/wind-manager/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/wind-manager/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/wind-manager/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/wind-manager/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/wind-manager/role/${id}`,
    method: 'delete'
  })
}
