/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const permissionRouter = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu
  name: 'Role and Permission Management',
  meta: {
    title: 'permission',
    icon: 'lock'
  },
  children: [
    {
      path: '/UserManagement',
      component: () => import('@/views/permission/user'),
      name: 'User Management',
      meta: {
        title: 'userManagement'
      }
    },
    {
      path: '/RolePermission',
      component: () => import('@/views/permission/role'),
      name: 'Role and Permission',
      meta: {
        title: 'rolePermission'
      }
    }
  ]
}

export default permissionRouter
