<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.title" size="small" style="width: 100%" placeholder="Keyword" suffix-icon="el-icon-search" clearable />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" plain @click="exporttemplate">{{ $t('faq.export') }}</el-button>
            <el-button type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
            <el-button type="danger" size="small" plain @click="importdialog = true">{{ $t('faq.import') }}</el-button>
            <el-button type="danger" size="small" @click="handleAdd">{{ $t('faq.createinfo') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/api/admin/getFaqList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('faq.id')" prop="id" />
        <el-table-column align="center" :label="$t('faq.question')" prop="question" />
        <el-table-column :label="$t('faq.keyword')" prop="faqKeywords" />
        <el-table-column :label="$t('faq.relatedquestion')" prop="faqRelations" align="center" />
        <!-- <el-table-column align="center" :label="$t('faq.answer')" prop="answer" /> -->
        <el-table-column align="center" :label="$t('faq.creator')" prop="createUser" />
        <el-table-column align="center" :label="$t('faq.updatetime')" prop="updateTime" />
        <el-table-column align="center" :label="$t('faq.status')" prop="active" />
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
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center>
      <el-upload class="upload-demo" drag action="/api/admin/uploadFile" :limit="1">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
    <!--创建新的faq-->
    <el-dialog :title="$t('faq.createinfo')" :visible.sync="adddialog" center>
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('faq.question')" :label-width="formLabelWidth" prop="question">
          <!--<el-input v-model="addform.question" autocomplete="off"></el-input>-->
          <el-input v-model="addform.question" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" />
        </el-form-item>
        <el-form-item :label="$t('faq.answer')" :label-width="formLabelWidth" prop="answer">
          <!-- <el-input v-model="addform.answer" autocomplete="off"></el-input>-->
          <tinymce v-model="addform.answer" :height="350" />
        </el-form-item>
        <el-form-item :label="$t('faq.keyword')" :label-width="formLabelWidth" prop="keyword">
          <el-input v-model="addform.faqKeywords" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitfaq">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Tinymce from '@/components/Tinymce'
// eslint-disable-next-line no-unused-vars
import { faqAdd, faqDel, faqEdit, faqActive } from '@/api/faq'
export default {
  name: 'FaqManagement',
  components: {
    Pagination,
    Tinymce
  },
  data() {
    return {
      queryParams: {},
      categoryList: [],
      adddialog: false,
      importdialog: false,
      formLabelWidth: '120px',
      addform: {
        id: '',
        question: '',
        answer: '',
        faqKeywords: ''
      },
      isEdit: false,
      isAdd: false,
      rules: {
        question: { required: true, message: '请输入question', trigger: 'blur' },
        answer: { required: true, message: '请输入answer', trigger: 'blur' },
        faqKeywords: { required: true, message: 'To add more key words, please enter key words or phrases separated by a comma', trigger: 'blur' }
      }
    }
  },
  methods: {
    async submitfaq() {
      const data = {
        id: this.addform.id,
        question: this.addform.question,
        answer: this.addform.answer,
        faqKeywords: this.addform.faqKeywords,
        active: 1
      }
      if (this.isAdd) {
        const res = await faqAdd(data)
        this.$message.info(res.message)
        this.isAdd = false
        this.adddialog = false
        this.addform = {}
        this.$refs.pagination.refreshRequest()
      } else {
        const res = await faqEdit(data)
        this.$message.info(res.message)
        this.isEdit = false
        this.adddialog = false
        this.addform = {}
        this.$refs.pagination.refreshRequest()
      }
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
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 状态改变
    async handleUpdateStatus(row, active) {
      const data = {
        id: row.id,
        active: active
      }
      const res = await faqActive(data)
      this.$message.info(res.message)
      this.$refs.pagination.refreshRequest()
    },
    // 编辑状态
    handleEdit(row) {
      this.isEdit = true
      this.adddialog = true
      this.addform = row
    },
    // 新增状态
    handleAdd() {
      this.isAdd = true
      this.adddialog = true
      this.addform = {}
    },
    // 取消
    Cancle() {
      this.isAdd = false
      this.isEdit = false
      this.addform = {}
      this.adddialog = false
    },
    downloadfile() {
      window.location.href = 'https://uat.wind-admin.cma-cgm.com/api/admin/import/user_tm.xlsx'
    }
  }
}
</script>
<style lang="scss" scoped></style>
