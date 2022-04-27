// // contact逻辑处理
// import request from '@/utils/request'
// //  联系信息添加
// export function contactAdd(data){
//     return request({
//       url: '/api/admin/contactInfoAdd',
//       method : 'post',
//       data
//     })
// }
// // 联系信息删除
// export function contactDel(id){
//     return request({
//       url: '/api/admin/contactInfoDelete',
//       method: 'get',
//       params:{id}
//     })
// }
// // 联系信息编辑
// export function contactEdit(data){
//     return request({
//       url: '/api/admin/contactInfoEdit',
//       method: 'get',
//       params:data
//     })
// }
// //联系信息激活
// export function contactActive(data){
//     return request({
//       url: '/api/admin/contactInfoActive',
//       method: 'get',
//       params:data
//     })
// }