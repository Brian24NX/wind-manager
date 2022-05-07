import request from '@/utils/request'

// 远端角色导出
export function roleExport(data) {
  return request({
    url: '/api/admin/roleExport',
    method: 'get',
    data
  })
}
// 远端角色添加
export function roleAdd(data) {
  return request({
    url: '/api/admin/roleAdd',
    method: 'post',
    data
  })
}
// 远端角色删除
export function roleDel(id) {
  return request({
    url: '/api/admin/roleDelete',
    method: 'get',
    params: { id }
  })
}
// 远端角色修改
export function roleEdit(data) {
  return request({
    url: '/api/admin/roleEdit',
    method: 'post',
    data
  })
}
// 角色字典修改
export function roleDict() {
  return request({
    url: '/api/admin/roleDict',
    methods: 'get'
  })
}
