<template>
  <div>
    <!--查询条件-->
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyWord" size="small" style="width: 100%" :placeholder="$t('faq.searchKeyword')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-select v-model="queryParams.active" size="small" :placeholder="$t('faq.status')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in activeList" :key="item.key" :label="item.value + ' / ' + item.valueCn" :value="item.key" />
              </el-select>
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
    <!--内容条件-->
    <div class="tableContainer">
      <div class="operations">
        <el-button v-permission="[32]" type="danger" size="small" @click="importFile">{{ $t('faq.import') }}</el-button>
        <el-button v-permission="[31]" type="danger" size="small" @click="handleAdd">{{ $t('faq.createinfo') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/getFaqList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('faq.question')" prop="question">
          <template scope="scope">
            <span style="white-space: pre-line">{{ scope.row.question }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('faq.keyword')" prop="faqKeywords" />
        <el-table-column :label="$t('faq.relatedquestion')" prop="faqRelations" align="center">
          <template scope="scope">
            {{ scope.row.faqRelations }}
            <el-button v-permission="[31]" size="small" type="text" icon="el-icon-search" @click="editrelations(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('faq.status')" prop="active" :formatter="transactive" width="150px" />
        <el-table-column align="center" :label="$t('faq.creator')" prop="creator" />
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" width="120px" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="180px">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row)">{{ $t('message.detail') }}</el-button>
            <el-button v-if="scope.row.active !== 1" v-permission="[31]" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="scope.row.active !== 1" v-permission="[33]" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('faq.active') }}</el-button>
            <el-button v-if="scope.row.active === 1" v-permission="[34]" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('faq.deactive') }}</el-button>
            <el-button v-permission="[35]" size="small" type="text" class="danger" @click="handleDel(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--导入模板-->
    <CustomerImport ref="customerImport" download-url="import/Import FAQs导入常见问题.xlsx" import-url="/api/admin/faqImport" :table-colum="tableColum" @success="search" />
    <!-- <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center destroy-on-close :close-on-click-modal="false" width="410px">
      <el-upload class="upload-demo" drag action="/api/admin/faqImport" :limit="1" :headers="uploadHeaders" :on-success="handleSuccess" accept=".xlsx, .xls">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog=false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog> -->
    <!--创建新的faq-->
    <el-dialog :title="addform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" center width="950px" destroy-on-close :close-on-click-modal="false" top="60px">
      <el-form ref="addform" :model="addform" label-position="top" :rules="rules">
        <el-form-item :label="$t('faq.question')" prop="question">
          <el-input v-model="addform.question" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" clearable :placeholder="$t('general.input')" @blur="addform.question = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('faq.answer')" prop="answer">
          <tinymce ref="editor" v-model="addform.answer" :height="350" />
        </el-form-item>
        <el-form-item :label="$t('faq.keyword')" prop="faqKeywords">
          <el-input v-model="addform.faqKeywords" autocomplete="off" clearable :placeholder="$t('faq.input')" @blur="addform.faqKeywords = $event.target.value.trim()" />
        </el-form-item>
        <!-- <el-form-item :label="$t('faq.status')" prop="active">
          <el-radio-group v-model="addform.active">
            <el-radio :label="1">{{ $t('contact.active') }}</el-radio>
            <el-radio :label="0">{{ $t('contact.deactive') }}</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="submitLoading" @click="submitfaq">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog :title="$t('message.detail')" :visible.sync="isSelect" center width="800px" destroy-on-close :close-on-click-modal="false" top="60px">
      <el-form ref="addform" label-position="top" :model="detailForm">
        <el-form-item :label="$t('faq.question')" prop="question">
          <el-input v-model="detailForm.question" disabled type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" clearable />
        </el-form-item>
        <el-form-item :label="$t('faq.answer')" prop="answer">
          <div class="detailContent" v-html="detailForm.answer" />
        </el-form-item>
        <el-form-item :label="$t('faq.keyword')" prop="faqKeywords">
          <el-input v-model="detailForm.faqKeywords" disabled autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item :label="$t('faq.status')" prop="active">
          <el-radio-group v-model="detailForm.active" disabled>
            <el-radio :label="1">{{ $t('contact.active') }}</el-radio>
            <el-radio :label="0">{{ $t('contact.deactive') }}</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
    </el-dialog>
    <!--编辑relations-->
    <el-dialog :title="$t('route.faqManagement')" :visible.sync="relationsdialog" center destroy-on-close :close-on-click-modal="false">
      <el-form ref="relationsform" :model="relationsform" :rules="relationsrules">
        <el-form-item :label="$t('faq.relatedquestion')" prop="faqRelations">
          <el-select v-model="relationsform.faqRelations" multiple clearable filterable style="width: 100%" :placeholder="$t('general.choose')">
            <el-option
              v-for="item in faqLists"
              :key="item.value"
              :label="item.question"
              :value="item.id"
            />
          </el-select>
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
import CustomerImport from '@/components/Import/import'
import { dictItem } from '@/api/system/dict/dict'
import Tinymce from '@/components/Tinymce'
import { faqList, faqAdd, faqDel, faqEdit, faqEditRelations, faqActive } from '@/api/faq'
export default {
  name: 'FaqManagement',
  components: {
    Pagination,
    Tinymce,
    CustomerImport
  },
  data() {
    return {
      queryParams: { keyWord: '', active: '' },
      activeList: [],
      categoryList: [],
      adddialog: false,
      relationsdialog: false,
      addform: {
        id: '',
        question: '',
        answer: '',
        faqKeywords: '',
        active: 2 // 0: 禁用 1: 启用  2: 待审核
      },
      detailForm: {},
      relationsform: {
        id: '',
        faqRelations: []
      },
      isSelect: false,
      isAdd: false,
      rules: {},
      relationsrules: {
        relatedquestion: { required: true, message: this.$t('faq.relatedquestiontips'), trigger: 'blur' }
      },
      submitLoading: false,
      faqLists: [],
      tableColum: [{
        prop: 'question',
        label: 'question',
        width: '200px'
      }, {
        prop: 'faqKeywords',
        label: 'faqKeywords',
        width: '200px'
      }, {
        prop: 'answer',
        label: 'answer',
        width: '600px'
      }]
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
          active: 2
        }
        setTimeout(() => {
          this.$refs.editor.setContent('')
        }, 300)
        this.submitLoading = false
      }
    },
    '$store.getters.language'() {
      this.setRules()
    },
    relationsdialog(newValue) {
      if (!newValue) {
        this.relationsform = {
          id: '',
          faqRelations: []
        }
      }
    }
  },
  created() {
    this.getFaqLists()
    this.getActivedList()
  },
  mounted() {
    this.setRules()
  },
  methods: {
    getActivedList() {
      dictItem('dict_active').then(res => {
        console.log(res)
        const arr = [{ key: 2, value: 'Waiting for Approval', valueCn: '待审核' }]
        this.activeList = arr.concat(res.data)
      })
    },
    setRules() {
      this.rules = {
        question: { required: true, message: this.$t('faq.questiontips'), trigger: 'blur' },
        answer: { required: true, message: this.$t('faq.answertips'), trigger: 'blur' },
        faqKeywords: { required: true, message: this.$t('faq.faqKeywords'), trigger: 'blur' }
      }
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.addform ? this.$refs.addform.clearValidate() : null
        })
      }, 1)
    },
    getFaqLists() {
      faqList({
        pageNum: 1,
        pageSize: 9999,
        keyWord: '',
        active: '1'
      }).then(res => {
        this.faqLists = res.data.list
      })
    },
    // 处理详情
    handleDetail(row) {
      this.isSelect = true
      this.detailForm = JSON.parse(JSON.stringify(row))
    },
    // 查询
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams = { keyWord: '' }
      setTimeout(() => {
        this.search()
      }, 100)
    },
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD')
    },
    // 激活启用
    transactive(data) {
      if (data.active === 1) {
        return 'Active'
      } else if (data.active === 0) {
        return 'Deactive'
      } else {
        return 'Waiting for Approval'
      }
    },
    // 提交faq
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
            data.createUser = JSON.parse(localStorage.getItem('userInfo')).id
            faqAdd(data).then(res => {
              this.Cancle()
              this.$refs.pagination.pageRequest()
              this.getFaqLists()
            })
          } else {
            data.updateUser = JSON.parse(localStorage.getItem('userInfo')).id
            faqEdit(data).then(res => {
              this.Cancle()
              this.$refs.pagination.pageRequest()
              this.getFaqLists()
            })
          }
        } else {
          return false
        }
      })
    },
    // 删除数据
    handleDel(id) {
      this.$confirm(this.$t('faq.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await faqDel(id)
          this.$refs.pagination.pageRequest()
          this.getFaqLists()
        })
    },
    // 状态改变
    async handleUpdateStatus(row, active) {
      const data = {
        id: row.id,
        active: active,
        userId: JSON.parse(localStorage.getItem('userInfo')).id
      }
      await faqActive(data)
      this.$refs.pagination.pageRequest()
    },
    // 编辑状态
    handleEdit(row) {
      this.isAdd = false
      this.adddialog = true
      this.addform = JSON.parse(JSON.stringify(row))
      this.addform.active = 2
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
      this.adddialog = false
    },
    // 编辑关联问题
    editrelations(row) {
      const relationsform = JSON.parse(JSON.stringify(row))
      this.relationsform = {
        id: relationsform.id,
        faqRelations: relationsform.faqRelations ? relationsform.faqRelations.split(',').map(Number) : []
      }
      this.relationsdialog = true
    },
    // 编辑并修改问题
    async submitrelations() {
      this.$refs['relationsform'].validate(async(valid) => {
        if (valid) {
          const data = {
            id: this.relationsform.id,
            faqRelations: this.relationsform.faqRelations.join(','),
            updateUser: JSON.parse(localStorage.getItem('userInfo')).id
          }
          await faqEditRelations(data)
          this.$refs.pagination.pageRequest()
          this.getFaqLists()
          this.relationsdialog = false
        } else {
          return false
        }
      })
    },
    // 去掉提交relations
    Canclerelations() {
      this.relationsdialog = false
    },
    // 导出
    exporttemplate() {},
    importFile() {
      this.$refs.customerImport.importFile()
    }
  }
}
</script>
<style lang="scss" scoped></style>
