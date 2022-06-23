import request from '@/utils/request'
// 用户组标签添加
export function labelAdd(data) {
  return request({
    url: '/api/admin/labelAdd',
    method: 'post',
    data
  })
}
// 用户组标签编辑
export function labelEdit(data) {
  return request({
    url: '/api/admin/labelEdit',
    method: 'post',
    data
  })
}
// 用户组标签删除
export function labelDelete(id) {
  return request({
    url: '/api/admin/labelDelete',
    method: 'get',
    params: { id }
  })
}
// 用户组标签详情
export function labelDetail(id) {
  return request({
    url: '/api/admin/labelDetail',
    method: 'get',
    params: { id }
  })
}
// 标签用户获取
export function labelUserList(data) {
  return request({
    url: '/api/admin/labelUserList',
    method: 'get',
    params: data
  })
}
// 标签用户获取
export function labelCompanyList(data) {
  return request({
    url: '/api/admin/labelViewCompanyList',
    method: 'get',
    params: data
  })
}
// 标签用户导出
export function labelUserExport(data) {
  return request({
    url: '/api/admin/labelUserExport',
    method: 'get',
    params: data
  })
}
// 标签用户删除
export function labelUserDelete(data) {
  return request({
    url: '/api/admin/labelUserDelete',
    method: 'get',
    params: data
  })
}
// 标签公司列表
export function labelAllCompanyList() {
  return request({
    url: '/api/admin/labelAllCompanyList',
    method: 'get'
  })
}
