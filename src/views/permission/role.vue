<template>
  <!--<div>用户管理</div>-->
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.nameOrFunction" size="small" style="width: 100%" placeholder="Name or Function" suffix-icon="el-icon-search" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" plain @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="downloadfile">{{ $t('message.download') }}</el-button>
            <el-button type="danger" size="small" plain @click="importdialog = true">{{ $t('userrole.import') }}</el-button>
            <el-button type="danger" size="small" plain @click="exportlist">{{ $t('userrole.export') }}</el-button>
            <el-button type="danger" size="small" @click="adddialog = true">{{ $t('userrole.newuser') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/api/admin/userList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('userrole.name')" prop="name" />
        <el-table-column align="center" :label="$t('userrole.email')" prop="email" />
        <el-table-column :label="$t('userrole.function')" prop="functions" />
        <el-table-column :label="$t('userrole.status')" prop="active" align="center" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.active === 1" size="small" type="text" @click="handleUpdateStatus(scope.row,0)">{{ $t('userrole.deactive') }}</el-button>
            <el-button v-if="scope.row.active === 0" size="small" type="text" @click="handleUpdateStatus(scope.row,1)">{{ $t('userrole.active') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="Edit(scope.row)">{{ $t('userrole.viewedit') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--文件上传弹窗-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center>
      <el-upload class="upload-demo" drag action="/api/admin/userImport" :limit="1" :headers="uploadHeaders" :on-success="handleSuccess" accept=".xlsx, .xls">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog=false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--新增弹窗-->
    <el-dialog :title="$t('userrole.newuser')" :visible.sync="adddialog" center>
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('userrole.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addform.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('userrole.email')" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addform.email" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('userrole.function')" :label-width="formLabelWidth" prop="function">
          <el-select v-model="addform.id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('login.password')" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addform.password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitadd">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--查看和编辑角色-->
    <el-dialog :title="$t('userrole.viewedit')" :visible.sync="editdialog" center>
      <el-form ref="editform" :model="editform" :rules="editrules">
        <el-form-item :label="$t('userrole.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editform.name" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('userrole.email')" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editform.email" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('userrole.function')" :label-width="formLabelWidth" prop="function">
          <el-select v-model="editform.id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" plain @click="premissiondialog = true">Customize permission for the user</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitview">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="editdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--新增定制化权限-->
    <el-dialog :title="$t('userrole.editpremission')" :visible.sync="premissiondialog" center>
      <el-form ref="premissionform" :model="premissionform">
        <el-form-item :label="$t('userrole.function')" :label-width="formLabelWidth" prop="function">
          <el-input v-model="premissionform.function" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('userrole.description')" :label-width="formLabelWidth" prop="description">
          <el-input v-model="premissionform.description" type="textarea" :row="2" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('userrole.permission')" :label-width="formLabelWidth" prop="permission">
          <multi-check-list :data-list="dataList" :default-checked-keys="premissionform.permission" :invert="false" :is-check-all="false" @change="handlerDataCheck" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import i18n from '@/lang'
// eslint-disable-next-line no-unused-vars
import { userActive, userExport, userAdd, userEdit, getInfo } from '@/api/user.js'
import { roleDict } from '@/api/role.js'
import Pagination from '@/components/Pagination'
import MultiCheckList from '@/components/MultiCheckList'
// eslint-disable-next-line no-unused-vars
import { transroleList } from '@/utils/index'
import { getToken } from '@/utils/auth'
export default {
  name: 'Role',
  components: {
    Pagination,
    MultiCheckList
  },
  data() {
    return {
      uploadHeaders: { 'Authorization': getToken() },
      dataList: [
        {
          code: 1001,
          label: '电商',
          value: 'a001',
          children: [
            {
              code: 1002,
              label: '淘宝',
              value: 'a002'
            },
            {
              code: 1003,
              label: '京东',
              value: 'a003'
            },
            {
              code: 1004,
              label: '亚马逊',
              value: 'a002'
            }
          ]
        },
        {
          code: 1005,
          label: '生活服务',
          value: 'a005',
          children: [
            {
              code: 1006,
              label: '美团',
              value: 'a006'
            },
            {
              code: 1007,
              label: '大众点评',
              value: 'a007'
            },
            {
              code: 1008,
              label: '滴滴',
              value: 'a008'
            },
            {
              code: 1009,
              label: '饿了么',
              value: 'a009'
            }
          ]
        }
      ],
      queryParams: {
        nameOrFunction: '',
        roleViewId: JSON.parse(localStorage.getItem('role')).id
      },
      addform: {
        name: '',
        email: '',
        id: '',
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
        funid: ''
      },
      options: [],
      adddialog: false,
      importdialog: false,
      editdialog: false,
      premissiondialog: false,
      formLabelWidth: '130px',
      rules: {
        name: { required: true, message: 'name is required', trigger: 'blur' },
        email: { required: true, message: 'email is required', trigger: 'blur' },
        id: { required: true, message: 'id is required', trigger: 'change' },
        password: { required: true, message: 'password is required', trigger: 'blur' }
      },
      editrules: {
        funid: { required: true, message: 'id is required', trigger: 'change' }
      }
    }
  },
  computed: {},
  created() {
    this.roleList()
  },
  methods: {
    async roleList() {
      const data = {
        roleViewId: JSON.parse(localStorage.getItem('role')).id
      }
      const res = await roleDict(data)
      this.options = transroleList(res.data)
      console.log(this.options)
    },
    // 导入列表
    import() {},
    // 导出列表
    async exportlist() {
      // eslint-disable-next-line no-unused-vars
      const res = await userExport(this.queryParams)
      // eslint-disable-next-line eqeqeq
      if (res.code == 200) {
        window.location.href = res.data
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
      const res = await userActive(data)
      this.$message.info(res.message)
      this.$refs.pagination.refreshRequest()
    },
    // 新增操作
    async submitadd() {
      console.log(this.addform.function)
      const role = [{
        id: this.addform.function
      }]
      const data = {
        email: this.addform.email,
        password: this.addform.password,
        name: this.addform.name,
        active: 1,
        roles: role
      }
      const res = await userAdd(data)
      this.$message.info(res.message)
      this.adddialog = false
      this.$refs.pagination.refreshRequest()
      this.addform = {}
    },
    // 提交操作
    async submitview() {
      const role = [{
        id: this.editform.funid
      }]
      const data = {
        id: this.editform.id,
        email: this.editform.email,
        name: this.editform.name,
        active: 1,
        roles: role
      }
      const res = await userEdit(data)
      this.$message.info(res.message)
      this.editdialog = false
      this.$refs.pagination.refreshRequest()
      this.editform = {}
    },
    // 编辑权限
    async Edit(row) {
      this.editdialog = true
      const res = await getInfo(row.id)
      console.log(res.data)
      this.editform.name = res.data.name
      this.editform.email = res.data.email
      this.editform.id = res.data.id
      this.editform.funid = res.data.roles[0].id
    },
    handlerDataCheck(parent, child) {
      console.log(parent, child)
    },
    downloadfile() {
      window.location.href = process.env.VUE_APP_FILE_BASE_API + 'import/Import New Users导入新用户_新.xlsx'
    },
    // 处理成功
    handleSuccess(res) {
      // eslint-disable-next-line eqeqeq
      if (res.code != 200) {
        this.$message.error(res.message)
      }
    },
    submitimport() {
      this.importdialog = false
      this.search()
    },
    search() {
      this.$refs.pagination.refreshRequest()
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
