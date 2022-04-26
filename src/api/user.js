import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/wind-manager/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/wind-manager/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/wind-manager/user/logout',
    method: 'post'
  })
}
//远端登陆
// export function login(data){
//   return request({
//     url: '/api/admin/login',
//     method: 'post',
//     data
//   })
// }
//远端获取用户信息
// export function getInfo(id){
//   return request({
//     url: '/api/admin/userDetail',
//     method: 'get',
//     params:{id}
//   })
// }
//远端退出登陆
// export function logout(){
//   return request({
//     url: '/api/admin/logout',
//     method:'get'
//   })
// }
//远端发送邮箱验证码
// export function sendEmail(email){
//    return request({
//       url: '/api/admin/sendEmail',
//       method:'post',
//       params:{email}
//    })
// }
//后端重置密码
// export function resetPwd(data){
//    return request({
//       url: '/api/admin/resetPwd',
//       method: 'post',
//       data
//    })
// }