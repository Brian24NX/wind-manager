<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyWord" size="small" style="width: 100%" placeholder="Keyword" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('addArticle.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="setdialog=true">{{ $t('userful.categoryset') }}</el-button>
        <el-button type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
        <el-button type="danger" size="small" @click="importdialog=true">{{ $t('userful.import') }}</el-button>
        <el-button type="danger" size="small" @click="download">{{ $t('userful.export') }}</el-button>
        <el-button type="danger" size="small" @click="handleAdd">{{ $t('userful.additem') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/templateList" :request-params="queryParams" :show-index="false" :selection-change="change" :show-check="true">
        <el-table-column align="center" :label="$t('userful.name')" prop="name" />

        <el-table-column :label="$t('userful.category')" prop="categoryName" />

        <el-table-column :label="$t('userful.document')" prop="document" :formatter="transdocument" />
        <el-table-column align="center" :label="$t('userful.reference')" prop="internalReference" />

        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <!--<el-button v-if="scope.row.status === 'Active'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.status === 'Deactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>-->
            <el-button size="small" type="text" @click="handleEdit(scope.row)">{{ $t('userful.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('userful.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--类别设置-->
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center :close-on-click-modal="false">
      <el-button size="small" type="primary" @click="createcategory">{{ $t('library.categorysetting') }}</el-button>
      <el-table :data="tabledata" style="width: 100%">
        <el-table-column :label="$t('business.category')">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.category" size="mini" />
            </span>
            <span v-else>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('business.creator')" align="center">
          <template scope="scope">
            <span v-if="scope.row.isSet">
              <el-input v-model="scope.row.creator" size="mini" />
            </span>
            <span v-else>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.isSet" :disabled="scope.row.category ? false : true" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
            <el-button v-if="!scope.row.isSet" :disabled="scope.row.category ? false : true" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--添加通告-->
    <el-dialog :title="$t('userful.additem')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false" width="650px">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('userful.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addform.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('userful.category')" :label-width="formLabelWidth" prop="categoryId">
          <el-select v-model="addform.categoryId" placeholder="请选择">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('userful.type')" :label-width="formLabelWidth" prop="type">
          <el-radio-group v-model="type">
            <el-radio
              v-for="item in typelist"
              :key="item.value"
              :label="item.value"
            >{{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="type==1" :label="$t('userful.uploadfile')" :label-width="formLabelWidth" prop="document">
          <!-- <el-date-picker type="date" placeholder="选择日期" v-model="historyform.publishdate" style="width: 100%"></el-date-picker>-->
          <el-upload
            ref="upload"
            class="upload-demo"
            action="/api/admin/uploadFile"
            :headers="uploadHeaders"
            :on-success="handleupSuccess"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('userful.uploadfile') }}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-show="type==2" :label="$t('userful.link')" :label-width="formLabelWidth" prop="document">
          <el-input v-model="addform.document" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('userful.reference')" :label-width="formLabelWidth" prop="internalReference">
          <el-input v-model="addform.internalReference" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('addform')">{{ $t('message.save') }}</el-button>
        <!-- <el-button v-show="isAdd" type="primary" @click="submitbusiness">{{ $t('addArticle.submit') }}</el-button>-->
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--导入模版-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center width="410px">
      <el-upload class="upload-demo" drag action="/api/admin/usefulTemplateImport" :limit="1" :on-success="handleSuccess" :headers="uploadHeaders" accept=".xlsx, .xls">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog=false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
// eslint-disable-next-line no-unused-vars
import { templateAdd, templateEdit, templateDelete, usefulTemplateDownload } from '@/api/useful.js'
// eslint-disable-next-line no-unused-vars
import { categoryList, categoryAdd, categoryDel, categoryEdit } from '@/api/article.js'
// eslint-disable-next-line no-unused-vars
import { getToken } from '@/utils/auth'
import { transList } from '@/utils'
export default {
  name: 'Useful',
  components: {
    Pagination
  },
  data() {
    return {
      uploadHeaders: { Authorization: getToken(), userId: JSON.parse(localStorage.getItem('userinfo')).id },
      queryParams: { keyWord: '' },
      categoryList: [],
      categoryadd: false,
      categoryedit: false,
      importdialog: false,
      type: 1,
      addform: {
        name: '',
        categoryId: '',
        type: '',
        document: '',
        internalReference: '',
        id: ''
      },
      isAdd: false,
      isEdit: false,
      adddialog: false,
      setdialog: false,
      filePath: process.env.VUE_APP_FILE_BASE_API,
      typelist: [{
        label: 'Document', value: 1
      }, {
        label: 'Link', value: 2
      }],
      formLabelWidth: '180px',
      rules: {
        name: { required: true, message: this.$t('userful.nametips'), trigger: 'blur' },
        categoryId: { required: true, message: this.$t('userful.categoryIdtips'), trigger: 'blur' },
        // type: { required: true, message: this.$t('userful.typetips'), trigger: 'change' },
        document: { required: true, message: this.$t('userful.documenttips'), trigger: 'blur' }
      },
      tabledata: [],
      selectcolumn: [],
      loading: false
    }
  },
  watch: {
    adddialog(val) {
      if (!val) {
        this.addform = {
          name: '',
          categoryId: '',
          type: '',
          document: '',
          internalReference: '',
          id: ''
        }
        this.loading = false
      }
    }
  },
  created() {
    this.getcategoryList()
  },
  methods: {
    reset() {
      this.queryParams = { keyWord: '' }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    transdocument(date) {
      // eslint-disable-next-line eqeqeq
      if (date.type == 1) {
        return this.filePath + date.document
      } else {
        return date.document
      }
    },
    handleupSuccess(res) {
      this.addform.document = res.data.fileName
    },
    //
    submitimport() {
      this.importdialog = false
      this.search()
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 3
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
      res.data.map(i => {
        i.isSet = false
      })
      this.tabledata = res.data
    },
    handleAdd() {
      this.isAdd = true
      this.adddialog = true
    },
    handleEdit(row) {
      this.addform = JSON.parse(JSON.stringify(row))
      this.isEdit = true
      this.adddialog = true
    },
    async save(formName) {
      const data = {
        name: this.addform.name,
        type: parseInt(this.type),
        categoryId: this.addform.categoryId,
        internalReference: this.addform.internalReference,
        document: this.addform.document,
        id: this.addform.id
      }
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          // eslint-disable-next-line eqeqeq
          if (this.isAdd == true) {
            data.createUser = JSON.parse(localStorage.getItem('userinfo')).id
            const res = await templateAdd(data)
            this.$message.success(res.message)
            this.adddialog = false
            this.$refs.pagination.pageRequest()
            this.isAdd = false
            this.loading = false
          } else {
            data.updateUser = JSON.parse(localStorage.getItem('userinfo')).id
            const res = await templateEdit(data)
            this.$message.success(res.message)
            this.adddialog = false
            this.$refs.pagination.pageRequest()
            this.isEdit = false
            this.loading = false
          }
        } else {
          return false
        }
      })
    },
    // 删除数据
    handleDelete(id) {
      this.$confirm(this.$t('business.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await templateDelete(id)
          this.$refs.pagination.pageRequest()
        })
    },
    // 搜索
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 下载文档
    downloadfile() {
      // const res = await usefulTemplateDownload()
      window.location.href = window.location.href = process.env.VUE_APP_FILE_BASE_API + 'import/Import Useful Links导入常用链接.xlsx'
    },
    // 取消
    Cancle() {
      this.isAdd = false
      this.isEdit = false
      this.$refs.addform.resetFields()
      this.adddialog = false
    },
    // 添加种类
    createcategory() {
      const data = {
        category: '',
        creator: '',
        isSet: true
      }
      this.tabledata.push(data)
      this.categoryadd = true
    },
    // 添加种类
    async Save(row) {
      const data = {
        id: row.id,
        category: row.category,
        creator: row.creator,
        type: 3,
        isSet: false
      }
      // eslint-disable-next-line eqeqeq
      if (this.categoryadd == true) {
        const res = await categoryAdd(data)
        this.$message.success(res.message)
        this.getcategoryList()
        this.categoryadd = false
      } else {
        const res = await categoryEdit(data)
        this.$message.success(res.message)
        this.getcategoryList()
        this.categoryedit = false
      }
    },
    // 编辑种类
    async Edit(row) {
      row.isSet = true
      this.categoryedit = true
    },
    // 删除种类
    async Delete(id) {
      this.$confirm(this.$t('navbar.delcatetitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await categoryDel(id)
          this.getcategoryList()
        })
    },
    change(selections) {
      if (selections.length < 2) {
        // eslint-disable-next-line eqeqeq
        if (selections.type == 1) {
          this.selectcolumn.push(selections.document)
        }
      } else {
        selections.map((i) => {
        // eslint-disable-next-line eqeqeq
          if (i.type == 1) {
            this.selectcolumn.push(i.document)
          }
        })
      }
    },
    download() {
      console.log(this.selectcolumn)
      this.selectcolumn.map((i) => {
        window.location.href = this.filePath + i
      })
    },
    handleSuccess(res) {
      // eslint-disable-next-line eqeqeq
      if (res.code != 200) {
        this.$message.error(res.message)
      }
    }
  }
}
</script>
<style scoped>

</style>
