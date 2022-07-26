import request from '@/utils/request'
// 添加模板
export function templateAdd(data) {
  return request({
    url: '/api/admin/templateAdd',
    method: 'post',
    data
  })
}
// 修改模板
export function templateEdit(data) {
  return request({
    url: '/api/admin/templateEdit',
    method: 'post',
    data
  })
}
// 删除模板
export function templateDelete(id) {
  return request({
    url: '/api/admin/templateDelete',
    method: 'GET',
    params: { id }
  })
}
// 模板下载
export function usefulTemplateDownload() {
  return request({
    url: '/api/admin/usefulTemplateDownload',
    method: 'get'
  })
}
