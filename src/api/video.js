// 视频
import request from '@/utils/request'
// 添加
export function videoAdd(data) {
  return request({
    url: '/api/admin/videoLibraryAdd',
    method: 'post',
    data
  })
}
export function videoEdit(data) {
  return request({
    url: '/api/admin/videoLibraryEdit',
    method: 'post',
    data
  })
}
// 删除
export function videoDel(id) {
  return request({
    url: '/api/admin/videoLibraryDelete',
    method: 'get',
    params: { id }
  })
}
// 发布
export function videoPublish(data) {
  return request({
    url: '/api/admin/videoLibraryPublish',
    method: 'get',
    params: data
  })
}

// 发布
export function videoTopFlag(data) {
  return request({
    url: '/api/admin/videoLibraryTopFlag',
    method: 'get',
    params: data
  })
}
