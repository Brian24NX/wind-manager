<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyword" size="small" style="width: 100%" placeholder="请输入内容" clearable suffix-icon="el-icon-search" />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.referenceNo" size="small" style="width: 100%" placeholder="请输入内容" clearable suffix-icon="el-icon-search" />
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
        <el-button type="primary" size="small">{{ $t('sanctions.import') }}</el-button>
        <el-button type="primary" size="small">{{ $t('sanctions.export') }}</el-button>
        <el-button type="primary" size="small" @click="handleAdd">{{ $t('sanctions.newitem') }}</el-button>
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
            <el-button v-if="scope.row.active === 1" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-if="scope.row.active === 0" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-if="scope.row.active === 0" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <el-dialog :title="$t('business.sendnotification')" :visible.sync="adddialog" center width="800px" :close-on-click-modal="false" destroy-on-close>
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
          <tinymce v-model="addform.remarkCn" :height="250" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarksen')" :label-width="formLabelWidth" prop="category">
          <tinymce v-model="addform.remarkEn" :height="250" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savesanctions">{{ $t('message.save') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
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
import { sanctionAdd, sanctionEdit, sanctionDel, sanctionActive } from '@/api/sanction.js'
// eslint-disable-next-line no-unused-vars
import { transList } from '@/utils'
export default {
  name: 'Senctions',
  components: {
    Pagination,
    Tinymce
  },
  data() {
    return {
      queryParams: {
        referenceNo: '',
        keyword: ''
      },
      categoryList: [],
      adddialog: false,
      isAdd: false,
      isEdit: false,
      formLabelWidth: '130px',
      addform: {
        id: '',
        commodityCn: '',
        commodityEn: '',
        referenceNo: '',
        type: '',
        remarkCn: '',
        remarkEn: ''
      }
    }
  },
  created() {
    this.getcategoryList()
  },
  methods: {
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
        const res = await sanctionAdd(data)
        this.$message.success(res.message)
        this.isAdd = false
        this.addform = {}
        this.adddialog = false
        this.$refs.pagination.refreshRequest()
      } else {
        const res = await sanctionEdit(data)
        this.$message.success(res.message)
        this.isEdit = false
        this.addform = {}
        this.adddialog = false
        this.$refs.pagination.refreshRequest()
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
      this.$refs.pagination.refreshRequest()
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
          this.$refs.pagination.refreshRequest()
        })
    },
    // 管制品修改
    handleEdit(row) {
      this.isEdit = true
      this.adddialog = true
      this.addform = row
    },
    downloadfile() {
      window.location.href = process.env.VUE_APP_FILE_BASE_API + 'import/Import Sanction List导入管制品.xlsx'
    }
  }
}
</script>
<style scoped>

</style>
