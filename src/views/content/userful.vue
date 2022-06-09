<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyWord" size="small" style="width: 100%" :placeholder="$t('userful.name')" clearable />
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
        <el-button v-permission="[47]" type="danger" size="small" @click="setdialog=true">{{ $t('userful.categoryset') }}</el-button>
        <el-button v-permission="[48]" type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
        <el-button v-permission="[48]" type="danger" size="small" @click="importdialog=true">{{ $t('userful.import') }}</el-button>
        <!-- <el-button v-permission="[49]" type="danger" size="small" @click="download">{{ $t('userful.export') }}</el-button>-->
        <el-button v-permission="[46]" type="danger" size="small" @click="handleAdd">{{ $t('userful.additem') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/templateList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('userful.name')" prop="name" />
        <el-table-column :label="$t('userful.category')" prop="categoryName" align="center" width="150px" />
        <el-table-column :label="$t('userful.document')" prop="document">
          <template scope="scope">
            <span v-if="scope.row.type === 2" style="white-space: pre-line">{{ scope.row.document }}</span>
            <span v-else>{{ transdocument(scope.row.document) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('userful.reference')" prop="internalReference">
          <template scope="scope">
            <span style="white-space: pre-line">{{ scope.row.internalReference }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="150px">
          <template scope="scope">
            <el-button v-permission="[50]" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('userful.edit') }}</el-button>
            <el-button v-if="scope.row.type==1" v-permission="[49]" size="small" type="text" @click="download(scope.row.document)">{{ $t('userful.download') }}</el-button>
            <el-button v-permission="[51]" size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('userful.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--类别设置-->
    <el-dialog :title="$t('business.categoryset')" :visible.sync="setdialog" center :close-on-click-modal="false">
      <el-button size="small" type="danger" @click="createcategory">{{ $t('library.categorysetting') }}</el-button>
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
            <el-button v-if="scope.row.isSet" size="small" type="text" @click="Save(scope.row)">{{ $t('message.save') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Edit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="!scope.row.isSet" size="small" type="text" @click="Delete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--添加通告-->
    <el-dialog :title="addform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" center destroy-on-close :close-on-click-modal="false" width="650px">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('userful.name')" :label-width="formLabelWidth" prop="name">
          <el-input v-model="addform.name" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.name = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userful.category')" :label-width="formLabelWidth" prop="categoryId">
          <el-select v-model="addform.categoryId" :placeholder="$t('general.choose')">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('userful.type')" :label-width="formLabelWidth" prop="type">
          <el-radio-group v-model="addform.type">
            <el-radio
              v-for="item in typelist"
              :key="item.value"
              :label="item.value"
            >{{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="addform.type==1" :label="$t('userful.uploadfile')" :label-width="formLabelWidth" prop="document">
          <!-- <el-date-picker type="date" placeholder="选择日期" v-model="historyform.publishdate" style="width: 100%"></el-date-picker>-->
          <el-upload
            ref="upload"
            class="upload-demo"
            action="/api/admin/uploadFile"
            :headers="uploadHeaders"
            :on-preview="handPreview"
            :on-remove="handRemove"
            :on-success="handleupSuccess"
            :limit="1"
            :file-list="fileList"
          >
            <el-button slot="trigger" size="small" type="primary">{{ $t('userful.uploadfile') }}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-show="addform.type==2" :label="$t('userful.link')" :label-width="formLabelWidth" prop="document">
          <el-input v-model="addform.document" autocomplete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" clearable @blur="addform.document = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('userful.reference')" :label-width="formLabelWidth" prop="internalReference">
          <el-input v-model="addform.internalReference" autocomplete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }" clearable @blur="addform.internalReference = $event.target.value.trim()" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('addform')">{{ $t('message.save') }}</el-button>
        <!-- <el-button v-show="isAdd" type="primary" @click="submitbusiness">{{ $t('addArticle.submit') }}</el-button>-->
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--导入模版-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center destroy-on-close :close-on-click-modal="false" width="410px">
      <el-upload class="upload-demo" drag action="/api/admin/usefulTemplateImport" :limit="1" :on-success="handleSuccess" :headers="uploadHeaders" accept=".xlsx, .xls">
        <i class="el-icon-upload" />
        <div class="el-upload__text">{{ $t('general.upload') }}<em>{{ $t('general.uploadTips') }}</em></div>
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
      uploadHeaders: { Authorization: getToken(), userId: JSON.parse(localStorage.getItem('userInfo')).id },
      queryParams: { keyWord: '' },
      categoryList: [],
      categoryedit: false,
      importdialog: false,
      addform: {
        name: '',
        categoryId: '',
        type: 1,
        document: '',
        internalReference: '',
        id: ''
      },
      fileList: [],
      isAdd: false,
      adddialog: false,
      setdialog: false,
      typelist: [{
        label: 'Document', value: 1
      }, {
        label: 'Link', value: 2
      }],
      formLabelWidth: '110px',
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
          type: 1,
          document: '',
          internalReference: '',
          id: ''
        }
        this.fileList = []
        this.loading = false
      }
    },
    setdialog(val) {
      if (!val) {
        this.getcategoryList()
      }
    }
  },
  created() {
    this.getcategoryList()
  },
  methods: {
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD')
    },
    // 置空列表
    reset() {
      this.queryParams = { keyWord: '' }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 文档处理
    transdocument(document) {
      return process.env.VUE_APP_FILE_BASE_API + document
    },
    // 文件上传成功
    handleupSuccess(res) {
      this.addform.document = res.data.fileName
    },
    // 提交导入
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
    // 新增
    handleAdd() {
      this.isAdd = true
      this.adddialog = true
    },
    // 编辑
    handleEdit(row) {
      this.addform = JSON.parse(JSON.stringify(row))
      if (this.categoryList.findIndex(i => i.value === row.categoryId) === -1) {
        this.addform.categoryId = ''
      }
      if (this.addform.type === 1) {
        if (row.document) {
          this.fileList = [{
            name: row.document.split('wind/')[1],
            url: process.env.VUE_APP_FILE_BASE_API + row.document
          }]
        }
      }
      this.isAdd = false
      this.adddialog = true
    },
    async save(formName) {
      const data = {
        name: this.addform.name,
        type: this.addform.type,
        categoryId: this.addform.categoryId,
        internalReference: this.addform.internalReference,
        document: this.addform.document,
        id: this.addform.id
      }
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          console.log(this.addform.document)
          if (!this.addform.document) {
            this.$message.error(this.$t('userful.documenttips'))
            return
          }
          this.loading = true
          if (this.isAdd) {
            data.createUser = JSON.parse(localStorage.getItem('userInfo')).id
            await templateAdd(data)
            this.adddialog = false
            this.$refs.pagination.pageRequest()
            this.loading = false
          } else {
            data.updateUser = JSON.parse(localStorage.getItem('userInfo')).id
            await templateEdit(data)
            this.adddialog = false
            this.$refs.pagination.pageRequest()
            this.loading = false
          }
        } else {
          return false
        }
      })
    },
    // 删除数据
    handleDelete(id) {
      this.$confirm(this.$t('userful.deltitle'), this.$t('message.delete'), {
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
      window.open(process.env.VUE_APP_FILE_BASE_API + 'import/Import Useful Links导入常用链接.xlsx')
    },
    // 取消
    Cancle() {
      this.$refs.addform.resetFields()
      this.adddialog = false
    },
    // 添加种类
    createcategory() {
      const data = {
        category: '',
        creator: '',
        isSet: true,
        categoryadd: true
      }
      this.tabledata.push(data)
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
      if (!data.category) {
        this.$message.error('类别不能为空')
        return
      }
      if (row.categoryadd) {
        const res = await categoryAdd(data)
        data.id = res.data
        this.$set(this.tabledata, this.tabledata.indexOf(row), data)
      } else {
        await categoryEdit(data)
        this.$set(this.tabledata, this.tabledata.indexOf(row), data)
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
          // 删除表格当前行
          this.tabledata.map((i, index) => {
            if (i.id === id) {
              this.tabledata.splice(index, 1)
            }
          })
        })
    },
    // 改变
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
    // 下载
    download(url) {
      window.open(process.env.VUE_APP_FILE_BASE_API + url)
    },
    // 预览
    handPreview() {},
    // 移除
    handRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    // 成功
    handleSuccess(response, file, fileList) {
      // if (response.code === '200') {
      //   this.fileList.push({ name: response.data.fileName, url: response.data.fileUrl })
      //   this.addform.uploadfile = response.data.fileName
      // } else {
      //   this.$message.error(response.message)
      //   this.fileList = []
      // }
    }
  }
}
</script>
<style scoped>

</style>
