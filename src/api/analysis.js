import request from '@/utils/request'

// 分析总和
export function analysisTotal(data) {
  return request({
    url: '/api/admin/analysisTotal',
    method: 'get',
    params: data
  })
}

// 分析列表
export function analysisList(data) {
  return request({
    url: '/api/admin/analysisList',
    method: 'get',
    params: data
  })
}

// 分析列表分页
export function analysisPageList(data) {
  return request({
    url: '/api/admin/analysisPageList',
    method: 'get',
    params: data
  })
}

// 下载
export function analysisExport(data) {
  return request({
    url: '/api/admin/analysisExport',
    method: 'get',
    params: data
  })
}

// 查询字典
export function dictItem(data) {
  return request({
    url: '/api/admin/dictItem',
    method: 'get',
    params: data
  })
}
