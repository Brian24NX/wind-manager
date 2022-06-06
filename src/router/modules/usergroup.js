import Layout from '@/layout'

const usergroupRouter = {
  path: '/usergroup',
  component: Layout,
  redirect: '/usergroup/index',
  alwaysShow: true, // will always show the root menu
  name: 'User and User Group',
  meta: {
    title: 'usergroup',
    icon: 'peoples'
  },
  children: [
    {
      path: '/Programuser',
      component: () => import('@/views/usergroup/index'),
      name: 'Mini-program User',
      meta: {
        title: 'programuser'
      }
    },
    {
      path: '/LabelManagement',
      component: () => import('@/views/usergroup/label'),
      name: 'Label Management',
      meta: {
        title: 'labelManagement'
      }
    }
  ]
}

export default usergroupRouter
