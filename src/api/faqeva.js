import request from '@/utils/request'

//faqEva列表
export function faqEvaList(data) {
  return request({
    url: '/api/admin/faqEvaList',
    method: 'get',
    params: data
  })
}

//饼图数据
export function faqEvaTotal(data) {
  return request({
    url: '/api/admin/faqEvaTotal',
    method: 'get',
    params: data
  })
}

//下载
export function faqEvaExport(data) {
  return request({
    url: '/api/admin/faqEvaExport',
    method: 'get',
    params: data
  })
}
