// Just a mock data

const constantRoutes = [
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
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
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
  }
]

const asyncRoutes = [
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/index',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'Permission',
        meta: {
          title: 'Permission',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'roleManager',
        meta: {
          title: 'roleManager',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        component: 'views/icons/index',
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },
  // {
  //   path: '/nested',
  //   component: 'layout/Layout',
  //   redirect: '/nested/menu1/menu1-1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: 'views/nested/menu1/index',
  //       name: 'Menu1',
  //       meta: { title: 'menu1' },
  //       redirect: '/nested/menu1/menu1-1',
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: 'views/nested/menu1/menu1-1',
  //           name: 'Menu1-1',
  //           meta: { title: 'menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: 'views/nested/menu1/menu1-2',
  //           name: 'Menu1-2',
  //           redirect: '/nested/menu1/menu1-2/menu1-2-1',
  //           meta: { title: 'menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: 'views/nested/menu1/menu1-2/menu1-2-1',
  //               name: 'Menu1-2-1',
  //               meta: { title: 'menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: 'views/nested/menu1/menu1-2/menu1-2-2',
  //               name: 'Menu1-2-2',
  //               meta: { title: 'menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: 'views/nested/menu1/menu1-3',
  //           name: 'Menu1-3',
  //           meta: { title: 'menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       name: 'Menu2',
  //       component: 'views/nested/menu2/index',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  {
    path: '/example',
    component: 'layout/Layout',
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: 'views/example/create',
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+',
        component: 'views/example/edit',
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: 'views/example/list',
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/zip',
    component: 'layout/Layout',
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: 'views/zip/index',
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
