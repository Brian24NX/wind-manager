/* eslint-disable vue/no-unused-vars */
<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.creator" size="small" style="width: 100%" placeholder="Creator" suffix-icon="el-icon-search" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="handleAdd">{{ $t('userrole.addnewfunction') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/api/admin/roleList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('userrole.id')" prop="id" />
        <el-table-column align="center" :label="$t('userrole.function')" prop="functname" />
        <el-table-column :label="$t('userrole.description')" prop="descri" />
        <el-table-column :label="$t('userrole.status')" prop="active" align="center" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button size="small" type="text" class="primary" @click="viewuser(scope.row)">{{ $t('userrole.viewuser') }}</el-button>
            <el-button size="small" type="text" class="primary" @click="handleAdd(scope.row)">{{ $t('userrole.editpremission') }}</el-button>
            <el-button size="small" type="text" class="primary" @click="handleAddEmployee(scope.row)">{{ $t('userrole.addemployee') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="delFunction(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--启用用户查看和移除-->
    <el-dialog :title="$t('userrole.viewuser')" :visible.sync="viewdialog" center>
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="nameOrEmail" size="small" style="width: 100%" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="searchUser">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="exportUser">{{ $t('sanctions.export') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column align="center" :label="$t('userrole.id')" prop="id" />
        <el-table-column align="center" :label="$t('userrole.name')" prop="name" />
        <el-table-column align="center" :label="$t('userrole.email')" prop="email" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          // eslint-disable-next-line vue/no-unused-vars
          <template scope="scope">
            <el-button size="small" type="text" class="danger" @click="remove(scope.row.id)">{{ $t('userrole.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--新增角色和权限-->
    <el-dialog :title="$t('userrole.addnewfunction')" :visible.sync="adddialog" center>
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
    <!--新增用户-->
    <el-dialog :title="$t('userrole.newuser')" :visible.sync="addemployeedialog" center>
      <el-form ref="addemployeeform" :model="addemployeeform" :rules="rules">
        <el-form-item :label="$t('userrole.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addemployeeform.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('userrole.email')" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addemployeeform.email" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('userrole.function')" :label-width="formLabelWidth" prop="function">
          <el-select v-model="addemployeeform.function" placeholder="请选择" disabled>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('login.password')" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addemployeeform.password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitadd">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import MultiCheckList from '@/components/MultiCheckList'
// eslint-disable-next-line no-unused-vars
import { roleDel, ActiveUser, ActiveUserExport, roleDict, roleDetail } from '@/api/role.js'
import { userAdd } from '@/api/user.js'
import { transroleList } from '@/utils/index'
export default {
  name: 'PagePermission',
  components: { Pagination, MultiCheckList },
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
      nameOrEmail: '',
      id: '',
      premissionform: {
        permission: ['a001', 'a003', 'a005', 'a009'],
        description: '',
        function: ''
      },
      addemployeedialog: false,
      adddialog: false,
      viewdialog: false,
      formLabelWidth: '120px',
      queryParams: { function: '', roleViewId: JSON.parse(localStorage.getItem('role')).id },
      tabledata: [],
      persontableData: [{ name: 'kelly', email: 'kelly@163.com' }, { name: 'kelly', email: 'kelly@163.com' }],
      personSelecttion: [],
      addemployeeform: {
        name: '',
        email: '',
        function: '',
        password: ''
      },
      options: []
    }
  },
  created() {
    this.roleList()
  },
  methods: {
    async submitadd() {
      const role = [{
        id: this.addemployeeform.function
      }]
      const data = {
        email: this.addemployeeform.email,
        password: this.addemployeeform.password,
        name: this.addemployeeform.name,
        active: 1,
        roles: role
      }
      const res = await userAdd(data)
      this.$message.info(res.message)
      this.addemployeedialog = false
      this.$refs.pagination.refreshRequest()
      this.addemployeeform = {}
    },
    async roleList() {
      const data = {
        roleViewId: 1
      }
      const res = await roleDict(data)
      this.options = transroleList(res.data)
      console.log(this.options)
    },
    handleAddEmployee(row) {
      this.addemployeeform.function = row.id
      this.addemployeedialog = true
    },
    async handleAdd(row) {
      // const res = await roleDetail(Number(row.id))
      // console.log(res.data)
      this.adddialog = true
    },
    multipleSelection(val) {
      this.personSelecttion = val
    },
    async viewuser(row) {
      this.viewdialog = true
      const data = {
        id: row.id,
        nameOrEmail: ''
      }
      this.id = row.id
      const res = await ActiveUser(data)
      this.tabledata = res.data
    },
    handlerDataCheck(parent, child) {
      console.log(parent, child)
    },
    // 删除角色
    delFunction(index) {
      this.$confirm(this.$t('userrole.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          const res = await roleDel(index)
          this.$message.info(res.message)
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 删除用户 roleDel方法不对，暂时用不了
    remove(id) {
      this.$confirm(this.$t('userrole.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          const res = await roleDel(id)
          this.$message.info(res.message)
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 查找激活用户
    async searchUser() {
      const data = {
        id: this.id,
        nameOrEmail: this.nameOrEmail
      }
      const res = await ActiveUser(data)
      this.tabledata = res.data
    },
    // 导出激活用户
    async exportUser() {
      const data = {
        id: this.id,
        nameOrEmail: this.nameOrEmail
      }
      const res = await ActiveUserExport(data)
      this.tabledata = res.data
    }
  }
}
</script>
