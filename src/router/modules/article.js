/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const articleRouter = {
  path: '/content',
  component: Layout,
  redirect: '/content/articlemanagement/articlelist',
  name: 'content',
  meta: {
    title: 'content',
    icon: 'documentation',
    affix: true
  },
  children: [{
    path: 'article',
    component: () => import('@/views/content/article/index'),
    name: 'Article Management',
    meta: {
      title: 'article'
    },
    redirect: '/content/article/articlelist',
    children: [{
      path: 'articlelist',
      component: () => import('@/views/content/article/article'),
      name: 'Article Management',
      meta: {
        title: 'article'
      }
    }, {
      path: 'addarticle',
      component: () => import('@/views/content/article/article/add'),
      name: 'Create A New Article',
      meta: {
        title: 'createarticle'
      }
    }, {
      path: 'newscenter',
      component: () => import('@/views/content/article/news'),
      name: 'News',
      meta: {
        title: 'newcenter'
      }
    }, {
      path: 'vas',
      component: () => import('@/views/content/article/vas/index'),
      name: 'CmaCgm',
      meta: {
        title: 'vas'
      }
    }]
  },
  {
    path: 'faq',
    component: () => import('@/views/content/faqmanagement'),
    name: 'FAQ Management',
    meta: {
      title: 'faq'
    }
  },
  {
    path: 'contact',
    component: () => import('@/views/content/contact'),
    name: 'Contact Information Matrix',
    meta: {
      title: 'contactinformation'
    }
  },
  {
    path: 'buiness',
    component: () => import('@/views/content/business'),
    name: 'Business & Operational Update',
    meta: {
      title: 'buiness'
    }
  },
  {
    path: 'userful',
    component: () => import('@/views/content/userful'),
    name: 'Useful Template and Link',
    meta: {
      title: 'useful'
    }
  },
  {
    path: 'sanctions',
    component: () => import('@/views/content/sanctions'),
    name: 'Sanctions and Commodity List',
    meta: {
      title: 'Sanctions'
    }
  },
  {
    path: 'material',
    component: () => import('@/views/content/material'),
    name: 'Material Library',
    meta: {
      title: 'material'
    }
  }]
}

export default articleRouter
