<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.company" size="small" style="width: 100%" placeholder="Company Name" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.companycategory" size="small" style="width: 100%" placeholder="Company Category" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="submit">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('addArticle.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="handleAdd">  {{ $t('label.add') }} </el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
        <el-table-column :label="$t('label.labelname')" prop="labelname" />
        <el-table-column align="center" :label="$t('label.description')" prop="description" />
        <el-table-column :label="$t('label.companycategory')" prop="companycategory" align="center" />
        <el-table-column align="center" :label="$t('label.usersnumber')" prop="usersnumber">
          <template scope="scope">
            <el-button size="small" type="text" @click="viewuser(scope.row)">View Users({{ scope.row.usersnumber }})</el-button>
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
    <el-dialog :title="$t('route.labelManagement')" :visible.sync="adddialog" center width="800px" destroy-on-close :close-on-click-modal="false" top="60px">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('label.labelname')" :label-width="formLabelWidth" prop="labelname">
          <el-input v-model="addform.labelname" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" clearable @blur="addform.labelname = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('label.description')" :label-width="formLabelWidth" prop="labeldescription">
          <el-input v-model="addform.labeldescription" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" autocomplete="off" clearable @blur="addform.labeldescription = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item v-if="isEdit" :label="$t('label.companys')" :label-width="formLabelWidth" prop="companyid">
          <el-select v-model="addform.companyId" multiple collapse-tags filterable clearable style="width: 100%" placeholder="请选择">
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
              <el-input v-model="username" size="small" style="width: 100%" placeholder="Username" clearable />
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
        <el-table-column align="center" :label="$t('label.user')" prop="user" />
        <el-table-column align="center" :label="$t('label.companyname')" prop="companyname" />
        <el-table-column align="center" :label="$t('label.ecomaccount')" prop="ecomaccount" />
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'Label',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {
        company: '',
        companycategory: ''
      },
      submitLoading: false,
      adddialog: false,
      addform: {
        id: '',
        labelname: '',
        labeldescription: '',
        companyId: []
      },
      companylist: [],
      rules: {
        labelname: { required: true, message: this.$t('label.labelnametips'), trigger: 'blur' }
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
        categoryIds: '',
        keyword: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 提交表单
    submitlabel(formName) {
      this.$refs[formName].validate((valid) => {
        this.submitLoading = true
        // 提交表单
        // eslint-disable-next-line eqeqeq
        if (this.addform.id == '') {
          // 新增label
        } else {
          // 编辑label
        }
      })
    },
    // 取消表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.adddialog = false
    },
    // 新增
    handleAdd() {
      this.adddialog = true
      this.addform = {}
    },
    // 编辑
    handleEdit(row) {
      this.adddialog = true
      this.addform = JSON.parse(JSON.stringify(row))
    }
  }
}
</script>
<style lang="scss" scoped></style>
