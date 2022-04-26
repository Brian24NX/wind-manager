export default {
  // 路由翻译
  route: {
    dashboard: '首页',
    permission: '角色和权限管理',
    userManagement: '用户管理',
    rolePermission: '角色和权限管理',
    contentManager: '内容管理',
    articleManager: '文章管理',
    createArticle: '创建文章',
    newsCenter: '新闻中心',
    cmaCgm: 'CMA CGM+',
    faqManagement: 'FAQ管理',
    contactInformation: '联系信息',
    businessOperationalUpdate: '服务信息',
    usefulTemplateAndLink: '模版链接',
    sanctionsAndCommodityList: '管制品',
    materialLibrary: '素材库',
  },
  // navbar翻译
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小'
  },
  // 忘记密码页面翻译
  forgetForm: {
    email: '邮箱',
    forgotpassword: '忘记密码',
    identi: '验证',
    tip: '忘记密码了?',
    tips: '请填写邮件以获得您新的密码',
    safe: '安全',
    safedetailone: '填写您的邮箱地址并点击"收到验证安全码"',
    safedetailtwo: '为了保护您的账号安全，我们将会发送验证码至您的邮箱中。',
    safedetailthree: '在此页填入验证码并重设您的新密码。',
    sendcode: '发送验证码',
    cancel: '取消',
    require: '请填写所有信息',
    requiresix: '请填写至少6个字符',
    requirerule: '密码必须包含至少1个数字，1个大写字母和1个小写字母。',
    verifycode: '验证码',
    password: '新密码',
    confirmpassword: '确认新密码',
    resetpasssuccess: '重置密码成功',
    verifyerror: '验证码错误',
    passwordconsistent: '密码不一致',
    terms: '法律条款',
    yes: '确定'
  },
  // 登陆翻译
  login: {
    title: '登录',
    logIn: '登录',
    username: '邮箱',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！',
    forgetpassword: '忘记密码？'
  },
  // 权限页面翻译
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  // 文章相关
  article: {
    thumb: '封面图',
    title: '标题',
    date: '日期',
    category: '分类',
    platform: '发布平台',
    status: '状态',
    actions: '操作'
  },
  message: {
    detail: '查看',
    edit: '编辑',
    delete: '删除',
    publish: '发布',
    unPublish: '撤回'
  },
  addArticle: {
    pageTitle: '添加新推文',
    title: '标题',
    creator: '作者',
    forntCover: '封面图',
    description: '描述',
    content: '内容',
    orginalArticleLink: '原文链接',
    publishTo: '发布到',
    category: '分类',
    schedulePublish: '是否定时发布',
    scheduleTime: '定时发布时间',
    sendTo: '发送到',
    submit: '保存',
    reset: '重置'
  },
  publishTo: {
    newsCenter: '小程序新闻中心',
    CMACGM: '小程序 CMA CGM+',
    weChatAccount: '微信公众号'
  },
  // 资源库页面翻译
  library:{
    title: '素材库',
    allselect: '全选',
    category: '更改类别',
    delete: '删除',
    upload: '上传',
    categorysetting: '分类设置',
    addcategory: '添加新闻类别'
  },
  // 管制品
  sanctions:{
    commodityzh: '商品（中文）',
    commodityen:  '商品（英文）',
    referencenumber: '参考编号',
    remarkszh: '中文备注',
    remarksen: '英文备注',
    type: '类型',
    import: '导入',
    export: '导出',
    newitem: '添加新管制品'
  },
  // 用户模版
  userful:{
    name: '文档或链接名',
    category: '类别',
    document: '文档/链接',
    reference: '内部参考',
    edit: '编辑',
    delete: '删除',
    categoryset: '类别设置',
    import: '导入',
    additem:  '添加',
    download: '下载',
  },
  // 业务和运营
  business:{
    id: '序号',
    title: '通知标题',
    category: '类别',
    creator: '作者',
    updatetime: '更新时间',
    status: '状态',
    buinessupdate: '业务更新',
    categoryset: '类别设置',
    sendnotification: '添加通知',
    deltitle: '是否确认删除该通知？',
    content: '文章',
    uploadfile: '上传文件'
  },
  // 联系信息
  contact:{
    id: '序号',
    region: '区域',
    office: '办事处',
    dept: '部门',
    buinessscope: '业务范围',
    trade: '航线',
    accountname: '客户名称',
    contactperson: '联系人',
    dutydate: '值班日期',
    dutytime: '值班时间',
    phone: '电话',
    email: '邮箱',
    import: '导入',
    createinfo: '新建值班信息',
    deactive: '禁用',
    active: '启用'
  },
  // FAQ管理
  faq:{
    id: '序号',
    question: '问题',
    keyword: '关键词',
    relatedquestion: '关联问题',
    answer: '答案',
    creator: '作者',
    updatetime: '更新时间',
    status: '状态',
    import: '导入',
    createinfo: '添加FAQ',
    deactive: '禁用',
    active: '启用',
    export: '导出',
    deltitle: '是否确认删除该 FAQ ？',
  },
  //  新闻中心
  newscenter:{
     categorysetting: '新闻分类配置',
     export: '导出',
     import: '导入',
     addhistoynews:'添加历史新闻',
     title: '新闻标题',
     category: '类别名称',
     publishdate: '发布日期',
     link: '链接',
     status: '状态',
     addtitle: '添加历史新闻',
     deltitle: '是否确认删除该文章？',
     del:'删除',
     categoryen: '种类英文',
     categoryzh:  '种类中文',
     creator: '作者'
  },
  // CMA CGM
  vas:{
     addarticlelink: '以链接形式添加文章',
     title: '标题',
     publishdate: '发布日期',
     link: '链接',
     status: '状态',
     deltitle: '是否确认删除该文章？',
     addtitle: '以链接形式添加增值服务介绍'
  },
  // 角色和权限
  userrole:{
    name: '姓名',
    email: '邮箱地址',
    function: '角色与部门',
    status: '状态',
    viewedit: '查看并编辑角色',
    active: '启用',
    deactive: '禁用',
    import: '导入',
    export: '导出',
    newuser: '添加新用户',
    id: '序号',
    description: '描述',
    viewuser: '查看已启用用户',
    editpremission: '编辑权限',
    addemployee: '添加员工',
    addnewfunction: '创建新角色',
    remove: '移除',
    deltitle: '请确认是否要删除该角色？'
  }
}
