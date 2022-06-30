import Layout from '@/layout'

const analyticsRouter = {
  path: '/analytics',
  component: Layout,
  redirect: '/analytics/index',
  alwaysShow: true, // will always show the root menu
  name: 'Analytics Dashboard',
  meta: {
    title: 'analyticsdashboard',
    icon: 'chart'
  },
  children: [
    {
      path: '/UserAnalysis',
      component: () => import('@/views/analytics/behavior'),
      name: 'User Behavior Analysis',
      meta: {
        title: 'behavioranalysis'
      }
    },
    {
      path: '/UserStatistics',
      component: () => import('@/views/analytics/information'),
      name: 'User Statistics',
      meta: {
        title: 'userstatistics'
      }
    },
    {
      path: '/FaqEvalution',
      component: () => import('@/views/analytics/faqevalution'),
      name: 'FAQ Evaluation',
      meta: {
        title: 'faqevluation'
      }
    }
  ]
}

export default analyticsRouter
