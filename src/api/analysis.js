import request from '@/utils/request'
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

//下载
export function analysisExport(dataes) {
  return request({
    url: '/api/admin/analysisExport',
    method: 'get',
    params: dataes
  })
}

//查询字典
export function dictItem(datas) {
  return request({
    url: '/api/admin/dictItem',
    method: 'get',
    params: datas
  })
}