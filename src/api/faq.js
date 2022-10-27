// // faq逻辑处理
import request from '@/utils/request'
export function faqList(params) {
  return request({
    url: '/api/admin/getFaqList',
    method: 'get',
    params
  })
}
// faq添加
export function faqAdd(data) {
  return request({
    url: '/api/admin/faqAdd',
    method: 'post',
    data
  })
}
// faq删除
export function faqDel(id) {
  return request({
    url: '/api/admin/faqDelete',
    method: 'get',
    params: { id }
  })
}
// faq问题修改
export function faqEdit(data) {
  return request({
    url: '/api/admin/faqEdit',
    method: 'post',
    data
  })
}
// faq问题修改
export function faqEditRelations(data) {
  return request({
    url: '/api/admin/faqRelationEdit',
    method: 'post',
    data
  })
}
// faq详情
export function faqDetail(params) {
  return request({
    url: '/api/admin/getFaqById',
    method: 'get',
    params
  })
}
// faq激活和不激活
export function faqActive(data) {
  return request({
    url: '/api/admin/faqActive',
    method: 'post',
    data
  })
}
// faq模板下载
export function faqTemplateDownload() {
  return request({
    url: '/api/admin/faqTemplateDownload',
    method: 'get'
  })
}
