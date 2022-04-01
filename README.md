#### 1. 目录结构
```
.
├── README.md                    -文档说明
├── babel.config.js              -babel配置
├── jsconfig.json                -js配置
├── package-lock.json            -npm包下载失败日志
├── package.json                 -npm包需要安装内容
├── public                       -公共文件夹
│   ├── favicon.ico              -icon
│   └── index.html               -公共html
├── src                          -开发文件目录
│   ├── App.vue                  -主vue文件入口
│   ├── api                      -api文件夹
│   │   ├── content.js           -文案模块api
│   │   ├── role.js              -角色模块api
│   │   └── user.js              -用户模块api
│   ├── assets                   -资源文件夹
│   │   └── logo.png             -资源图片存放
│   ├── components               -公共组件存放
│   │   └── HelloWorld.vue       -公共组件
│   ├── directive                -指令自定义 类似于v-model
│   │   ├── index.js             -统一挂载指令
│   │   └── premission           -权限文件夹
│   │       ├── hasPermi.js      -是否有权限
│   │       └── hasRole.js       -角色
│   ├── layout                   -页面框架存放位置
│   │   ├── components           -组件存放位置
│   │   │   ├── AppMain.vue      -主入口位置
│   │   │   ├── Navbar.vue       -头部
│   │   │   ├── Settings         -配置
│   │   │   │   └── index.vue    -配置组件
│   │   │   ├── Sidebar          -左侧菜单
│   │   │   │   ├── FixiOSBug.js 
│   │   │   │   ├── Item.vue     -每块分支
│   │   │   │   ├── Link.vue     -tabbar链接
│   │   │   │   ├── Logo.vue     -头部logo
│   │   │   │   ├── SidebarItem.vue -tabbar单个
│   │   │   │   └── index.vue    -收起展开tabbar
│   │   │   ├── TagsView        
│   │   │   │   ├── ScrollPane.vue -伸缩动态页面
│   │   │   │   └── index.vue      -tags关闭问题
│   │   │   └── index.js           -
│   │   ├── index.vue
│   │   └── mixin                -混入
│   │       └── ResizeHandler.js -重绘js
│   ├── main.js                  -主js文件
│   ├── plugins                  -插件
│   │   ├── cache.js             -缓存处理
│   │   ├── index.js             -插件集中处理
│   │   └── modal.js             -弹窗处理
│   ├── router                   -路由处理
│   │   └── index.js             -路由入口
│   ├── settings.js              -自定义配置
│   ├── store                    -vuex文件夹
│   │   ├── getters.js           -getter获取
│   │   ├── index.js             -vuex模块入口
│   │   └── modules              -模块
│   │       ├── app.js           -app基础配置
│   │       ├── errorLog.js      -错误信息
│   │       ├── permission.js    -权限获取
│   │       ├── settings.js      -配置获取
│   │       ├── tagsView.js      -存储到头部tags这个基本用不到
│   │       └── user.js          -用户获取，token获取
│   ├── styles                   -重写样式
│   │   ├── btn.scss             -按钮样式
│   │   ├── element-ui.scss      -ui样式
│   │   ├── element-variables.scss -element变量定义
│   │   ├── index.scss             -主页样式
│   │   ├── mixin.scss            -混入样式
│   │   ├── sidebar.scss          -左侧导航栏样式
│   │   ├── transition.scss       -其他样式
│   │   └── variables.scss        -样式变量
│   ├── utils                     -公共文件书写
│   │   ├── Export2Excel.js       -excel导出
│   │   ├── auth.js               -认证
│   │   ├── errorCode.js          -错误代码提示
│   │   ├── request.js            -请求封装
│   │   ├── util.js               -公共方法定义
│   │   └── validate.js           -验证规则封装
│   └── views
│       ├── AboutView.vue     
│       └── HomeView.vue
├── tests                         -单元测试
│   └── unit
│       └── example.spec.js
└── vue.config.js                 -打包配置
```

#### 2. Git 分支管理
    - dev: 开发环境 (开发好的功能，自测完，可从自己分支合并到development分支来)
    - test: 测试环境 (不可直接使用编写代码)
    - production: 生产环境 (不可直接使用编写代码)

#### 3. Git 分支说明：
    1. 分支命名: 开发人员开发前，基于development分支创建个人分支，命名规范为 dev_xxx, 例如dev_xiaohai
    2. 开发: 开发人员的业务代码，自测完没有问题，先上传到自己分支，再merge 到 development 分支
    3. 合并: 切换到development分支，先pull更新最新代码，再merge自己的分支到 development 分支
    4. 冲突: 当合并代码跟其他小伙伴有冲突时，需要两人核对完、解决冲突之后在提交，以免代码被冲掉

#### 4. Git 提交规范
    > type用于说明commit的类别  git commit -m "type: 本次提交的具体功能或者修复的bug"
    - feat: 新功能,   例: git commit -m "feat: 将首页tab页切换开发完成"
    - fix:  修补bug,  例: git commit -m "fix: 修复了tab页切换,active状态不跟随的bug"
    - merge: 解决冲突或者合并代码，例: git commit -m "mege: 将首页tab页切换开发完成,合并到development分支"
    - style: 修补css样式(不影响代码运行的变动)
    - refactor: 重构(既不是新增功能，也不是修改bug的代码变动)
    - chore: 构建过程或辅助工具的变动
    - docs: 文档
    - revert: 撤销之前的commit 

#### 5. pages 命名规范
    - 组件命名: 以大驼峰规则命名例如：Home、HomePage

#### 6. 图片命名规范及压缩
    - 图片命名不可携带中文以及空格
    - 图片压缩使用：https://tinypng.com/ 进行压缩
    - 文件夹按照模块创建

#### 7. 公用函数封装规范
- 关于注释: 封装的公用方法一定要写注释,命名尽可能语义话
    > 页面组件中负责的业务逻辑，需要写注释，已方便后期维护
    ```js
    /**
    * 函数的功能: 跳过空数据
    * 函数的参数: @param {*} obj ,需要传递的参数
    */
    ```
- utils模块化管理

#### 8.组件开发规范
- 公共组件:  对于公用组件，注意要抽离封装，属于该组件的逻辑写到该组件中去，避免逻辑都在写父组件，
    同时要考虑到暴漏出api，方便在其他组件使用
- 公共样式:  对于公用的样式可单独写在 assets - styles - common.wxss 中，避免演示冗余
- 公共方法:  对于公共方法，需要单独抽离，写好注释

#### 9.组件模块化管理
- views 下面分为3个模块()
    - Login  登陆页面
    - Role   角色页面
    - content  文件管理页面 
#### 10.中英文切换管理
-element-in18处理

#### 11.防抖和节流函数实现和书写
     loadsh来处理

#### 12.layout来进行页面布局（参考element-vue-admin）
      
####  13. 版本管理，初创版本为v1.0.0版本,为基础版本,pharse2版本号:v1.1.0 小调整修复:v1.0.1
      v1.0.0功能说明:
      1）后台管理登陆 
      2）角色管理   
      3）文库管理
    