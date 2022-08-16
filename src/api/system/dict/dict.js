import request from '@/utils/request'

// 数据字典
export function dictItem(dictName) {
  return request({
    url: '/api/admin/dictItem',
    method: 'get',
    params: { dictName }
  })
}
