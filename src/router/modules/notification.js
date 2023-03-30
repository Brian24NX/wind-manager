import Layout from '@/layout'

const notificationRouter = {
  path: '/notification',
  component: Layout,
  redirect: '/notification/index',
  alwaysShow: true, // will always show the root menu
  name: 'Notification Record',
  meta: {
    title: 'notification',
    icon: 'el-icon-message-solid'
  },
  children: [
    {
      path: '/notification/index',
      component: () => import('@/views/notification/index'),
      name: 'Notification Record',
      meta: {
        title: 'notification'
      }
    }
  ]
}

export default notificationRouter
