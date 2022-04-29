import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/wind-manager/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/wind-manager/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/wind-manager/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/wind-manager/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/wind-manager/role/${id}`,
    method: 'delete'
  })
}

// //远端角色导出
// export function roleExport(data){
//    return request({
//       url: '/api/admin/roleExport',
//       method: 'get',
//       data
//    })
// }
// //远端角色添加
// export function roleAdd(data){
//    return request({
//       url: '/api/admin/roleAdd',
//       method: 'post',
//       data
//    })
// }
// //远端角色删除
// export function roleDel(id){
//   return request({
//       url: '/api/admin/roleDelete',
//       method: 'get',
//       params:{id}
//   })
// }
// //远端角色修改
// export function roleEdit(data){
//    return request({
//       url: '/api/admin/roleEdit',
//       method: 'post',
//       data
//    })
// }
