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
    url: '/api/admin/templateEdit',
    method: 'post',
    data
  })
}
// 删除模版
export function templateDelete(id) {
  return request({
    url: '/api/admin/templateDelete',
    method: 'GET',
    params: { id }
  })
}
// 模版下载
export function usefulTemplateDownload() {
  return request({
    url: '/api/admin/usefulTemplateDownload',
    method: 'get'
  })
}
