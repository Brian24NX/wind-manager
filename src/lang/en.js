export default {
  remindMessage: {
    expired: 'Login has expired. Please login again',
    success: 'Operation is successful'
  },
  notFound: {
    message: 'The webmaster said that you can not enter this page.',
    desc: 'Please check that the URL you entered is correct, or click the button below to return to the homepage.',
    back: 'Back to home'
  },
  // 路由翻译
  route: {
    dashboard: 'Homepage',
    permission: 'Role and Permission Management',
    rolePermission: 'Role and Permission',
    userManagement: 'User Management',
    contentManager: 'Content Management',
    articleManager: 'Article Management',
    articleManagers: 'Article List',
    createArticle: 'Create A New Article',
    newsCenter: 'Mini-Program News Center',
    cmaCgm: 'Mini-Program CMA CGM+',
    faqManagement: 'FAQ Management',
    contactInformation: 'Contact Information Matrix',
    businessOperationalUpdate: 'Business and Operational Update',
    usefulTemplateAndLink: 'Template and Link',
    sanctionsAndCommodityList: 'Cargo Restriction',
    materialLibrary: 'Material Library',
    videoLibrary: 'Video Library',
    usergroup: 'User and User Group-CRM',
    programuser: 'Mini-program User',
    labelManagement: 'Label Management',
    analyticsdashboard: 'Analytics Dashboard',
    behavioranalysis: 'User Behavior Analysis',
    userstatistics: 'User Statistics',
    faqevluation: 'FAQ Evaluation',
    notification: 'Notification Record',
    operationLog: 'Operation Log'
  },
  // navbar翻译
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    changePass: 'Change Password',
    theme: 'Theme',
    size: 'Global Size',
    delcatetitle: 'Please confirm if you want to delete this category?'
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
    requirerule: 'The password must contain at least 6 to 20 characters including one digit, one uppercase letter, and one lowercase letter.',
    requirerules: 'The password must contain at least 6 to 20 characters including one digit, one uppercase letter, and one lowercase letter',
    verifycode: 'Validation Code',
    oldPass: 'Old Password',
    password: 'New Password',
    confirmpassword: 'Confirm Password',
    resetpasssuccess: 'Password reset successful',
    verifyerror: 'Validation code error',
    passwordconsistent: 'The password entered twice does not match',
    terms: 'Legal Terms',
    yes: 'Yes',
    emailtips: 'email is Incorrect',
    oldPasswordtips: 'Mandatory',
    newPasswordtips: 'Mandatory',
    passwordtips: 'Mandatory',
    confirmpasswordtips: 'Mandatory',
    verifycodetips: 'Mandatory',
    emailrequired: 'Mandatory',
    namerequired: 'Mandatory',
    functionrequired: 'Mandatory',
    changeTitle: 'Change Password',
    submit: 'Submit'
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
    forgetpassword: 'Forgotten Password?',
    usernametips: 'Please enter the correct user name',
    passwordtips: 'The password can not be less than 6 digits'
  },
  //  权限页面翻译
  permission: {
    user: 'Name or email address',
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    required: 'Permission is required',
    tips: 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  general: {
    choose: 'Please choose',
    input: 'Please input',
    startTime: 'Start Time',
    endTime: 'End Time',
    chooseDate: 'Choose a date',
    upload: 'Drag the file here, ',
    uploadTips: 'or click to upload',
    add: 'Add',
    edit: 'Edit',
    noData: 'No Data'
  },
  // 文章相关
  article: {
    thumb: 'Front Cover',
    title: 'Title',
    date: 'Date',
    category: 'Category',
    platform: 'Platform',
    status: 'Status',
    actions: 'Action',
    deltitle: 'Please confirm if you want to delete this article?'
  },
  message: {
    index: 'No.',
    detail: 'Detail',
    edit: 'Edit',
    delete: 'Delete',
    publish: 'Publish',
    unPublish: 'Withdraw',
    download: 'Template',
    save: 'Save',
    search: 'Search',
    reset: 'Reset',
    update: 'Update',
    createTime: 'Created Time'
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
    schedulePublish: 'Schedule to Publish',
    scheduleTime: 'Schedule Publish Date',
    sendTo: 'Send to',
    save: 'Save',
    submit: 'Publish',
    addnew: 'Add A New Article',
    titletips: 'Mandatory',
    titlelengthtips: 'Length shall between 2 to 100 characters.',
    creatortips: 'Mandatory',
    creatorlengthtips: 'Length shall between 2 to 100 characters.',
    frontCovertips: 'Mandatory',
    contenttips: 'Mandatory',
    publishIdstips: 'Mandatory',
    publishDatetips: 'Mandatory'
  },
  publishTo: {
    newsCenter: 'Publish to News Center',
    CMACGM: 'Publish to CMA CGM+',
    weChatAccount: 'Publish to WeChat Account'
  },
  // 素材库
  library: {
    title: 'Materials Library',
    allselect: 'Select All',
    category: 'Change Category',
    delete: 'Delete',
    upload: 'Upload',
    categorysetting: 'Category Setting',
    addcategory: 'Add A New Category',
    name: 'Name',
    titleRequire: 'Mandatory'
  },
  notification: {
    type: 'Type',
    account: 'eCommerce Account',
    phone: 'Phone Number',
    shipRef: 'Shipment Ref.',
    time: 'Sent Time',
    status: 'Sent Status',
    userName: 'User Name',
    content: 'Content',
    search: 'Search',
    reset: 'Reset',
    detail: 'Detail',
    typeLabel: 'Notification Type',
    searchLabel: 'eCommerce Account',
    startDate: 'Start Date',
    endDate: 'End Date'
  },
  operationLog: {
    type: 'Type',
    account: 'eCommerce Account',
    phone: 'Phone Number',
    shipRef: 'Shipment Ref.',
    time: 'Sent Time',
    status: 'Sent Status',
    userName: 'User Name',
    content: 'Content',
    search: 'Search',
    reset: 'Reset',
    detail: 'Detail',
    typeLabel: 'Notification Type',
    searchLabel: 'eCommerce Account',
    startDate: 'Start Date',
    endDate: 'End Date',
    bookRef: 'Booking Ref',
    quotationRef: 'Quotation Ref.',
    operationType: 'Operation Name',
    lastUpdateTime: 'Last Updated Time',
    company: 'Company',
    export: 'Export'
  },
  // 管制品
  sanctions: {
    keyword: 'Name',
    commodityzh: 'Name (Chinese)',
    commodityen: 'Name (English)',
    referencenumber: 'Reference Number',
    category: 'Category',
    remarkszh: 'Remark(s) Chinese',
    remarksen: 'Remark(s) English',
    type: 'Type',
    status: 'Status',
    import: 'Import',
    export: 'Export',
    newitem: 'Add A Cargo Restriction',
    editItem: 'Edit Cargo Restriction',
    deltitle: 'Please confirm if you want to delete this cargo restriction list?',
    commodityzhtips: 'Mandatory',
    commodityentips: 'Mandatory',
    remarksentips: 'Mandatory',
    remarkszhtips: 'Mandatory'
  },
  // 用户模板
  userful: {
    name: 'Name',
    categoryen: 'Category-EN',
    categoryzh: 'Category-ZH',
    category: 'First Category',
    categoryTwo: 'Second Category',
    document: 'Document/Link',
    reference: 'Internal Reference',
    edit: 'Edit',
    delete: 'Delete',
    categoryset1: 'Document Category Setting',
    categoryset2: 'Link Category Setting',
    sort: 'Sort',
    import: 'Import',
    additem: 'Add A New Document or Link',
    export: 'Export',
    deltitle: 'Please confirm if you want to delete this document or link?',
    link: 'Link',
    uploadfile: 'Upload File',
    type: 'Type',
    type1: 'Document',
    type2: 'Link',
    nametips: 'Mandatory',
    categoryIdtips: 'Mandatory',
    typetips: 'Mandatory',
    documenttips: 'Mandatory',
    remarkszhtips: 'remarks(Chinese) is required',
    remarksentips: 'remarks(English) is required',
    download: 'Download'
  },
  // 业务和运营
  business: {
    id: 'No.',
    title: 'Notification Title',
    category: 'Category',
    creator: 'Creator',
    updatetime: 'Updated Time',
    status: 'Status',
    topFlag: 'Top Status',
    buinessupdate: 'Business Update',
    categoryset: 'Category Setting',
    sendnotification: 'Create A Notification',
    deltitle: 'Please confirm if you want to delete this notification?',
    content: 'Content',
    uploadfile: 'Upload File',
    titletips: 'Mandatory'
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
    email: 'Email',
    status: 'Status',
    import: 'Import',
    createinfo: 'Create New Duty Info',
    deactive: 'Deactive',
    active: 'Active',
    deltitle: 'Please confirm if you want to delete this Contact?',
    createtitle: 'Duty Info',
    regiontips: 'Mandatory',
    officetips: 'Mandatory',
    depttips: 'Mandatory',
    buinessscopetips: 'Mandatory',
    tradetips: 'Mandatory',
    contactpersontips: 'Mandatory',
    phonetips: 'Mandatory',
    dutydatetips: 'Mandatory',
    startTimetips: 'Mandatory',
    endTimetips: 'Mandatory',
    emailtips: 'Mandatory',
    dutytimetips: 'Mandatory'
  },
  faq: {
    searchKeyword: 'Question / Keyword',
    id: 'Question No.',
    question: 'Question',
    keyword: 'Keywords',
    relatedquestion: 'Related Question(s)',
    answer: 'Answer',
    creator: 'Creator',
    updatetime: 'Updated Time',
    status: 'Status',
    import: 'Import',
    createinfo: 'Create A New FAQ',
    deactive: 'Deactive',
    active: 'Active',
    check: 'Check',
    pass: 'Pass',
    refuse: 'Refuse',
    refuseRemark: 'Please input the reason for rejection',
    export: 'Export',
    detail: 'Detail',
    deltitle: 'Please confirm if you want to delete this FAQ?',
    questiontips: 'Mandatory',
    answertips: 'Mandatory',
    faqKeywords: 'Mandatory',
    relatedquestiontips: 'Mandatory',
    input: 'To add more than one keyword or phrase, please enter keywords or phrases separated by a comma.'
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
    creator: 'Creator',
    titletips: 'Mandatory',
    linktips: 'Mandatory',
    publishdatetips: 'Mandatory',
    categorytips: 'Mandatory'
  },
  //  vas
  vas: {
    addarticlelink: 'Add An Article by Link',
    title: 'Title',
    publishdate: 'Published Date',
    link: 'Link',
    status: 'Status',
    deltitle: 'Please confirm if you want to delete this article?',
    addtitle: 'Add A CMA CGM+ Intro by Link',
    titletips: 'Mandatory',
    linktips: 'Mandatory',
    publishdatetips: 'Mandatory'
  },
  // 用户角色和权限
  userrole: {
    keyword: 'Name / Function',
    name: 'Name',
    email: 'Email',
    function: 'Function',
    office: 'Office',
    status: 'Status',
    viewedit: 'View and Edit Function',
    active: 'Active',
    deactive: 'Deactive',
    import: 'Import',
    export: 'Export',
    newuser: 'Add A New User',
    id: 'No.',
    description: 'Description',
    viewuser: 'View Active User',
    editpremission: 'Edit Permission',
    addemployee: 'Add An Employee',
    addnewfunction: 'Add A New Function',
    remove: 'Remove',
    deltitle: 'Please confirm if you want to delete this function?',
    permission: 'Permission',
    nametips: 'Mandatory',
    emailtips: 'Mandatory',
    idtips: 'Mandatory',
    passwordtips: 'pMandatory',
    functips: 'Mandatory',
    permissiontips: 'Mandatory'
  },
  // 富文本
  tinymce: {
    title: 'Upload',
    material: 'Material Library',
    uploadBtn: 'Click upload',
    confirmBtn: 'Confirm',
    cancelBtn: 'Cancel',
    uploadError: 'Please upload image file',
    choose: 'Please select the stock image',
    noMaterial: 'No material'
  },
  // 小程序用户
  programuser: {
    export: 'Export Excel',
    username: 'User Name',
    account: 'eCommerce Account',
    company: 'Company',
    companycategory: 'Company Category',
    partnercode: 'Partner Code'
  },
  // 标签管理
  label: {
    add: 'Add A New Label',
    companyname: 'Company Name',
    companycategory: 'Company',
    description: 'Description',
    usersnumber: 'User',
    labelname: 'Label Name',
    labeldescription: 'Label Description',
    id: 'No.',
    user: 'User',
    ecomaccount: 'eCommerce Account',
    labelnametips: 'Mandatory',
    download: 'Download',
    companys: 'Companies',
    viewcompany: 'View Company',
    viewuser: 'View Company User',
    deltitle: 'Please confirm if you want to delete this label?',
    delUsertitle: 'Please confirm if you want to delete this company?'
  },
  // 发布通知
  buiness: {
    title: 'Title',
    publishdate: 'Publish Date',
    numberofviews: 'Number of Views',
    numberofsendtoemail: 'Number of Send to Email',
    numberoflikes: 'Number of Likes'
  },
  // 模板
  useful: {
    title: 'Title',
    numberofviews: 'Number of Views/Copies',
    numberofsendtoemail: 'Number of Send to Email'
  },
  // 新闻
  news: {
    title: 'Title',
    publishdate: 'Publish Date',
    numberofviews: 'Number of Views',
    numberoflinkes: 'Number of Send to Email'
  },
  // cgm
  cma: {
    title: 'Title',
    publishdate: 'Publish Date',
    numberofviews: 'Number of Views',
    numberoflinkes: 'Number of Send to Email'
  },
  // 更多功能
  most: {
    cma: 'CMA CGM+',
    about: 'About Us',
    news: 'News Center',
    online: 'Online Service',
    customer: 'Customer Advisory',
    useful: 'Useful Template & Link',
    sanction: 'Cargo Restriction Check',
    contact: 'Contact Us',
    function: 'Function upgrade in progress, please look forward to'
  },
  analysis: {
    noData: 'Temporarily no data',
    qidai: 'Function coming soon, stay tuned'
  },
  import: {
    import: 'Import',
    importRes: 'Import Result',
    tip1: 'Drag the file here, ',
    tip2: 'or click to upload',
    tip3: 'Only. XLSX /. XLS files can be uploaded, ',
    tip4: 'Template'
  },
  download: {
    downloadtime: 'Date',
    required: 'Mandatory'
  },
  video: {
    add: 'Add Video',
    link: 'Video Link'
  },
  // 确认框
  popconfirm: {
    text: 'Do you want to delete this picture ?',
    ture: 'ture',
    false: 'cancel'
  },
  // 提示
  tips: {
    success: 'Switch Language Success',
    errorImg: 'The size of the uploaded image cannot exceed 2MB!',
    errorVideo: 'The size of the uploaded video cannot exceed 50MB!',
    errortxt: 'The upload image format is incorrect. Please select an image in JPG, PNG, JPEG or GIF format!',
    errornull: 'The uploaded picture name cannot contain #!',
    fabulous: 'Thumbs Up',
    stepon: 'Thumbs Down'
  }
}
