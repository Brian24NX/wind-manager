<template>
  <!--<div>用户管理</div>-->
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.nameOrFunction" size="small" style="width: 100%" :placeholder="$t('userrole.keyword')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-select v-model="queryParams.active" size="small" :placeholder="$t('userrole.status')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in activeList" :key="item.key" :label="item.value + ' / ' + item.valueCn" :value="item.key" />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('message.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button v-permission="[6]" type="danger" size="small" @click="importFile">{{ $t('userrole.import') }}</el-button>
        <el-button v-permission="[7]" type="danger" size="small" @click="exportlist">{{ $t('userrole.export') }}</el-button>
        <el-button v-permission="[3]" type="danger" size="small" @click="adddialog = true">{{ $t('userrole.newuser') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/userList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('userrole.name')" prop="name" />
        <el-table-column align="center" :label="$t('userrole.email')" prop="email" />
        <el-table-column :label="$t('userrole.function')" prop="functions" />
        <el-table-column :label="$t('userrole.office')" prop="office" />
        <el-table-column :label="$t('userrole.status')" prop="active" align="center" :formatter="transactive" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-show="scope.row.id !== 1 && scope.row.active === 1 && !(roleViewId !== 1 && (scope.row.id == userId || scope.row.roleViewId == queryParams.roleViewId))" v-permission="[4]" size="small" type="text" @click="handleUpdateStatus(scope.row,0)">{{ $t('userrole.deactive') }}</el-button>
            <el-button v-show="scope.row.id !== 1 && scope.row.active === 0 && !(roleViewId !== 1 && (scope.row.id == userId || scope.row.roleViewId == queryParams.roleViewId))" v-permission="[4]" size="small" type="text" @click="handleUpdateStatus(scope.row,1)">{{ $t('userrole.active') }}</el-button>
            <el-button v-permission="[2]" size="small" type="text" class="danger" @click="Edit(scope.row)">{{ $t('userrole.viewedit') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--文件上传弹窗-->
    <CustomerImport ref="customerImport" download-url="import/Import New Users导入新用户.xlsx" import-url="/api/admin/userImport" :table-colum="tableColum" @success="search" />
    <!-- <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center destroy-on-close :close-on-click-modal="false" width="410px">
      <el-upload class="upload-demo" drag action="/api/admin/userImport" :limit="1" :headers="uploadHeaders" :on-success="handleSuccess" accept=".xlsx, .xls">
        <i class="el-icon-upload" />
        <div class="el-upload__text">{{ $t('general.upload') }}<em>{{ $t('general.uploadTips') }}</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog=false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog> -->
    <!--新增弹窗-->
    <el-dialog :title="$t('general.add')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false" width="550px">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('userrole.name')" prop="name">
          <el-input v-model="addform.name" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.name = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userrole.email')" prop="email">
          <el-input v-model="addform.email" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.email = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userrole.function')" prop="id">
          <el-select v-model="addform.id" :placeholder="$t('general.choose')" style="width: 100%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="roleViewId !== 1 && item.value == roleViewId" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('userrole.office')" prop="office">
          <el-input v-model="addform.office" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.office = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input v-model="addform.password" type="password" show-password autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.password = $event.target.value.trim()" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitadd('addform')">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--查看和编辑角色-->
    <el-dialog :title="$t('userrole.viewedit')" :visible.sync="editdialog" center destroy-on-close :close-on-click-modal="false" width="550px">
      <el-form ref="editform" :model="editform" :rules="editrules">
        <el-form-item :label="$t('userrole.name')" prop="name">
          <el-input v-model="editform.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('userrole.email')" prop="email">
          <el-input v-model="editform.email" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('userrole.office')" prop="office">
          <el-input v-model="editform.office" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="editform.office = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userrole.function')" prop="funid">
          <el-select v-model="editform.funid" :disabled="editform.id === 1 || editform.id == userId || currentRoleViewId == queryParams.roleViewId" placeholder="请选择" style="width: 100%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="roleViewId !== 1 && item.value == roleViewId" />
          </el-select>
        </el-form-item>
        <!--<el-form-item>
          <el-button type="text" plain @click="premissiondialog = true">Customize permission for the user</el-button>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitview('editform')">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancleedit">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--新增定制化权限-->
    <el-dialog :title="$t('userrole.editpremission')" :visible.sync="premissiondialog" center>
      <el-form ref="premissionform" :model="premissionform">
        <el-form-item :label="$t('userrole.function')" prop="function">
          <el-input v-model="premissionform.function" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('userrole.description')" prop="description">
          <el-input v-model="premissionform.description" type="textarea" :row="2" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('userrole.permission')" prop="permission">
          <multi-check-list :data-list="dataList" :default-checked-keys="premissionform.permission" :invert="false" :is-check-all="false" @change="handlerDataCheck" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CustomerImport from '@/components/Import/import'
import { userActive, userExport, userAdd, userEdit, getInfo } from '@/api/user'
import { dictItem } from '@/api/system/dict/dict'
import { roleDict } from '@/api/role.js'
import Pagination from '@/components/Pagination'
import MultiCheckList from '@/components/MultiCheckList'
import { transroleList } from '@/utils/index'
export default {
  name: 'Role',
  components: {
    Pagination,
    MultiCheckList,
    CustomerImport
  },
  data() {
    return {
      roleViewId: JSON.parse(localStorage.getItem('role')).id,
      currentRoleViewId: null,
      userId: JSON.parse(localStorage.getItem('userInfo')).id,
      dataList: [],
      queryParams: {
        nameOrFunction: '',
        active: '',
        roleViewId: JSON.parse(localStorage.getItem('role')).id
      },
      addform: {
        name: '',
        email: '',
        id: '',
        office: '',
        password: ''
      },
      premissionform: {
        permission: ['a001', 'a003', 'a005', 'a009'],
        description: '',
        function: ''
      },
      editform: {
        id: '',
        name: '',
        email: '',
        office: '',
        funid: ''
      },
      options: [],
      adddialog: false,
      importdialog: false,
      editdialog: false,
      premissiondialog: false,
      rules: {},
      editrules: {},
      tableColum: [{
        prop: 'email',
        label: 'email',
        width: '300px'
      }, {
        prop: 'name',
        label: 'name',
        width: '300px'
      }, {
        prop: 'functions',
        label: 'function',
        width: '300px'
      }, {
        prop: 'status',
        label: 'Status',
        width: '300px'
      }],
      activeList: []
    }
  },
  computed: {},
  watch: {
    adddialog(val) {
      if (!val) {
        this.addform = {
          name: '',
          email: '',
          id: '',
          password: ''
        }
        this.loading = false
      }
    },
    '$store.getters.language'() {
      this.setRules()
    }
  },
  created() {
    this.roleList()
    this.getActivedList()
  },
  mounted() {
    this.setRules()
  },
  methods: {
    getActivedList() {
      dictItem('dict_active').then(res => {
        console.log(res)
        this.activeList = res.data
      })
    },
    setRules() {
      this.editrules = {
        name: { required: true, message: this.$t('forgetForm.namerequired') },
        email: [{ required: true, message: this.$t('forgetForm.emailrequired') }],
        funid: { required: true, message: this.$t('userrole.idtips'), trigger: 'change' }
      }
      const checkapssword = (rule, value, callback) => {
        // eslint-disable-next-line no-unused-vars
        const passwordreg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,20}$/
        if (!passwordreg.test(value)) {
          callback(new Error(this.$t('forgetForm.requirerules')))
        } else {
          callback()
        }
      }
      const checkemail = (rule, value, callback) => {
        // eslint-disable-next-line no-unused-vars
        const email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!email.test(value)) {
          callback(new Error(this.$t('forgetForm.emailtips')))
        } else {
          callback()
        }
      }
      this.rules = {
        name: { required: true, message: this.$t('forgetForm.namerequired') },
        email: [{ required: true, message: this.$t('forgetForm.emailrequired') }, { validator: checkemail, trigger: blur }],
        id: { required: true, message: this.$t('forgetForm.functionrequired'), trigger: blur },
        password: [{ required: true, message: this.$t('forgetForm.passwordtips') }, { trigger: blur, validator: checkapssword }]
      }
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.editform ? this.$refs.editform.clearValidate() : null
          this.$refs.addform ? this.$refs.addform.clearValidate() : null
        })
      }, 1)
    },
    // 启用
    transactive(data) {
    // eslint-disable-next-line eqeqeq
      if (data.active == 1) {
        return 'Active'
      } else {
        return ' Deactive'
      }
    },
    // 角色名称
    async roleList() {
      const data = {
        roleViewId: this.roleViewId
      }
      const res = await roleDict(data)
      this.options = transroleList(res.data)
      // console.log(this.options)
    },
    // 导入列表
    import() {},
    // 导出列表
    async exportlist() {
      // eslint-disable-next-line no-unused-vars
      const res = await userExport(this.queryParams)
      // eslint-disable-next-line eqeqeq
      if (res.code == 200) {
        window.open(res.data)
      } else {
        this.$message.error(res.message)
      }
    },
    // 状态改变
    async handleUpdateStatus(row, active) {
      // eslint-disable-next-line no-unused-vars
      const data = {
        active: active,
        id: row.id
      }
      await userActive(data)
      this.$refs.pagination.refreshRequest()
    },
    // 新增操作
    submitadd(formName) {
      const role = [{
        id: this.addform.id
      }]
      const data = {
        email: this.addform.email,
        password: this.addform.password,
        name: this.addform.name,
        office: this.addform.office,
        active: 1,
        roles: role
      }
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          await userAdd(data)
          this.adddialog = false
          this.$refs.pagination.refreshRequest()
        } else {
          return false
        }
      })
    },
    // 取消操作
    Cancle() {
      this.adddialog = false
    },
    // 取消编辑
    Cancleedit() {
      this.editdialog = false
      this.editform = {
        id: '',
        name: '',
        email: '',
        funid: ''
      }
    },
    // 提交操作
    submitview(formName) {
      const role = [{
        id: this.editform.funid
      }]
      const data = {
        id: this.editform.id,
        email: this.editform.email,
        office: this.editform.office,
        name: this.editform.name,
        active: 1,
        roles: role
      }
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          await userEdit(data)
          this.editdialog = false
          this.$refs.pagination.refreshRequest()
          this.editform = {
            id: '',
            name: '',
            email: '',
            funid: ''
          }
        } else {
          return false
        }
      })
    },
    // 编辑权限
    async Edit(row) {
      this.editdialog = true
      const res = await getInfo(row.id)
      // console.log(res.data)
      this.editform.name = res.data.name
      this.editform.email = res.data.email
      this.editform.office = res.data.office
      this.editform.id = res.data.id
      this.editform.funid = res.data.roles[0].id
      this.currentRoleViewId = res.data.roles[0].id
    },
    handlerDataCheck(parent, child) {
      // console.log(parent, child)
    },
    importFile() {
      this.$refs.customerImport.importFile()
    },
    // 搜索
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams.nameOrFunction = ''
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0px;
  }
  .el-checkbox {
    margin-right: 25px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #c79f5e !important;
    border-color: #c79f5e !important;
  }
  .el-checkbox__inner:hover {
    border-color: #c79f5e !important;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #c79f5e !important;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0px;
  }
  .el-checkbox {
    margin-right: 25px;
  }
}
</style>
