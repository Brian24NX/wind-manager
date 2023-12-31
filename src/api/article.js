import request from '@/utils/request'

// export function fetchList(query) {
//   return request({
//     url: '/wind-manager/article/list',
//     method: 'get',
//     params: query
//   })
// }

// export function fetchArticle(id) {
//   return request({
//     url: '/wind-manager/article/detail',
//     method: 'get',
//     params: { id }
//   })
// }

// export function fetchPv(pv) {
//   return request({
//     url: '/wind-manager/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

// export function createArticle(data) {
//   return request({
//     url: '/wind-manager/article/create',
//     method: 'post',
//     data
//   })
// }

// export function updateArticle(data) {
//   return request({
//     url: '/wind-manager/article/update',
//     method: 'post',
//     data
//   })
// }
// 文章远端导入
export function articleImport() {
  return request({
    url: '/api/admin/miniNewsImport',
    method: 'post'
  })
}
// 文章信息删除
export function articleDel(id) {
  return request({
    url: '/api/admin/newsDelete',
    method: 'get',
    params: {
      id
    }
  })
}
// 文章导出
export function articleExport(data) {
  return request({
    url: '/api/admin/miniNewsExport',
    method: 'get',
    params: data
  })
}
// 文章信息添加
export function articleAdd(data) {
  return request({
    url: '/api/admin/newsAdd',
    method: 'post',
    data
  })
}
// 文章修改
export function articleEdit(data) {
  return request({
    url: '/api/admin/newsEdit',
    method: 'post',
    data
  })
}
// 文章信息发布
export function articlePublish(data) {
  return request({
    url: '/api/admin/newsPublish',
    method: 'get',
    params: data
  })
}
// 文章信息获取详情
export function newsDetail(id) {
  return request({
    url: '/api/admin/newsDetail',
    method: 'get',
    params: { id }
  })
}
// 添加类别  type：1 小程序news center 2 business 3 useful 4 metail资源库 5 article
export function categoryAdd(data) {
  return request({
    url: '/api/admin/categoryAdd',
    method: 'post',
    data
  })
}
// 删除类别
export function categoryDel(id) {
  return request({
    url: '/api/admin/categoryDelete',
    method: 'get',
    params: { id }
  })
}
// 修改类别
export function categoryEdit(data) {
  return request({
    url: '/api/admin/categoryEdit',
    method: 'post',
    data
  })
}
// 类别列表
export function categoryList(type) {
  return request({
    url: '/api/admin/categoryList',
    method: 'get',
    params: {
      type
    }
  })
}
