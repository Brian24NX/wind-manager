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
    path:'/contentmanagement',
    component:'layout/Layout',
    name:'Content Management',
    meta:{title: 'Content Management', icon: 'document', affix: true},
    children:[
      {
        path:'/articlemanagement',
        component:()=>import('@/views/content/index'),
        name:'Article Management',
        meta:{title:'Article Management'},
        children:[{
           path:'/addarticle',
           component:()=>import('@/views/content/add/index'),
           name:'Create A New Article',
           meta:{title:'Create A New Article'}
        },{
           path:'/addnewscenter',
           component:()=>import('@/views/content/add/new'),
           name:'Mini-Program News Center',
           mata:{title:'Mini-Program News Center'}
        },{
           path:'/vas',
           component:()=>import('@/views/content/add/vas'),
           name:'Mini-Program Vas',
           meta:{title:'Mini-Program Vas'}
        }]
      },
      {
        path:'/faq',
        component:()=>import('@/views/content/faqmanagement'),
        name:'FAQ Management',
        meta:{title:'FAQ Management'}
      },
      {
        path:'/contact',
        component:()=>import('@/views/content/contact'),
        name:'Contact Information Matrix',
        meta:{title:'Contact Information Matrix'}
      },
      {
        path:'/buiness',
        component:()=>import('@/views/content/business'),
        name:'Business & Operational Update',
        meta:{title:'Business & Operational Update'}
      },
      {
        path:'/userful',
        component:()=>import('@/views/content/userful'),
        name:'Useful Template and Link',
        meta:{title:'Useful Template and Link'}
      },
      {
        path:'/sanctions',
        component:()=>import('@/views/content/sanctions'),
        name:'Sanctions and Commodity List',
        meta:{title:'Sanctions and Commodity List'}
      },
      {
        path:'/material',
        component:()=>import('@/views/content/material'),
        name:'Material Library',
        meta:{title:'Material Library'}
      }
    ]
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
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
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
        path: 'edit/:id(\\d+)',
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
