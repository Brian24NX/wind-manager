// contact逻辑处理
import request from '@/utils/request'
//  联系信息添加
export function contactAdd(data) {
  return request({
    url: '/api/admin/contactInfoAdd',
    method: 'post',
    data
  })
}
// 联系信息删除
export function contactDel(id) {
  return request({
    url: '/api/admin/contactInfoDelete',
    method: 'get',
    params: { id }
  })
}
// 联系信息编辑
export function contactEdit(data) {
  return request({
    url: '/api/admin/contactInfoEdit',
    method: 'post',
    data
  })
}
// 联系信息激活
export function contactActive(data) {
  return request({
    url: '/api/admin/contactInfoActive',
    method: 'get',
    params: data
  })
}
// 数据字典
export function dictItem(dictName) {
  return request({
    url: '/api/admin/dictItem',
    method: 'get',
    params: { dictName }
  })
}
// 获取联动list
export function BusinessList(regionKey) {
  return request({
    url: '/api/admin/officeList',
    method: 'get',
    params: { regionKey }
  })
}
// 联动业务
export function BusinessTypeList(data) {
  return request({
    url: '/api/admin/businessTypeList',
    method: 'get',
    params: data
  })
}
// 获取联系信息模板
export function contactTemplateDownload() {
  return request({
    url: '/api/admin/contactTemplateDownload',
    method: 'get'
  })
}
