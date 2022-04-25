const Mock = require('mockjs')

const List = []
const SanctionList = []
const UseList=[]
const BusinessList=[]
const ContactList=[]
const FaqList=[]
const NewsCenterList=[]
const VasList=[]
const userList=[]
const rolepremissionList=[]
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const thumb = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    category: '@pick(["react", "vue", "angular"])',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'unPublished'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    thumb,
    platforms: ['a-platform']
  }))
  SanctionList.push(Mock.mock({
    id: '@increment',
    commodityen: '@title(5, 10)',
    commodityzh: '@title(5, 10)',
    referencenumber: '@integer(1, 3)',
    type: 'Prohibited',
    remarkszh: 'mock data',
    remarksen: 'mock',
    'status|1': ['Active', 'Deactive']
  }))
  UseList.push(Mock.mock({
    id: '@increment',
    nameoflink: '@title(5, 10)',
    category: '@pick(["react", "vue", "angular"])',
    updatetime: '@datetime',
    file: '1.txt',
    reference: '@title(5, 10)',
  }))
  BusinessList.push(Mock.mock({
    id: '@increment',
    title: '@title(5, 10)',
    category: '@pick(["react", "vue", "angular"])',
    creator: 'Linda Wang',
    updatetime: '@datetime',
    'status|1': ['Published', 'Draft'],
  }))
  ContactList.push(Mock.mock({
    id: '@increment',
    region: 'Central China',
    office: 'Shanghai',
    dept: 'Customer Service',
    buinessscope: '进口/Import',
    trade: 'All Trade',
    accountname: 'DHL',
    contactperson: 'Linda WANG',
    dutydate: 'Monday, Tuesday, Wednesday, Thursday, Friday',
    dutytime: '09:00-18:00',
    phone: '021-82272458',
    email: 'shg,linwang@cma-cgm.com',
    'status|1': ['Deactive', 'Undeactive'],
  }))
  FaqList.push(Mock.mock({
    id: '@increment',
    question: 'How old are you?',
    keyword: 'How ,old',
    relatedquestion: '2,3',
    answer: 'Schedule Link',
    creator: 'Linda Wang',
    updatetime: '2022.03.07',
    'status|1': ['Deactive', 'Undeactive'],
  }))
  NewsCenterList.push(Mock.mock({
    id: '@increment',
    title: '@title(5, 10)',
    category: '@pick(["Business", "CSR", "Corporate Information"])',
    publishdate: '@datetime',
    link: 'https://www.baidu.com',
    'status|1': ['Published', 'Unpublished']
  }))
  VasList.push(Mock.mock({
     id: '@increment',
     title: '@title(5, 10)',
     publishdate: '@datetime',
     link: 'https://www.baidu.com',
     'status|1': ['Published', 'Unpublished']
  }))
  userList.push(Mock.mock({
    id: '@increment',
    name: '@title(2, 5)',
    email: 'test@cma-cgm.com',
    function: 'Administrator (Customer Service)',
    'status|1': ['Active', 'Deactive'],
  }))
  rolepremissionList.push(Mock.mock({
     id: '@increment',
     function: 'Administrator (Customer Service)',
     description: 'Chase',
     status: 'Active',
  }))
}
module.exports = [
  {
    url: '/wind-manager/article/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, size = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/userlist/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = userList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/rolepermission/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = rolepremissionList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/sanctions/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = SanctionList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/user/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = UseList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/business/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = BusinessList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/contact/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = ContactList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/faqmanager/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = FaqList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/newscenter/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = NewsCenterList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/vas/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = VasList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/user/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query

      let mockList = SanctionList.filter(item => {
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  },
  {
    url: '/wind-manager/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/wind-manager/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/wind-manager/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/wind-manager/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

