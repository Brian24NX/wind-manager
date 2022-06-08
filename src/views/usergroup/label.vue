<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.name" size="small" style="width: 100%" :placeholder="$t('label.labelname')" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.company" size="small" style="width: 100%" :placeholder="$t('label.companyname')" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="submit">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('message.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="handleAdd">  {{ $t('label.add') }} </el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
        <el-table-column :label="$t('label.labelname')" prop="name" />
        <el-table-column align="center" :label="$t('label.description')" prop="description" />
        <el-table-column :label="$t('label.companycategory')" prop="companys" align="center" />
        <el-table-column align="center" :label="$t('label.usersnumber')" prop="userCount">
          <template scope="scope">
            <el-button size="small" type="text" @click="viewuser(scope.row.id)">{{ $t('label.viewuser') }}({{ scope.row.userCount }})</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="180px">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDel(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--新增编辑label-->
    <el-dialog :title="addform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" center width="800px" destroy-on-close :close-on-click-modal="false" top="60px">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('label.labelname')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addform.name" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" clearable :placeholder="$t('general.input')" @blur="addform.name = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('label.description')" :label-width="formLabelWidth" prop="description">
          <el-input v-model="addform.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.description = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item v-if="isEdit" :label="$t('label.companys')" :label-width="formLabelWidth" prop="companyId">
          <el-select v-model="addform.companyList" multiple collapse-tags filterable clearable style="width: 100%" placeholder="请选择">
            <el-option v-for="item in companylist" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="submitLoading" @click="submitlabel('addform')">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="resetForm('addform')">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--查询用户组成员-->
    <el-dialog :title="$t('label.viewuser')" :visible.sync="viewuserdialog" center width="800px" destroy-on-close :close-on-click-modal="false" top="60px">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="name" size="small" style="width: 100%" :placeholder="$t('label.user')" clearable />
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
        <el-table-column align="center" :label="$t('label.user')" prop="name" />
        <el-table-column align="center" :label="$t('label.companyname')" prop="company" />
        <el-table-column align="center" :label="$t('label.ecomaccount')" prop="email" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="60px">
          <template scope="scope">
            <el-button size="small" type="text" class="danger" @click="remove(scope.row)">{{ $t('userrole.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { labelAdd, labelEdit, labelDelete, labelDetail, labelUserList, labelUserExport, labelUserDelete, labelAllCompanyList } from '@/api/usergroup.js'
import Pagination from '@/components/Pagination'
// eslint-disable-next-line no-unused-vars
import { transcompany } from '@/utils/index'
export default {
  name: 'Label',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {
        company: '',
        name: ''
      },
      name: '',
      tabledata: [],
      userLoading: false,
      submitLoading: false,
      viewuserdialog: false,
      currentId: '',
      adddialog: false,
      isEdit: false,
      addform: {
        id: '',
        name: '',
        description: '',
        companyList: []
      },
      // 暂存数据
      stagedata: [],
      formLabelWidth: '120px',
      companylist: [],
      rules: {
        name: { required: true, message: this.$t('label.labelnametips'), trigger: 'blur' }
      }
    }
  },
  methods: {
    // 搜索
    submit() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams = {
        company: '',
        name: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    handleDel(id) {
      this.$confirm(this.$t('label.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await labelDelete(id)
          this.$refs.pagination.pageRequest()
        })
    },
    // 提交表单
    submitlabel(formName) {
      this.$refs[formName].validate(async(valid) => {
        // 提交表单
        // eslint-disable-next-line eqeqeq
        if (this.addform.id == undefined) {
          // 新增label
          this.submitLoading = true
          await labelAdd(this.addform)
          this.submitLoading = false
          this.adddialog = false
          this.$refs.pagination.refreshRequest()
        } else {
          this.addform.companyList.forEach(item => {
            const data = { companyId: Number(item) }
            this.stagedata.push(data)
          })
          this.addform.companyList = []
          this.addform.companyList = this.stagedata
          this.submitLoading = false
          await labelEdit(this.addform)
          this.addform.id = ''
          this.addform.name = ''
          this.addform.description = ''
          this.addform.companyList = []
          this.stagedata = []
          this.submitLoading = false
          this.adddialog = false
          this.isEdit = false
          this.$refs.pagination.refreshRequest()
        }
      })
    },
    // 取消表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.adddialog = false
      this.stagedata = []
      this.addform.id = ''
      this.addform.name = ''
      this.addform.description = ''
      this.addform.companyList = []
    },
    // 新增
    handleAdd() {
      this.adddialog = true
      this.addform = {}
    },
    // 编辑
    async handleEdit(row) {
      this.stagedata = []
      this.adddialog = true
      this.isEdit = true
      //    name: '',
      // description: '',
      // companyList: []
      const labelres = await labelDetail(row.id)
      this.addform.id = labelres.data.id
      this.addform.name = labelres.data.name
      this.addform.description = labelres.data.description
      labelres.data.companyList.forEach(item => {
        this.stagedata.push(item.companyId)
      })
      this.addform.companyList = this.stagedata
      this.stagedata = []
      const res = await labelAllCompanyList()
      this.companylist = transcompany(res.data)
    },
    // 查看启用列表
    async viewuser(id) {
      this.currentId = id
      this.viewuserdialog = true
      this.searchUser()
    },
    // 查询
    async searchUser() {
      const data = {
        id: this.currentId,
        name: this.name
      }
      console.log(data)
      const res = await labelUserList(data)
      this.tabledata = res.data
    },
    // 导出
    async exportUser() {
      const data = {
        id: Number(this.addform.id),
        name: this.name
      }
      const res = await labelUserExport(data)
      window.location.href = res.data
    },
    // 删除
    async remove(row) {
      this.$confirm(this.$t('label.delUsertitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          const data = {
            companyId: Number(row.companyId),
            labelId: this.currentId
          }
          await labelUserDelete(data)
          this.searchUser()
          this.$refs.pagination.pageRequest()
        })
    }
  }
}
</script>
<style lang="scss" scoped></style>
