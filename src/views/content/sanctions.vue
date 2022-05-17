<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyword" size="small" style="width: 100%" placeholder="请输入内容" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.referenceNo" size="small" style="width: 100%" placeholder="请输入内容" clearable />
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
        <el-button v-permission="[54]" type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
        <el-button v-permission="[54]" type="danger" size="small" @click="importdialog=true">{{ $t('sanctions.import') }}</el-button>
        <el-button v-permission="[55]" type="danger" size="small" @click="download">{{ $t('sanctions.export') }}</el-button>
        <el-button v-permission="[53]" type="danger" size="small" @click="handleAdd">{{ $t('sanctions.newitem') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/sanctionCommodityList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('sanctions.commodityzh')" prop="commodityCn" />

        <el-table-column :label="$t('sanctions.commodityen')" prop="commodityEn" />

        <el-table-column :label="$t('sanctions.referencenumber')" prop="referenceNo" align="center" />

        <el-table-column align="center" :label="$t('sanctions.type')" prop="type" />

        <!-- <el-table-column align="center" :label="$t('sanctions.remarkszh')" prop="remarkCn" />-->
        <!-- <el-table-column align="center" :label="$t('sanctions.remarksen')" prop="remarkEn" />-->
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.active === 1" v-permission="[58]" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.active === 0" v-permission="[57]" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.active === 0" v-permission="[56]" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-permission="[59]" size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <el-dialog :title="$t('business.sendnotification')" :visible.sync="adddialog" center width="800px" :close-on-click-modal="false" destroy-on-close top="50px">
      <el-form ref="addform" :model="addform">
        <el-form-item :label="$t('sanctions.commodityzh')" :label-width="formLabelWidth" prop="title">
          <el-input v-model="addform.commodityCn" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.commodityen')" :label-width="formLabelWidth" prop="creator">
          <el-input v-model="addform.commodityEn" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.referencenumber')" :label-width="formLabelWidth" prop="referencenumber">
          <el-input v-model="addform.referenceNo" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.type')" :label-width="formLabelWidth" prop="type">
          <el-input v-model="addform.type" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarkszh')" :label-width="formLabelWidth" prop="category">
          <tinymce ref="editor1" v-model="addform.remarkCn" :height="250" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarksen')" :label-width="formLabelWidth" prop="category">
          <tinymce ref="editor2" v-model="addform.remarkEn" :height="250" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savesanctions">{{ $t('message.save') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--导入模版-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center width="410px">
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
      formLabelWidth: '130px',
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
      loading: false
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
        this.loading = false
      }
    }
  },
  created() {
    this.getcategoryList()
  },
  methods: {
    async download() {
      const res = await sanctionExport(this.queryParams)
      window.location.href = res.data
    },
    submitimport() {
      this.importdialog = false
      this.search()
    },
    Cancle() {
      this.isAdd = false
      this.addform = {}
      this.adddialog = false
    },
    search() {
      this.$refs.pagination.refreshRequest()
    },
    reset() {
      this.queryParams = {
        referenceNo: '',
        keyword: ''
      }
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
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
    async savesanctions() {
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
        const res = await sanctionAdd(data)
        this.$message.success(res.message)
        this.isAdd = false
        this.adddialog = false
        this.loading = false
        this.$refs.pagination.pageRequest()
      } else {
        const res = await sanctionEdit(data)
        this.$message.success(res.message)
        this.isEdit = false
        this.adddialog = false
        this.loading = false
        this.$refs.pagination.pageRequest()
      }
    },
    // 管制品激活
    async handleUpdateStatus(row, active) {
      const data = {
        id: row.id,
        active: active
      }
      const res = await sanctionActive(data)
      this.$message.success(res.message)
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
    downloadfile() {
      window.location.href = process.env.VUE_APP_FILE_BASE_API + 'import/Import Sanction List导入管制品.xlsx'
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
