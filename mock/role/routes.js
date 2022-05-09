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
  }

]

const asyncRoutes = [
  // 文章管理
  {
    path: '/content',
    component: 'layout/Layout',
    redirect: '/content/articlemanagement/articlelist',
    name: 'contentManager',
    meta: {
      title: 'contentManager',
      icon: 'documentation',
      affix: true
    },
    children: [{
      path: 'articlemanagement',
      component: 'views/content/article/index',
      name: 'Article Management',
      meta: {
        title: 'articleManager'
      },
      redirect: '/content/articlemanagement/articlelist',
      children: [{
        path: 'articlelist',
        component: 'views/content/article/index',
        name: 'Article Management',
        meta: {
          title: 'articleManager'
        }
      }, {
        path: 'addarticle',
        component: 'views/content/article/add',
        name: 'Create A New Article',
        meta: {
          title: 'createArticle'
        }
      }, {
        path: 'newscenter',
        component: 'views/content/article/new',
        name: 'Mini-Program News Center',
        meta: {
          title: 'newsCenter'
        }
      }, {
        path: 'vas',
        component: 'views/content/article/vas',
        name: 'Mini-Program Vas',
        meta: {
          title: 'cmaCgm'
        }
      }]
    },
    {
      path: 'faq',
      component: 'views/content/faqmanagement',
      name: 'FAQ Management',
      meta: {
        title: 'faqManagement'
      }
    },
    {
      path: 'contact',
      component: 'views/content/contact',
      name: 'Contact Information Matrix',
      meta: {
        title: 'contactInformation'
      }
    },
    {
      path: 'buiness',
      component: 'views/content/business',
      name: 'Business & Operational Update',
      meta: {
        title: 'businessOperationalUpdate'
      }
    },
    {
      path: 'userful',
      component: 'views/content/userful',
      name: 'Useful Template and Link',
      meta: {
        title: 'usefulTemplateAndLink'
      }
    },
    {
      path: 'sanctions',
      component: 'views/content/sanctions',
      name: 'Sanctions and Commodity List',
      meta: {
        title: 'sanctionsAndCommodityList'
      }
    },
    {
      path: 'material',
      component: 'views/content/material',
      name: 'Material Library',
      meta: {
        title: 'materialLibrary'
      }
    }]
  },
  // 权限管理
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock'
    },
    children: [
      {
        path: 'UserManagement',
        component: 'views/permission/page',
        name: 'UserManagement',
        meta: {
          title: 'userManagement'
        }
      },
      {
        path: 'RolePermission',
        component: 'views/permission/role',
        name: 'Role & Permission',
        meta: {
          title: 'rolePermission'
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
