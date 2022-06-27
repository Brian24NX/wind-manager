<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.function" size="small" style="width: 100%" :placeholder="$t('userrole.function')" clearable @clear="search" @keyup.enter.native="search" />
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
        <el-button v-permission="[9]" type="danger" size="small" @click="handleAdd">{{ $t('userrole.addnewfunction') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/roleList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('userrole.function')" prop="funct" />
        <el-table-column :label="$t('userrole.description')" prop="descri" />
        <el-table-column :label="$t('userrole.status')" prop="active" align="center" :formatter="transactive" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="200px">
          <template scope="scope">
            <el-button v-permission="[10]" :disabled="scope.row.id == premissionform.roleViewId" size="small" type="text" class="danger" @click="viewuser(scope.row.id)">{{ $t('userrole.viewuser') }}</el-button>
            <el-button v-permission="[11]" :disabled="scope.row.id == premissionform.roleViewId" size="small" type="text" class="danger" @click="handleEdit(scope.row)">{{ $t('userrole.editpremission') }}</el-button>
            <el-button v-permission="[12]" :disabled="scope.row.id == premissionform.roleViewId" size="small" type="text" class="danger" @click="handleAddEmployee(scope.row)">{{ $t('userrole.addemployee') }}</el-button>
            <el-button v-permission="[13]" :disabled="scope.row.id == premissionform.roleViewId" size="small" type="text" class="danger" @click="delFunction(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--启用用户查看和移除-->
    <el-dialog :title="$t('userrole.viewuser')" :visible.sync="viewdialog" center>
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="nameOrEmail" size="small" style="width: 100%" placeholder="请输入姓名或邮箱地址" clearable />
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
      <el-table v-loading="userLoading" :data="tabledata" style="width: 100%">
        <el-table-column align="center" :label="$t('userrole.id')" prop="id" width="60px">
          <template scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('userrole.name')" prop="name" />
        <el-table-column align="center" :label="$t('userrole.email')" prop="email" />
        <!-- <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="60px">
          <template scope="scope">
            <el-button size="small" type="text" class="danger" @click="remove(scope.row.id)">{{ $t('userrole.remove') }}</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </el-dialog>
    <!--新增角色和权限-->
    <el-dialog :title="premissionform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false" width="1000px" top="20px">
      <el-form ref="premissionform" :model="premissionform" label-position="top" :rules="premissionrules">
        <el-form-item :label="$t('userrole.function')" prop="funct">
          <el-input v-model="premissionform.funct" :disabled="isEdit" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="premissionform.funct = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userrole.description')" prop="descri">
          <el-input v-model="premissionform.descri" type="textarea" :row="2" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="premissionform.descri = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userrole.permission')" prop="menuButtons">
          <multi-check-list ref="multiCheckList" :data-list="dataList" :default-checked-keys="menuButtons" :invert="false" :is-check-all="false" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="addRoleBtnLoading" @click="submitaddRole('premissionform')">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="CancleRole">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--新增用户-->
    <el-dialog :title="$t('userrole.newuser')" :visible.sync="addemployeedialog" center destroy-on-close :close-on-click-modal="false" width="550px">
      <el-form ref="addemployeeform" :model="addemployeeform" label-position="top" :rules="rules">
        <el-form-item :label="$t('userrole.name')" prop="name">
          <el-input v-model="addemployeeform.name" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addemployeeform.name = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userrole.email')" prop="email">
          <el-input v-model="addemployeeform.email" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addemployeeform.email = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userrole.function')" prop="function">
          <el-select v-model="addemployeeform.function" placeholder="请选择" disabled style="width: 100%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input v-model="addemployeeform.password" type="password" clearable autocomplete="off" @blur="addemployeeform.password = $event.target.value.trim()" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitadd('addemployeeform')">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import MultiCheckList from '@/components/MultiCheckList'
// eslint-disable-next-line no-unused-vars
import { roleDel, ActiveUser, ActiveUserExport, roleDict, roleDetail, roleAdd, roleEdit, ActiveUserDel } from '@/api/role.js'
import { userAdd } from '@/api/user.js'
import { transroleList } from '@/utils/index'
export default {
  name: 'PagePermission',
  components: { Pagination, MultiCheckList },
  data() {
    const checkapssword = (rule, value, callback) => {
      // eslint-disable-next-line no-unused-vars
      const passwordreg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,20}$/
      if (!passwordreg.test(value)) {
        callback(new Error(this.$t('forgetForm.requirerule')))
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
    return {
      dataList: [],
      nameOrEmail: '',
      id: '',
      menuButtons: [],
      premissionform: {
        id: null,
        roleViewId: JSON.parse(localStorage.getItem('role')).id,
        descri: '',
        funct: ''
      },
      premissionrules: {
        funct: { required: true, message: this.$t('userrole.functips'), trigger: 'blur' }
        // menuButtons: { required: true, message: this.$t('userrole.permissiontips'), trigger: 'blur' }
      },
      isEdit: false,
      addemployeedialog: false,
      adddialog: false,
      addRoleBtnLoading: false,
      viewdialog: false,
      queryParams: { function: '', roleViewId: JSON.parse(localStorage.getItem('role')).id },
      tabledata: [],
      userLoading: false,
      persontableData: [{ name: 'kelly', email: 'kelly@163.com' }, { name: 'kelly', email: 'kelly@163.com' }],
      personSelecttion: [],
      addemployeeform: {
        name: '',
        email: '',
        function: '',
        password: ''
      },
      options: [],
      rules: {
        name: { required: true, message: this.$t('forgetForm.namerequired') },
        email: [{ required: true, message: this.$t('forgetForm.emailrequired') }, { validator: checkemail, trigger: blur }],
        // function: { required: true, message: this.$t('forgetForm.functionrequired'), trigger: blur },
        password: [{ required: true, message: this.$t('forgetForm.passwordtips') }, { trigger: blur, validator: checkapssword }]
      }
    }
  },
  watch: {
    addemployeedialog(val) {
      if (!val) {
        this.addemployeeform = {
          name: '',
          email: '',
          function: '',
          password: ''
        }
        this.loading = false
      }
    },
    adddialog(val) {
      if (!val) {
        this.premissionform = {
          id: null,
          roleViewId: JSON.parse(localStorage.getItem('role')).id,
          descri: '',
          funct: ''
        }
        this.menuButtons = []
        this.isEdit = false
      }
    }
  },
  created() {
    this.setRoleBtnList()
    this.roleList()
  },
  methods: {
    //  启用状态
    transactive(data) {
    // eslint-disable-next-line eqeqeq
      if (data.active == 1) {
        return 'Active'
      }
    },
    // 按钮初始化
    setRoleBtnList() {
      this.dataList = JSON.parse(localStorage.getItem('buttons')) || []
      this.dataList = this.dataList.filter(item => item.children.length)
    },
    // 搜索
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams.function = ''
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 新增
    async handleAdd() {
      this.premissionform = {
        id: null,
        roleViewId: JSON.parse(localStorage.getItem('role')).id,
        descri: '',
        funct: ''
      }
      this.isEdit = false
      this.menuButtons = []
      this.adddialog = true
      this.$nextTick(() => {
        this.$refs.multiCheckList.dealDatas()
      })
    },
    // 提交新增角色
    submitaddRole() {
      this.$refs.premissionform.validate(async valid => {
        if (valid) {
          const menuButtons = this.$refs.multiCheckList.getCheckedKeys()
          if (!menuButtons.length) return
          this.addRoleBtnLoading = true
          if (this.premissionform.id) {
            await roleEdit({
              ...this.premissionform,
              ...{
                menuButtons
              }
            })
          } else {
            await roleAdd({
              ...this.premissionform,
              ...{
                menuButtons
              }
            })
          }
          this.$refs.pagination.refreshRequest()
          this.addRoleBtnLoading = false
          this.adddialog = false
          this.isEdit = false
        }
      })
    },
    // 取消角色
    CancleRole() {
      this.adddialog = false
      this.isEdit = false
    },
    // 编辑
    async handleEdit(row) {
      const res = await roleDetail(row.id)
      console.log(res)
      this.menuButtons = []
      this.premissionform = {
        id: res.data.id,
        roleViewId: JSON.parse(localStorage.getItem('role')).id,
        descri: res.data.descri,
        funct: res.data.funct
      }
      res.data.menuButtons.forEach(item => {
        item.children.forEach(child => {
          child.children.forEach(grandson => {
            if (grandson.children) {
              grandson.children.forEach(greatgrandson => {
                this.menuButtons.push(greatgrandson.id)
              })
            } else {
              this.menuButtons.push(grandson.id)
            }
          })
        })
      })
      this.adddialog = true
      this.isEdit = true
      this.$nextTick(() => {
        this.$refs.multiCheckList.dealDatas()
      })
    },
    // 提交新增
    submitadd(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
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
          await userAdd(data)
          this.addemployeedialog = false
          this.$refs.pagination.refreshRequest()
          this.addemployeeform = {}
        }
      })
    },
    // 取消
    Cancle() {
      this.addemployeedialog = false
    },
    // 获取角色列表
    async roleList() {
      const data = {
        roleViewId: JSON.parse(localStorage.getItem('role')).id
      }
      const res = await roleDict(data)
      this.options = transroleList(res.data)
    },
    //  新增员工
    handleAddEmployee(row) {
      this.addemployeeform.function = row.id
      this.addemployeedialog = true
    },
    multipleSelection(val) {
      this.personSelecttion = val
    },
    // 查看用户
    async viewuser(id) {
      this.viewdialog = true
      const data = {
        id: id,
        nameOrEmail: ''
      }
      this.id = id
      const res = await ActiveUser(data)
      this.tabledata = res.data
    },
    // 删除角色
    delFunction(index) {
      this.$confirm(this.$t('userrole.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await roleDel(index)
          this.$refs.pagination.refreshRequest()
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
          const data = {
            userId: id,
            roleId: this.id
          }
          await ActiveUserDel(data)
          this.viewuser(this.id)
        })
    },
    // 查找激活用户
    async searchUser() {
      const data = {
        id: this.id,
        nameOrEmail: this.nameOrEmail
      }
      this.userLoading = true
      const res = await ActiveUser(data)
      this.userLoading = false
      this.tabledata = res.data
    },
    // 导出激活用户
    async exportUser() {
      const data = {
        id: this.id,
        nameOrEmail: ''
      }
      const res = await ActiveUserExport(data)
      window.open(res.data)
    }
  }
}
</script>
