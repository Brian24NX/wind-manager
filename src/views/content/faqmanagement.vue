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
            <el-button type="danger" size="small" @click="adddialog = true">{{ $t('faq.createinfo') }}</el-button>
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
        <el-table-column align="center" :label="$t('faq.answer')" prop="answer" />
        <el-table-column align="center" :label="$t('faq.creator')" prop="createUser" />
        <el-table-column align="center" :label="$t('faq.updatetime')" prop="updateTime" />
        <el-table-column align="center" :label="$t('faq.status')" prop="status" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.status === 'Undeactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('faq.active') }}</el-button>
            <el-button v-if="scope.row.status === 'Deactive'" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('faq.deactive') }}</el-button>
            <el-button v-if="scope.row.status === 'Undeactive'" size="small" type="text" @click="handleEdit(scope.row.id)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="deldialog = true">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--删除faq-->
    <el-dialog :title="$t('newscenter.del')" :visible.sync="deldialog" center>
      <span>{{ $t('faq.deltitle') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitdel">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="deldialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </span>
    </el-dialog>
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
          <el-input v-model="addform.keyword" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submithistory">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="addhistorynewsdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Tinymce from '@/components/Tinymce'
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
        question: '',
        answer: '',
        keyword: ''
      },
      rules: {
        question: { required: true, message: '请输入question', trigger: 'blur' },
        answer: { required: true, message: '请输入answer', trigger: 'blur' },
        keyword: { required: true, message: 'To add more key words, please enter key words or phrases separated by a comma', trigger: 'blur' }
      }
    }
  },
  methods: {
    downloadfile() {
      window.location.href = 'https://uat.wind-admin.cma-cgm.com/api/admin/import/user_tm.xlsx'
    }
  }
}
</script>
<style lang="scss" scoped></style>
