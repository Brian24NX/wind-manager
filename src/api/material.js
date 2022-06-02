import request from '@/utils/request'
// 获取资源库列表
export function materialList(data) {
  return request({
    url: '/api/admin/materialList',
    method: 'get',
    params: data
  })
}
// 删除资源库图片
export function materialDelete(data) {
  return request({
    url: '/api/admin/materialDelete',
    method: 'post',
    data
  })
}
// 改变类型
export function materialChange(data) {
  return request({
    url: '/api/admin/changeMaterialCategory',
    method: 'post',
    data
  })
}
// 修改资源库名称
export function materialRename(data) {
  return request({
    url: '/api/admin/renameMaterial',
    method: 'get',
    params: data
  })
}

