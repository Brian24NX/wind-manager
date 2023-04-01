import request from '@/utils/request'

// 获取操作日志下拉菜单
export function operationTypeList() {
  return request({
    url: '/api/admin/operation/oprationNameList',
    method: 'get'
  })
}

// 获取操作日志导出
export function operationLogExport() {
  return request({
    url: '/api/admin/operation/logExport',
    method: 'get'
  })
}
