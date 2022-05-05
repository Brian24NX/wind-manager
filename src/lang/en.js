export default {
  // 路由翻译
  route: {
    dashboard: 'Dashboard',
    permission: 'Role and Permission Management',
    rolePermission: 'Role & Permission',
    userManagement: 'User Management',
    contentManager: 'Content Manager',
    articleManager: 'Article Management',
    createArticle: 'Create A New Article',
    newsCenter: 'Mini-Program News Center',
    cmaCgm: 'Mini-Program CMA CGM+',
    faqManagement: 'FAQ Management',
    contactInformation: 'Contact Information Matrix',
    businessOperationalUpdate: 'Business & Operational Update',
    usefulTemplateAndLink: 'Useful Template and Link',
    sanctionsAndCommodityList: 'Sanctions and Commodity List',
    materialLibrary: 'Material Library'
  },
  // navbar翻译
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Global Size'
  },
  // 忘记密码页面翻译
  forgetForm: {
    email: 'Login (Email)',
    forgotpassword: 'Forgotten password',
    identi: 'Identification',
    tip: 'Forgot your password?',
    tips: 'Please ask for a new one using your email address.',
    safe: 'Security',
    safedetailone: 'Fill the e-mail field and click "Receive a verification code".',
    safedetailtwo: 'An activation code will be sent to you by email.',
    safedetailthree: 'You will be able to change your password with this one.',
    sendcode: 'Receive a verification code.',
    cancel: 'Cancel',
    require: 'All fields must be filled in.',
    requiresix: 'Please enter at least 6 characters.',
    requirerule: 'Password should contain at least 1 number, 1 capital letter and 1 lower case letter.',
    verifycode: 'Validation Code',
    password: 'New Password',
    confirmpassword: 'New Password Confirmation',
    resetpasssuccess: 'Password reset successful',
    verifyerror: 'Validation code error',
    passwordconsistent: 'Password must be consistent',
    terms: 'Legal Terms',
    yes: 'Yes'
  },
  // 登陆页面翻译
  login: {
    title: 'Sign In',
    logIn: 'Login',
    username: 'Login (Email)',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !',
    forgetpassword: 'Forgotten Password?'
  },
  //  权限页面翻译
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  // 文章相关
  article: {
    thumb: 'Front Cover',
    title: 'Title',
    date: 'Date',
    category: 'Category',
    platform: 'Platform',
    status: 'Status',
    actions: 'Actions',
    deltitle: 'Please confirm if you want to delete this article?'
  },
  message: {
    detail: 'Details',
    edit: 'Edit',
    delete: 'Delete',
    publish: 'Published',
    unPublish: 'Unpublish',
    download: 'Template',
    save: 'Save',
    search: 'Search'
  },
  addArticle: {
    pageTitle: 'Create A New Article',
    title: 'Title',
    creator: 'Creator',
    forntCover: 'Front Cover',
    description: 'Description',
    content: 'Content',
    orginalArticleLink: 'Original Article Link',
    publishTo: 'Publish to',
    category: 'News Category',
    schedulePublish: 'Schedule Publish Date',
    scheduleTime: 'Schedule Publish Date',
    sendTo: 'Send to',
    submit: 'Save and Publish',
    reset: 'Reset'
  },
  // 素材库
  library: {
    title: 'Materials Library',
    allselect: 'Select All',
    category: 'Change Category',
    delete: 'Delete',
    upload: 'Upload',
    categorysetting: 'Category Setting',
    addcategory: 'Add A New Category'
  },
  // 管制品
  sanctions: {
    commodityzh: 'Commodity (Chinese)',
    commodityen: 'Commodity (English)',
    referencenumber: 'Reference Number',
    remarkszh: 'Remark(s) Chinese',
    remarksen: 'Remark(s) English',
    type: 'Type',
    import: 'Import',
    export: 'Export',
    newitem: 'Add A New Item'
  },
  // 用户模版
  userful: {
    name: 'Name for Document or Link',
    category: 'Category',
    document: 'Document/Link',
    reference: 'Internal Reference',
    edit: 'Edit',
    delete: 'Delete',
    categoryset: 'Category Setting',
    import: 'Import',
    additem: 'Add A New Item',
    export: 'Export',
    link: 'Link',
    uploadfile: 'Uploadfile',
    type: 'Type'
  },
  // 业务和运营
  business: {
    id: 'No.',
    title: 'Notification Title',
    category: 'Category',
    creator: 'Creator',
    updatetime: 'Updated Time',
    status: 'Status',
    buinessupdate: 'Business Update',
    categoryset: 'Category Setting',
    sendnotification: 'Send A Notification',
    deltitle: 'Please confirm if you want to delete this notification?',
    content: 'Content',
    uploadfile: 'UploadFile'
  },
  contact: {
    id: 'No.',
    region: 'Region',
    office: 'Office',
    dept: 'Dept.',
    buinessscope: 'Business Scope',
    trade: 'Trade',
    accountname: 'Account Name',
    contactperson: 'Contact Person',
    dutydate: 'On Duty Date',
    dutytime: 'On Duty Time',
    phone: 'Phone No.',
    email: 'Email Address',
    import: 'Import',
    createinfo: 'Create New Duty Info',
    deactive: 'Deactive',
    active: 'Active'
  },
  faq: {
    id: 'No.',
    question: 'Question',
    keyword: 'Keyword(s)',
    relatedquestion: 'Related Question(s)',
    answer: 'Answer',
    creator: 'Creator',
    updatetime: 'Updated Time',
    status: 'Status',
    import: 'Import',
    createinfo: 'Create A New FAQ',
    deactive: 'Deactive',
    active: 'Active',
    export: 'Export',
    deltitle: 'Please confirm if you want to delete this FAQ?'
  },
  //  新闻中心
  newscenter: {
    categorysetting: 'News Category Setting',
    export: 'Export',
    import: 'Import',
    addhistoynews: 'Add A Historical News',
    title: 'News Title',
    category: 'Category',
    publishdate: 'Published Date',
    link: 'Link',
    status: 'Status',
    addtitle: 'Add A Historical News',
    deltitle: 'Please confirm if you want to delete this article?',
    del: 'Delete',
    categoryen: 'Category-EN',
    categoryzh: 'Category-ZH',
    creator: 'Creator'
  },
  //  vas
  vas: {
    addarticlelink: 'Add An Article by Link',
    title: 'Title',
    publishdate: 'Published Date',
    link: 'Link',
    status: 'Status',
    deltitle: 'Please confirm if you want to delete this article?',
    addtitle: 'Add A CMA CGM+ Intro by Link'
  },
  // 用户角色和权限
  userrole: {
    name: 'Name',
    email: 'Email Address',
    function: 'Function',
    status: 'Status',
    viewedit: 'View and Edit Functions',
    active: 'Active',
    deactive: 'Deactive',
    import: 'Import',
    export: 'Export',
    newuser: 'Add a new user',
    id: 'No.',
    description: 'Description',
    viewuser: 'View Active User',
    editpremission: 'Edit Permission',
    addemployee: 'Add An Employee',
    addnewfunction: 'Add A New Function',
    remove: 'Remove',
    deltitle: 'Please confirm if you want to delete this function?',
    permission: 'Permission'
  }
}
