// // faq逻辑处理
import request from '@/utils/request'
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
// faq激活和不激活
export function faqActive(data) {
  return request({
    url: '/api/admin/faqActive',
    method: 'get',
    params: data
  })
}
// faq模版下载
export function faqTemplateDownload() {
  return request({
    url: '/api/admin/faqTemplateDownload',
    method: 'get'
  })
}