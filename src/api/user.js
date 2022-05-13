import request from '@/utils/request'

// 远端登陆
export function login(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}
// 远端获取用户信息
export function getInfo(id) {
  return request({
    url: '/api/admin/userDetail',
    method: 'get',
    params: {
      id
    }
  })
}
// 远端退出登陆
export function logout() {
  return request({
    url: '/api/admin/logout',
    method: 'get'
  })
}
// 远端发送邮箱验证码
export function sendEmail(data) {
  return request({
    url: '/api/admin/sendEmail',
    method: 'post',
    data
  })
}
// 远端重置密码
export function resetPwd(data) {
  return request({
    url: '/api/admin/resetPwd',
    method: 'post',
    data
  })
}
// 远端用户添加
export function userAdd(data) {
  return request({
    url: '/api/admin/userAdd',
    method: 'post',
    data
  })
}
// 远端用户修改
export function userEdit(data) {
  return request({
    url: '/api/admin/userEdit',
    method: 'post',
    data
  })
}
// 远端用户激活
export function userActive(data) {
  return request({
    url: '/api/admin/userActive',
    method: 'get',
    params: data
  })
}
// 远端用户导出
export function userExport(data) {
  return request({
    url: '/api/admin/userExport',
    method: 'get',
    params: data
  })
}
// 文件上传
export function fileExport(file) {
  return request({
    url: '/api/admin/uploadFile',
    data: {
      file
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
