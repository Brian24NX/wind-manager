<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyWord" size="small" style="width: 100%" placeholder="Keyword" suffix-icon="el-icon-search" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="primary" size="small" @click="search">{{ $t('message.search') }}</el-button>
            <el-button type="primary" size="small" plain @click="reset">{{ $t('addArticle.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <div class="operations">
        <el-button type="primary" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
        <el-button type="primary" size="small" @click="importdialog = true">{{ $t('faq.import') }}</el-button>
        <el-button type="primary" size="small" @click="handleAdd">{{ $t('faq.createinfo') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/getFaqList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('faq.id')" prop="id" />
        <el-table-column align="center" :label="$t('faq.question')" prop="question" />
        <el-table-column :label="$t('faq.keyword')" prop="faqKeywords" />
        <el-table-column :label="$t('faq.relatedquestion')" prop="faqRelations" align="center">
          <template scope="scope">
            {{ scope.row.faqRelations }}
            <el-button size="small" type="text" icon="el-icon-search" @click="editrelations(scope.row)" />
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" :label="$t('faq.answer')" prop="answer" />-->
        <el-table-column align="center" :label="$t('faq.creator')" prop="createUser" />
        <el-table-column align="center" :label="$t('faq.updatetime')" prop="updateTime" :formatter="formatDate" />
        <el-table-column align="center" :label="$t('faq.status')" prop="active" :formatter="transactive" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.active === 0" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('faq.active') }}</el-button>
            <el-button v-if="scope.row.active === 1" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('faq.deactive') }}</el-button>
            <el-button v-if="scope.row.active === 0" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDel(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--导入模版-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center width="410px">
      <el-upload class="upload-demo" drag action="/api/admin/faqImport" :limit="1" :headers="uploadHeaders" :on-success="handleSuccess" accept=".xlsx, .xls">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog=false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--创建新的faq-->
    <el-dialog :title="$t('route.faqManagement')" :visible.sync="adddialog" center width="800px" destroy-on-close :close-on-click-modal="false">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('faq.question')" :label-width="formLabelWidth" prop="question">
          <!--<el-input v-model="addform.question" autocomplete="off"></el-input>-->
          <el-input v-model="addform.question" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" />
        </el-form-item>
        <el-form-item :label="$t('faq.answer')" :label-width="formLabelWidth" prop="answer">
          <!-- <el-input v-model="addform.answer" autocomplete="off"></el-input>-->
          <tinymce ref="editor" v-model="addform.answer" :height="350" />
        </el-form-item>
        <el-form-item :label="$t('faq.keyword')" :label-width="formLabelWidth" prop="faqKeywords">
          <el-input v-model="addform.faqKeywords" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('faq.status')" :label-width="formLabelWidth" prop="active">
          <el-radio-group v-model="addform.active">
            <el-radio :label="1">{{ $t('contact.active') }}</el-radio>
            <el-radio :label="0">{{ $t('contact.deactive') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="submitLoading" @click="submitfaq">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--编辑relations-->
    <el-dialog :title="$t('route.faqManagement')" :visible.sync="relationsdialog" center>
      <el-form ref="relationsform" :model="relationsform" :rules="relationsrules">
        <el-form-item :label="$t('faq.relatedquestion')" :label-width="formLabelWidth" prop="faqRelations">
          <el-input v-model="relationsform.faqRelations" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitrelations">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Canclerelations">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Tinymce from '@/components/Tinymce'
// eslint-disable-next-line no-unused-vars
import { faqAdd, faqDel, faqEdit, faqEditRelations, faqActive, faqTemplateDownload } from '@/api/faq'
import { getToken } from '@/utils/auth'
export default {
  name: 'FaqManagement',
  components: {
    Pagination,
    Tinymce
  },
  data() {
    return {
      uploadHeaders: { 'Authorization': getToken() },
      queryParams: { keyWord: '' },
      categoryList: [],
      adddialog: false,
      importdialog: false,
      relationsdialog: false,
      formLabelWidth: '120px',
      addform: {
        id: '',
        question: '',
        answer: '',
        faqKeywords: '',
        active: 1
      },
      relationsform: {
        id: '',
        relatedquestion: ''
      },
      isEdit: false,
      isAdd: false,
      rules: {
        question: { required: true, message: '请输入question', trigger: 'blur' },
        answer: { required: true, message: '请输入answer', trigger: 'blur' },
        faqKeywords: { required: true, message: 'To add more key words, please enter key words or phrases separated by a comma', trigger: 'blur' }
      },
      relationsrules: {
        relatedquestion: { required: true, message: '请输入question', trigger: 'blur' }
      },
      submitLoading: false
    }
  },
  watch: {
    adddialog(newValue) {
      if (!newValue) {
        this.addform = {
          id: '',
          question: '',
          answer: '',
          faqKeywords: '',
          active: 1
        }
        setTimeout(() => {
          this.$refs.editor.setContent('')
        }, 300)
        this.submitLoading = false
      }
    }
  },
  methods: {
    submitimport() {
      this.importdialog = false
      this.search()
    },
    search() {
      this.$refs.pagination.refreshRequest()
    },
    reset() {
      this.queryParams = { keyWord: '' }
      setTimeout(() => {
        this.search()
      }, 100)
    },
    formatDate(date) {
      return this.$moment(date.publishDate).format('YYYY-MM-DD')
    },
    transactive(data) {
      // eslint-disable-next-line eqeqeq
      if (data.active == 1) {
        return 'Active'
      } else {
        return 'Deactive'
      }
    },
    async submitfaq() {
      this.$refs['addform'].validate((valid) => {
        if (valid) {
          const data = {
            id: this.addform.id,
            question: this.addform.question,
            answer: this.addform.answer,
            faqKeywords: this.addform.faqKeywords,
            active: this.addform.active
          }
          if (this.isAdd) {
            faqAdd(data).then(res => {
              this.$message.success(res.message)
              this.isAdd = false
              this.adddialog = false
              this.$refs.pagination.refreshRequest()
            })
          } else {
            faqEdit(data).then(res => {
              this.$message.success(res.message)
              this.isEdit = false
              this.adddialog = false
              this.$refs.pagination.refreshRequest()
            })
          }
        } else {
          return false
        }
      })
    },
    // 删除数据
    handleDel(id) {
      console.log(id)
      this.$confirm(this.$t('faq.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await faqDel(id)
          this.$refs.pagination.refreshRequest()
        })
    },
    // 状态改变
    async handleUpdateStatus(row, active) {
      const data = {
        id: row.id,
        active: active
      }
      const res = await faqActive(data)
      this.$message.success(res.message)
      this.$refs.pagination.refreshRequest()
    },
    // 编辑状态
    handleEdit(row) {
      this.isEdit = true
      this.adddialog = true
      this.addform = JSON.parse(JSON.stringify(row))
      setTimeout(() => {
        this.$refs.editor.setContent(row.answer)
      }, 300)
    },
    // 新增状态
    handleAdd() {
      this.isAdd = true
      this.adddialog = true
    },
    // 取消
    Cancle() {
      this.isAdd = false
      this.isEdit = false
      this.adddialog = false
    },
    // 编辑关联问题
    editrelations(row) {
      this.relationsform = JSON.parse(JSON.stringify(row))
      this.relationsdialog = true
    },
    // 编辑并修改问题
    async submitrelations() {
      const data = {
        id: this.relationsform.id,
        faqRelations: this.relationsform.faqRelations
      }
      const res = await faqEditRelations(data)
      this.$message.success(res.message)
      this.search()
      this.relationsform = {}
      this.relationsdialog = false
    },
    Canclerelations() {
      this.relationsform = {}
      this.relationsdialog = false
    },
    async downloadfile() {
      const res = await faqTemplateDownload()
      window.location.href = res.data
    },
    // 导出
    exporttemplate() {},
    // 处理成功
    handleSuccess(res) {
      // eslint-disable-next-line eqeqeq
      if (res.code != 200) {
        this.$message.error(res.message)
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
