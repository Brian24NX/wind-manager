import request from '@/utils/request'

export function userExport(data) {
  return request({
    url: '/api/admin/miniUserExport', // 假地址 自行替换
    method: 'get',
    params: data
  })
}
