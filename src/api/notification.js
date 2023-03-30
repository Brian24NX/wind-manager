import request from '@/utils/request'

// 获取通知类型列表
export function notifyTypeList() {
  return request({
    url: '/api/admin/notify/typeList',
    method: 'get'
  })
}

// 获取通知状态列表
export function notifyStatusList() {
  return request({
    url: '/api/admin/notify/statusList',
    method: 'get'
  })
}

// 获取通知详情
export function notifyDetail(id) {
  return request({
    url: '/api/admin/notify/info',
    method: 'get',
    params: id
  })
}
