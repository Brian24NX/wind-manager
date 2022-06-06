<template>
  <div>
    <!--查询模块-->
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyword" size="small" style="width: 100%" :placeholder="$t('sanctions.keyword')" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.referenceNo" size="small" style="width: 100%" :placeholder="$t('sanctions.referencenumber')" clearable />
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
    <!--内容模块-->
    <div class="tableContainer">
      <div class="operations">
        <el-button v-permission="[54]" type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
        <el-button v-permission="[54]" type="danger" size="small" @click="importdialog=true">{{ $t('sanctions.import') }}</el-button>
        <el-button v-permission="[55]" type="danger" size="small" @click="download">{{ $t('sanctions.export') }}</el-button>
        <el-button v-permission="[53]" type="danger" size="small" @click="handleAdd">{{ $t('sanctions.newitem') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/sanctionCommodityList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('sanctions.commodityzh')" prop="commodityCn" />
        <el-table-column :label="$t('sanctions.commodityen')" prop="commodityEn" />
        <el-table-column :label="$t('sanctions.referencenumber')" prop="referenceNo" align="center" />
        <el-table-column align="center" :label="$t('sanctions.type')" prop="type" />
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="180px">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row)">{{ $t('message.detail') }}</el-button>
            <el-button v-if="scope.row.active === 0" v-permission="[56]" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-if="scope.row.active === 1" v-permission="[58]" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.active === 0" v-permission="[57]" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-permission="[59]" size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--新增通告-->
    <el-dialog :title="addform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" center width="800px" :close-on-click-modal="false" destroy-on-close top="50px">
      <el-form ref="addform" :model="addform" :rules="rules">
        <el-form-item :label="$t('sanctions.commodityzh')" :label-width="formLabelWidth" prop="commodityCn">
          <el-input v-model="addform.commodityCn" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.commodityCn = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.commodityen')" :label-width="formLabelWidth" prop="commodityEn">
          <el-input v-model="addform.commodityEn" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.commodityEn = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.referencenumber')" :label-width="formLabelWidth" prop="referenceNo">
          <el-input v-model="addform.referenceNo" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.referenceNo = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.type')" :label-width="formLabelWidth" prop="type">
          <el-input v-model="addform.type" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.type = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarkszh')" :label-width="formLabelWidth" prop="remarkCn">
          <tinymce ref="editor1" v-model="addform.remarkCn" :height="250" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarksen')" :label-width="formLabelWidth" prop="remarkEn">
          <tinymce ref="editor2" v-model="addform.remarkEn" :height="250" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savesanctions('addform')">{{ $t('message.save') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!---->
    <el-dialog :title="$t('message.detail')" :visible.sync="detaildialog" center width="800px" :close-on-click-modal="false" destroy-on-close top="50px">
      <el-form ref="detailform" :model="detailform">
        <el-form-item :label="$t('sanctions.commodityzh')" :label-width="formLabelWidth" prop="commodityCn">
          <el-input v-model="detailform.commodityCn" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('sanctions.commodityen')" :label-width="formLabelWidth" prop="commodityEn">
          <el-input v-model="detailform.commodityEn" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('sanctions.referencenumber')" :label-width="formLabelWidth" prop="referenceNo">
          <el-input v-model="detailform.referenceNo" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('sanctions.type')" :label-width="formLabelWidth" prop="type">
          <el-input v-model="detailform.type" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarkszh')" :label-width="formLabelWidth" prop="remarkCn">
          <div v-if="detailform.remarkCn" class="detailContent" v-html="detailform.remarkCn" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarksen')" :label-width="formLabelWidth" prop="remarkEn">
          <div v-if="detailform.remarkEn" class="detailContent" v-html="detailform.remarkEn" />
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--导入模版-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center destroy-on-close :close-on-click-modal="false" width="410px">
      <el-upload class="upload-demo" drag action="/api/admin/sanctionCommodityImport" :limit="1" :on-success="handleSuccess" :headers="uploadHeaders" accept=".xlsx, .xls">
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
import Tinymce from '@/components/Tinymce'
// eslint-disable-next-line no-unused-vars
import { categoryList } from '@/api/article.js'
// eslint-disable-next-line no-unused-vars
import { sanctionAdd, sanctionEdit, sanctionDel, sanctionActive, sanctionExport } from '@/api/sanction.js'
// eslint-disable-next-line no-unused-vars
import { transList } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  name: 'Senctions',
  components: {
    Pagination,
    Tinymce
  },
  data() {
    return {
      uploadHeaders: { 'Authorization': getToken() },
      queryParams: {
        referenceNo: '',
        keyword: ''
      },
      categoryList: [],
      adddialog: false,
      isAdd: false,
      isEdit: false,
      formLabelWidth: '100px',
      importdialog: false,
      addform: {
        id: '',
        commodityCn: '',
        commodityEn: '',
        referenceNo: '',
        type: '',
        remarkCn: '',
        remarkEn: ''
      },
      loading: false,
      rules: {
        commodityCn: { required: true, message: this.$t('userful.categoryIdtips'), trigger: 'blur' },
        commodityEn: { required: true, message: this.$t('userful.documenttips'), trigger: 'blur' },
        remarkCn: { required: true, message: this.$t('userful.remarkszhtips'), trigger: 'blur' },
        remarkEn: { required: true, message: this.$t('userful.remarksentips'), trigger: 'blur' }
      },
      detailform: {},
      detaildialog: false
    }
  },
  watch: {
    adddialog(val) {
      if (!val) {
        this.addform = {
          id: '',
          commodityCn: '',
          commodityEn: '',
          referenceNo: '',
          type: '',
          remarkCn: '',
          remarkEn: ''
        }
        setTimeout(() => {
          this.$refs.editor1.setContent('')
          this.$refs.editor2.setContent('')
        }, 200)
        this.loading = false
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
    // 处理详情
    handleDetail(row) {
      this.detailform = JSON.parse(JSON.stringify(row))
      if (this.detailform.remarkCn) {
        this.detailform.remarkCn = this.detailform.remarkCn.replace(/\<img/gi, '<img style="max-width: 100%;height: auto;" ')
      }
      if (this.detailform.remarkEn) {
        this.detailform.remarkEn = this.detailform.remarkEn.replace(/\<img/gi, '<img style="max-width: 100%;height: auto;" ')
      }
      this.detaildialog = true
    },
    // 下载模版
    async download() {
      const res = await sanctionExport(this.queryParams)
      window.open(res.data)
    },
    // 提交导入
    submitimport() {
      this.importdialog = false
      this.search()
    },
    // 取消
    Cancle() {
      this.isAdd = false
      this.addform = {}
      this.adddialog = false
    },
    // 查询
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams = {
        referenceNo: '',
        keyword: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 处理新增
    handleAdd() {
      this.isAdd = true
      this.adddialog = true
    },
    // 获取种类列表
    async getcategoryList() {
      const type = 1
      const res = await categoryList(type)
      this.categoryList = transList(res.data)
    },
    // 新增管制品
    async savesanctions(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const data = {
            id: this.addform.id,
            commodityCn: this.addform.commodityCn,
            commodityEn: this.addform.commodityEn,
            referenceNo: this.addform.referenceNo,
            type: this.addform.type,
            remarkCn: this.addform.remarkCn,
            remarkEn: this.addform.remarkEn,
            active: 1
          }
          if (this.isAdd) {
            this.loading = true
            await sanctionAdd(data)
            this.isAdd = false
            this.adddialog = false
            this.loading = false
            this.$refs.pagination.pageRequest()
          } else {
            await sanctionEdit(data)
            this.isEdit = false
            this.adddialog = false
            this.loading = false
            this.$refs.pagination.pageRequest()
          }
        }
      })
    },
    // 管制品激活
    async handleUpdateStatus(row, active) {
      const data = {
        id: row.id,
        active: active
      }
      await sanctionActive(data)
      this.$refs.pagination.pageRequest()
    },
    // 管制品删除
    async handleDelete(id) {
      this.$confirm(this.$t('sanctions.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await sanctionDel(id)
          this.$refs.pagination.pageRequest()
        })
    },
    // 管制品修改
    handleEdit(row) {
      this.isEdit = true
      this.adddialog = true
      this.addform = JSON.parse(JSON.stringify(row))
      setTimeout(() => {
        this.$refs.editor1.setContent(row.remarkCn)
        this.$refs.editor2.setContent(row.remarkEn)
      }, 200)
    },
    // 下载文件
    downloadfile() {
      window.open(process.env.VUE_APP_FILE_BASE_API + 'import/Import Sanction List导入管制品.xlsx')
    },
    // 处理完成
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
