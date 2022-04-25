// Just a mock data

const constantRoutes = [
 
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
 
]

const asyncRoutes = [
 
  {
    path: '/content',
    component: 'layout/Layout',
    redirect: '/content/articlemanagement/articlelist',
    name: 'content',
    meta: {
      title: 'content',
      icon: 'documentation',
      affix: true
    },
    children: [{
      path: 'articlemanagement',
      component: 'views/content/article/index',
      name: 'Article Management',
      meta: {
        title: 'article'
      },
      redirect: '/content/articlemanagement/articlelist',
      children: [{
        path: 'articlelist',
        component: 'views/content/article/index',
        name: 'Article Management',
        meta: {
          title: 'article'
        }
      }, {
        path: 'addarticle',
        component: 'views/content/article/add',
        name: 'Create A New Article',
        meta: {
          title: 'createarticle'
        }
      }, {
        path: 'newscenter',
        component: 'views/content/article/new',
        name: 'Mini-Program News Center',
        meta: {
          title: 'newcenter'
        }
      }, {
        path: 'vas',
        component: 'views/content/article/vas',
        name: 'Mini-Program Vas',
        meta: {
          title: 'vas'
        }
      }]
    },
    {
      path: 'faq',
      component:'views/content/faqmanagement',
      name: 'FAQ Management',
      meta: {
        title: 'faq'
      }
    },
    {
      path: 'contact',
      component: 'views/content/contact',
      name: 'Contact Information Matrix',
      meta: {
        title: 'contactinformation'
      }
    },
    {
      path: 'buiness',
      component: 'views/content/business',
      name: 'Business & Operational Update',
      meta: {
        title: 'buiness'
      }
    },
    {
      path: 'userful',
      component: 'views/content/userful',
      name: 'Useful Template and Link',
      meta: {
        title: 'useful'
      }
    },
    {
      path: 'sanctions',
      component: 'views/content/sanctions',
      name: 'Sanctions and Commodity List',
      meta: {
        title: 'Sanctions'
      }
    },
    {
      path: 'material',
      component: 'views/content/material',
      name: 'Material Library',
      meta: {
        title: 'material'
      }
    }]
  },
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock',
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'Permission',
        meta: {
          title: 'Permission'
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'roleManager',
        meta: {
          title: 'roleManager'
        }
      }
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
