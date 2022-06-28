export default {
  remindMessage: {
    expired: '登录已过期，请重新登录',
    success: '操作成功'
  },
  notFound: {
    message: '网站管理员说你不能进入这个页面。',
    desc: '请检查您输入的网址是否正确，或点击下面的按钮返回主页。',
    back: '返回主页'
  },
  // 路由翻译
  route: {
    dashboard: '首页',
    permission: '角色与权限管理',
    userManagement: '用户管理',
    rolePermission: '角色与权限管理',
    contentManager: '内容管理',
    articleManager: '文章管理',
    createArticle: '创建文章',
    newsCenter: '新闻中心',
    cmaCgm: 'CMA CGM+',
    faqManagement: 'FAQ管理',
    contactInformation: '联系信息',
    businessOperationalUpdate: '服务信息',
    usefulTemplateAndLink: '模版与链接',
    sanctionsAndCommodityList: '管制品',
    materialLibrary: '素材库',
    usergroup: '用户与用户组',
    programuser: '小程序用户',
    labelManagement: '标签管理',
    analyticsdashboard: '分析看板',
    behavioranalysis: '用户行为分析',
    userstatistics: '用户数据分析',
    faqevluation: 'FAQ评估'
  },
  // navbar翻译
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    changePass: '修改密码',
    theme: '换肤',
    size: '布局大小',
    delcatetitle: '是否确认删除该类别？'
  },
  // 忘记密码页面翻译
  forgetForm: {
    email: '电子邮箱',
    forgotpassword: '忘记密码',
    identi: '验证',
    tip: '忘记密码了?',
    tips: '请填写邮件以获得您新的密码',
    safe: '安全',
    safedetailone: '填写您的邮箱地址并点击"收到验证安全码"。',
    safedetailtwo: '为了保护您的账号安全，我们将会发送验证码至您的邮箱中。',
    safedetailthree: '在此页填入验证码并重设您的新密码。',
    sendcode: '发送验证码',
    cancel: '取消',
    require: '请填写所有信息。',
    requiresix: '请填写至少6个字符。',
    requirerule: '密码必须为包含至少1个数字，1个大写字母和1个小写字母，长度至少6~20位。',
    verifycode: '验证码',
    password: '新密码',
    confirmpassword: '确认新密码',
    resetpasssuccess: '重置密码成功',
    verifyerror: '验证码错误',
    passwordconsistent: '两次输入密码不一致',
    terms: '法律条款',
    yes: '确定',
    emailtips: '邮箱格式不正确',
    oldPasswordtips: '旧密码不能为空',
    passwordtips: '密码不能为空',
    newPasswordtips: '新密码不能为空',
    confirmpasswordtips: '确认密码不能为空',
    verifycodetips: '验证码不能为空',
    emailrequired: '邮箱不能为空',
    namerequired: '用户名不能为空',
    functionrequired: '角色不能为空',
    oldPass: '旧密码',
    changeTitle: '修改密码'
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
    forgetpassword: '忘记密码？',
    usernametips: '邮箱格式不正确',
    passwordtips: '密码必填或者低于6位长度'
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
  general: {
    choose: '请选择',
    input: '请输入',
    search: '搜索',
    reset: '重置',
    startTime: '开始时间',
    endTime: '结束时间',
    chooseDate: '选择日期',
    upload: '将文件拖到此处，',
    uploadTips: '或点击上传',
    add: '新增',
    edit: '编辑'
  },
  // 文章相关
  article: {
    thumb: '封面图',
    title: '标题',
    date: '发布日期',
    category: '分类',
    platform: '发布平台',
    status: '状态',
    actions: '操作',
    deltitle: '请确认是否要删除该文章？'
  },
  message: {
    index: '序号',
    detail: '详情',
    edit: '编辑',
    delete: '删除',
    publish: '发布',
    unPublish: '撤回',
    download: '下载模版',
    save: '保存',
    search: '搜索',
    reset: '重置',
    update: '修改',
    createTime: '创建时间'
  },
  addArticle: {
    pageTitle: '添加新文章',
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
    save: '保存',
    submit: '保存并发布',
    addnew: '添加新文章',
    titletips: '文章名称必填',
    titlelengthtips: '长度在 3 到 100 个字符',
    creatortips: '作者必填',
    creatorlengthtips: '长度在 3 到 100 个字符',
    frontCovertips: '封面图必填',
    contenttips: '内容必填',
    publishIdstips: '发布范围必填',
    publishDatetips: '定时发布时间必填'
  },
  publishTo: {
    newsCenter: '小程序新闻中心',
    CMACGM: '小程序 CMA CGM+',
    weChatAccount: '微信公众号'
  },
  // 资源库页面翻译
  library: {
    title: '素材库',
    allselect: '全选',
    category: '更改类别',
    delete: '删除',
    upload: '上传',
    categorysetting: '添加分类',
    addcategory: '添加新闻类别',
    name: '名称',
    titleRequire: '文件名称必填'
  },
  // 管制品
  sanctions: {
    keyword: '商品名称',
    commodityzh: '商品（中文）',
    commodityen: '商品（英文）',
    referencenumber: '编码',
    remarkszh: '中文备注',
    remarksen: '英文备注',
    type: '类型',
    import: '导入',
    export: '导出',
    newitem: '添加管制品',
    editItem: '编辑管制品',
    deltitle: '是否确认删除该管制品记录？',
    commodityzhtips: '商品（中文）必填',
    commodityentips: '商品（英文）必填',
    remarksentips: '备注（英文）必填',
    remarkszhtips: '备注（中文）必填'
  },
  // 用户模版
  userful: {
    name: '文档或链接',
    category: '类别',
    document: '文档/链接',
    reference: '内部参考',
    edit: '编辑',
    delete: '删除',
    categoryset: '类别设置',
    import: '导入',
    additem: '添加文档或链接',
    export: '导出',
    link: '链接',
    uploadfile: '选择文件',
    type: '类型',
    deltitle: '是否确认删除该模板或链接？',
    nametips: '文档或者链接必填',
    categoryIdtips: '类别必填',
    typetips: '类型必填',
    documenttips: '文档或者链接必填',
    remarkszhtips: '中文备注必填',
    remarksentips: '英文备注必填',
    download: '下载'
  },
  // 业务和运营
  business: {
    id: '序号',
    title: '通知标题',
    category: '类别',
    creator: '创建人',
    updatetime: '更新时间',
    status: '状态',
    buinessupdate: '业务更新',
    categoryset: '类别设置',
    sendnotification: '添加服务信息',
    deltitle: '是否确认删除该服务信息？',
    content: '文章',
    uploadfile: '上传文件',
    titletips: '服务信息标题必填'
  },
  // 联系信息
  contact: {
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
    active: '启用',
    deltitle: '是否确认删除该联系方式 ？',
    createtitle: '值班信息',
    regiontips: '区域必填',
    officetips: '办事处必填',
    depttips: '部门必填',
    buinessscopetips: '业务范围必填',
    tradetips: '航线必填',
    contactpersontips: '联系人必填',
    phonetips: '手机号必填',
    dutydatetips: '值班日期必填',
    startTimetips: '开始时间必填',
    endTimetips: '结束时间必填',
    emailtips: '邮箱必填',
    dutytimetips: '值班时间必填'
  },
  // FAQ管理
  faq: {
    searchKeyword: '问题 / 关键词',
    id: '问题编号',
    question: '问题',
    keyword: '关键词',
    relatedquestion: '关联问题',
    answer: '答案',
    creator: '创建人',
    updatetime: '更新时间',
    status: '状态',
    import: '导入',
    createinfo: '添加FAQ',
    deactive: '禁用',
    active: '启用',
    export: '导出',
    detail: '详情',
    deltitle: '是否确认删除该 FAQ ？',
    questiontips: '问题必填',
    answertips: '答案必填',
    faqKeywords: '关键字必填',
    relatedquestiontips: '关联问题必填',
    input: '请输入，多个关键词用,隔开'
  },
  //  新闻中心
  newscenter: {
    categorysetting: '新闻分类配置',
    export: '导出',
    import: '导入',
    addhistoynews: '添加历史新闻',
    title: '标题',
    category: '类别名称',
    publishdate: '发布日期',
    link: '链接',
    status: '状态',
    addtitle: '添加历史新闻',
    deltitle: '是否确认删除该文章？',
    del: '删除',
    categoryen: '种类英文',
    categoryzh: '种类中文',
    creator: '作者',
    titletips: '新闻标题必填',
    linktips: '链接必填',
    publishdatetips: '发布日期必填',
    categorytips: '种类英文和种类中文不能为空'
  },
  // CMA CGM
  vas: {
    addarticlelink: '以链接形式添加文章',
    title: '标题',
    publishdate: '发布日期',
    link: '链接',
    status: '状态',
    deltitle: '是否确认删除该文章？',
    addtitle: '以链接形式添加增值服务介绍',
    titletips: '标题必填',
    linktips: '链接必填',
    publishdatetips: '发布时间必填'
  },
  // 角色和权限
  userrole: {
    keyword: '姓名 / 角色与部门',
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
    deltitle: '请确认是否要删除该角色？',
    permission: '权限',
    nametips: '姓名必填',
    emailtips: '邮箱必填',
    idtips: '角色必选',
    passwordtips: '密码必填',
    functips: '角色与部门必填',
    permissiontips: '权限必填'
  },
  // 富文本
  tinymce: {
    title: '上传',
    material: '素材库',
    uploadBtn: '点击上传',
    confirmBtn: '确定',
    cancelBtn: '取消',
    uploadError: '请上传图片'
  },
  // 小程序用户
  programuser: {
    export: '导出',
    username: '用户名',
    account: '账号',
    company: '公司',
    companycategory: '公司分类',
    partnercode: 'Partner Code'
  },
  // label管理
  label: {
    add: '添加新标签',
    companyname: '公司名称',
    companycategory: '公司',
    description: '描述',
    usersnumber: '用户',
    labelname: '标签名称',
    labeldescription: '标签描述',
    companys: '公司',
    id: '序号',
    user: '用户',
    ecomaccount: '账号',
    labelnametips: '标签名称必填',
    download: '下载',
    viewcompany: '查看公司',
    viewuser: '查看公司用户',
    deltitle: '是否确认删除该标签？',
    delUsertitle: '是否确认删除该公司？'
  },
  // 发布通知
  buiness: {
    title: '标题',
    publishdate: '发布日期',
    numberofviews: '浏览量',
    numberofsendtoemail: '发送至邮箱数量',
    numberoflikes: '喜欢的数量'
  },
  // 模版
  useful: {
    title: '标题',
    numberofviews: '浏览量',
    numberofsendtoemail: '发送至邮箱数量'
  },
  // 新闻
  news: {
    title: '标题',
    publishdate: '发布日期',
    numberofviews: '浏览量',
    numberoflinkes: '点赞量'
  },
  // cgm
  cma: {
    title: '标题',
    publishdate: '发布日期',
    numberofviews: '浏览量',
    numberoflinkes: '点赞量'
  },
  // 更多功能
  most: {
    cma: 'CMA CGM+',
    about: '集团介绍',
    news: '新闻中心',
    online: '在线服务',
    customer: '客户公告',
    useful: '常用模版及链接',
    sanction: '管制品查询',
    contact: '联系我们'
  },
  // 下载
  download: {
    downloadtime: '数据时间',
    required: '时间必须选择'
  },
  // 确认框
  popconfirm: {
    text: '是否要删除此图片？',
    ture: '确认',
    false: '取消'
  },
  // 提示
  tips: {
    success: '切换语言成功',
    errorImg: '上传图片大小不能超过 2MB!',
    errortxt: '上传图片格式不正确，请选择 jpg、png、jpeg 或 gif 格式的图片!',
    errornull: '上传图片名称不能包含空格或 #!'
  }
}
