<template>
  <!--<div>用户管理</div>-->
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.name" size="small" style="width: 100%" placeholder="Name or Function" suffix-icon="el-icon-search" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" plain @click="downloadfile">{{ $t('message.download') }}</el-button>
            <el-button type="danger" size="small" plain @click="importdialog = true">{{ $t('userrole.import') }}</el-button>
            <el-button type="danger" size="small" plain @click="exportlist">{{ $t('userrole.export') }}</el-button>
            <el-button type="danger" size="small" @click="adddialog = true">{{ $t('userrole.newuser') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/wind-manager/userlist/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('userrole.name')" prop="name" />
        <el-table-column align="center" :label="$t('userrole.email')" prop="email" />
        <el-table-column :label="$t('userrole.function')" prop="function" />
        <el-table-column :label="$t('userrole.status')" prop="status" align="center" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Active'" size="small" type="text" @click="handleUpdateStatus(scope.row)">{{ $t('userrole.deactive') }}</el-button>
            <el-button v-if="scope.row.status === 'Deactive'" size="small" type="text" @click="handleUpdateStatus(scope.row)">{{ $t('userrole.active') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="editdialog = true">{{ $t('userrole.viewedit') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--文件上传弹窗-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center>
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
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
          <el-select v-model="addform.function" multiple placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('login.password')" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addform.password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitadd">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="addhistorynewsdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
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
          <el-select v-model="editform.function" multiple placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="text" plain @click="premissiondialog = true">Customize permission for the user</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitview">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="addhistorynewsdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--新增定制化权限-->
    <el-dialog :title="$t('userrole.editpremission')" :visible.sync="premissiondialog" center>
      <el-form ref="premissionform" :model="premissionform" :rules="premissionrules">
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
import path from 'path'
// eslint-disable-next-line no-unused-vars
import { deepClone } from '@/utils'
// eslint-disable-next-line no-unused-vars
import i18n from '@/lang'
// eslint-disable-next-line no-unused-vars
import { userActive, userExport } from '../../api/user.js'
import Pagination from '@/components/Pagination'
import MultiCheckList from '@/components/MultiCheckList'
// eslint-disable-next-line no-unused-vars
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  name: 'Role',
  components: {
    Pagination,
    MultiCheckList
  },
  data() {
    return {
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
      queryParams: {},
      addform: {
        name: '',
        email: '',
        function: '',
        password: ''
      },
      premissionform: {
        permission: ['a001', 'a003', 'a005', 'a009'],
        description: '',
        function: ''
      },
      editform: {
        name: '',
        email: '',
        function: ''
      },
      options: [
        { value: '1', label: 'Normal User' },
        { value: '2', label: 'sales' },
        { value: '3', label: 'Communiication' }
      ],
      adddialog: false,
      importdialog: false,
      editdialog: false,
      premissiondialog: false,
      formLabelWidth: '130px',
      rules: {
        name: { required: true, message: 'name is required', trigger: 'blur' },
        email: { required: true, message: 'email is required', trigger: 'blur' },
        function: { required: true, message: 'function is required', trigger: 'change' },
        password: { required: true, message: 'password is required', trigger: 'blur' }
      },
      editrules: {
        function: { required: true, message: 'function is required', trigger: 'change' }
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    // 导出列表
    exportlist() {
      // eslint-disable-next-line no-unused-vars
      const nameOrFunction = this.queryParams.name
      this.userExport(nameOrFunction).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.code == 200) {
          window.location.href = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 状态改变
    handleUpdateStatus(row) {
      // eslint-disable-next-line no-unused-vars
      const data = {
        active: row.active,
        id: row.id
      }
      this.userActive(data).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.code == 200) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 提交add
    submitadd() {},
    handlerDataCheck(parent, child) {
      console.log(parent, child)
    },
    downloadfile() {
      window.location.href = 'https://uat.wind-admin.cma-cgm.com/api/admin/import/user_tm.xlsx'
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
