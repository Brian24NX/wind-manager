// // new center逻辑处理
// import request from '@/utils/request'
// // 消息添加
// export function newsAdd(data) {
//   return request({
//     url: '/api/admin/newsAdd',
//     method: 'post',
//     data
//   })
// }
// // 消息删除
// export function newsDel(id){
//   return request({
//     url: '/api/admin/newsDelete',
//     method: 'get',
//     params:{id}
//   })
// }
// //  消息修改
// export function newsEdit(data){
//   return request({
//      url: '/api/admin/newsEdit',
//      method: 'post',
//      data
//   })
// }
// // 消息发布
// export function newsPublish(data){
//   return request({
//      url: '/api/admin/newsPublish',
//      method: 'get',
//      params:data
//   })
// }