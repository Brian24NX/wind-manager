import request from '@/utils/request'
// 添加模版
export function templateAdd(data) {
  return request({
    url: '/api/admin/templateAdd',
    method: 'post',
    data
  })
}
// 修改模版
export function templateEdit(data) {
  return request({
    url: '/api/admin/templateAdd',
    method: 'post',
    data
  })
}
// 删除模版
export function templateDelete(id) {
  return request({
    url: '/api/admin/templateAdd',
    method: 'GET',
    params: { id }
  })
}
