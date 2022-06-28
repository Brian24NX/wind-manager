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
    dashboard: 'HomePage',
    permission: 'Role and Permission Management',
    rolePermission: 'Role and Permission',
    userManagement: 'User Management',
    contentManager: 'Content Management',
    articleManager: 'Article Management',
    createArticle: 'Create A New Article',
    newsCenter: 'Mini-Program News Center',
    cmaCgm: 'Mini-Program CMA CGM+',
    faqManagement: 'FAQ Management',
    contactInformation: 'Contact Information Matrix',
    businessOperationalUpdate: 'Business and Operational Update',
    usefulTemplateAndLink: 'Useful Template and Link',
    sanctionsAndCommodityList: 'Sanctions and Commodity List',
    materialLibrary: 'Material Library',
    usergroup: 'User and User Group-CRM',
    programuser: 'Mini-program User',
    labelManagement: 'Label Management',
    analyticsdashboard: 'Analytics Dashboard',
    behavioranalysis: 'User Behavior Analysis',
    userstatistics: 'User Statistics',
    faqevluation: 'FAQ Evaluation'
  },
  // navbar翻译
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    changePass: 'Change Pass',
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
    oldPasswordtips: 'old password is required',
    newPasswordtips: 'new password is required',
    passwordtips: 'password is required',
    confirmpasswordtips: 'confirmpassword is required',
    verifycodetips: 'verifycode is required',
    emailrequired: 'email is required',
    namerequired: 'name is required',
    functionrequired: 'function is required',
    changeTitle: 'Change Password'
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
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
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
    edit: 'Edit'
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
    submit: 'Save and Publish',
    addnew: 'Add A New Article',
    titletips: 'title is required',
    titlelengthtips: 'Length shall between 2 to 100 characters.',
    creatortips: 'creator is required',
    creatorlengthtips: 'Length shall between 2 to 100 characters.',
    frontCovertips: 'frontCover is required',
    contenttips: 'content is required',
    publishIdstips: 'Mandatory',
    publishDatetips: 'publishdate is required'
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
    name: 'Name'
  },
  // 管制品
  sanctions: {
    keyword: 'Commodity',
    commodityzh: 'Commodity (Chinese)',
    commodityen: 'Commodity (English)',
    referencenumber: 'Reference Number',
    remarkszh: 'Remark(s) Chinese',
    remarksen: 'Remark(s) English',
    type: 'Type',
    import: 'Import',
    export: 'Export',
    newitem: 'Add A sanction',
    editItem: 'Edit sanction',
    deltitle: 'Please confirm if you want to delete this commodity list?',
    commodityzhtips: 'commodityCn is required',
    commodityentips: 'commodityEn is required'
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
    additem: 'Add A New Document or Link',
    export: 'Export',
    deltitle: 'Please confirm if you want to delete this document or link?',
    link: 'Link',
    uploadfile: 'Upload File',
    type: 'Type',
    nametips: 'name is required',
    categoryIdtips: 'categoryId is required',
    typetips: 'type is required',
    documenttips: 'document is required',
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
    buinessupdate: 'Business Update',
    categoryset: 'Category Setting',
    sendnotification: 'Send A Notification',
    deltitle: 'Please confirm if you want to delete this notification?',
    content: 'Content',
    uploadfile: 'Upload File',
    titletips: 'title is required'
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
    import: 'Import',
    createinfo: 'Create New Duty Info',
    deactive: 'Deactive',
    active: 'Active',
    deltitle: 'Please confirm if you want to delete this Contact?',
    createtitle: 'Duty Info',
    regiontips: 'region is required',
    officetips: 'office is required',
    depttips: 'dept is required',
    buinessscopetips: 'buinessscope is required',
    tradetips: 'trade is required',
    contactpersontips: 'contactperson is required',
    phonetips: 'phone is required',
    dutydatetips: 'dutydate is required',
    startTimetips: 'starttime is required',
    endTimetips: 'endtime is required',
    emailtips: 'email is required',
    dutytimetips: 'dutytime is required'
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
    export: 'Export',
    detail: 'Detail',
    deltitle: 'Please confirm if you want to delete this FAQ?',
    questiontips: 'question is required',
    answertips: 'answer is required',
    faqKeywords: 'To add more key words, please enter key words or phrases separated by a comma',
    relatedquestiontips: 'relatedquestion is required',
    input: 'Please enter, separate multiple keywords with,'
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
    titletips: 'title is required',
    linktips: 'link is required',
    publishdatetips: 'publishdate is required',
    categorytips: 'New input category items cannot be empty'
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
    titletips: 'title is required',
    linktips: 'link is required',
    publishdatetips: 'publishdate is required'
  },
  // 用户角色和权限
  userrole: {
    keyword: 'Name / Function',
    name: 'Name',
    email: 'Email',
    function: 'Function',
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
    nametips: 'name is required',
    emailtips: 'email is required',
    idtips: 'roleviewid is required',
    passwordtips: 'password is required',
    functips: 'role and department is required',
    permissiontips: 'premission is required'
  },
  // 富文本
  tinymce: {
    title: 'Upload',
    material: 'Material Library',
    uploadBtn: 'Click upload',
    confirmBtn: 'Confirm',
    cancelBtn: 'Cancel',
    uploadError: 'Please upload image file!'
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
    labelnametips: 'Label Name is required',
    download: 'Download',
    companys: 'Companys',
    viewcompany: 'Look Company',
    viewuser: 'Look Company User',
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
  // 模版
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
    sanction: 'Sanction Check',
    contact: 'Contact Us'
  },
  download: {
    downloadtime: 'Data',
    required: 'time is required'
  },
  //确认框
  popconfirm: {
    text: 'Do you want to delete this picture ?',
    ture: 'ture',
    false: 'cancel'
  },
  //提示
  tips: {
    success: 'Switch Language Success',
    errorImg: 'The size of the uploaded image cannot exceed 2MB!',
    errortxt: 'The upload image format is incorrect. Please select an image in JPG, PNG, JPEG or GIF format!',
    errornull: 'The uploaded picture name cannot contain spaces or \!'
  }
}
