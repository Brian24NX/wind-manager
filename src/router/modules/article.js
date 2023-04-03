/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const articleRouter = {
  path: '/content',
  component: Layout,
  redirect: '/articlelist',
  name: 'Content Management',
  meta: {
    title: 'contentManager',
    icon: 'documentation',
    affix: true
  },
  children: [{
    path: '/articlemanagement',
    component: () => import('@/views/content/article/index'),
    name: 'Article Management',
    meta: {
      title: 'articleManager'
    },
    redirect: '/articlelist',
    children: [{
      path: '/articlelist',
      component: () => import('@/views/content/article/article'),
      name: 'Article List',
      meta: {
        title: 'articleManagers'
      }
    }, {
      path: '/addarticle',
      component: () => import('@/views/content/article/article/add'),
      name: 'Create A New Article',
      meta: {
        title: 'createArticle'
      }
    }, {
      path: '/newscenter',
      component: () => import('@/views/content/article/news'),
      name: 'Mini-Program News Center',
      meta: {
        title: 'newsCenter'
      }
    }, {
      path: '/vas',
      component: () => import('@/views/content/article/vas/index'),
      name: 'Mini-Program CMA CGM+',
      meta: {
        title: 'cmaCgm'
      }
    }]
  },
  {
    path: '/faq',
    component: () => import('@/views/content/faqmanagement'),
    name: 'FAQ Management',
    meta: {
      title: 'faqManagement'
    }
  },
  {
    path: '/contact',
    component: () => import('@/views/content/contact'),
    name: 'Contact Information Matrix',
    meta: {
      title: 'contactInformation'
    }
  },
  {
    path: '/buiness',
    component: () => import('@/views/content/business'),
    name: 'Business and Operational Update',
    meta: {
      title: 'businessOperationalUpdate'
    }
  },
  {
    path: '/operationLog',
    component: () => import('@/views/content/operationLog'),
    name: 'OperationLog Management',
    meta: {
      title: 'operationLog'
    }
  },
  {
    path: '/userful',
    component: () => import('@/views/content/userful'),
    name: 'Template and Link',
    meta: {
      title: 'usefulTemplateAndLink'
    }
  },
  {
    path: '/sanctions',
    component: () => import('@/views/content/sanctions'),
    name: 'Sanctions and Commodity List',
    meta: {
      title: 'sanctionsAndCommodityList'
    }
  },
  {
    path: '/material',
    component: () => import('@/views/content/material'),
    name: 'Material Library',
    meta: {
      title: 'materialLibrary'
    }
  },
  {
    path: '/video',
    component: () => import('@/views/content/videoMaterial'),
    name: 'Video Library',
    meta: {
      title: 'videoLibrary'
    }
  }
  ]
}

export default articleRouter
