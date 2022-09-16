<template>
  <div>
    <!--查询模块-->
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.keyword" size="small" style="width: 100%" :placeholder="$t('sanctions.keyword')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.referenceNo" size="small" style="width: 100%" :placeholder="$t('sanctions.referencenumber')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-select v-model="queryParams.active" size="small" :placeholder="$t('sanctions.status')" clearable filterable style="width: 100%" @change="search">
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
    <!--内容模块-->
    <div class="tableContainer">
      <div class="operations">
        <!-- <el-button v-permission="[54]" type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button> -->
        <el-button v-permission="[54]" type="danger" size="small" @click="importFile">{{ $t('sanctions.import') }}</el-button>
        <el-button v-permission="[55]" type="danger" size="small" @click="download">{{ $t('sanctions.export') }}</el-button>
        <el-button v-permission="[53]" type="danger" size="small" @click="handleAdd">{{ $t('sanctions.newitem') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/sanctionCommodityList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('sanctions.category')" prop="category" width="130px" />
        <el-table-column align="center" :label="$t('sanctions.commodityzh')" prop="commodityCn" />
        <el-table-column :label="$t('sanctions.commodityen')" prop="commodityEn" />
        <el-table-column :label="$t('sanctions.referencenumber')" prop="referenceNo" align="center" />
        <el-table-column align="center" :label="$t('sanctions.type')" prop="type" />
        <el-table-column align="center" :label="$t('sanctions.status')" prop="active" :formatter="transactive" width="80px" />
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" width="120px" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="180px">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row)">{{ $t('message.detail') }}</el-button>
            <el-button v-show="!scope.row.active" v-permission="[56]" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-show="scope.row.active" v-permission="[58]" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('message.unPublish') }}</el-button>
            <el-button v-show="!scope.row.active" v-permission="[57]" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('message.publish') }}</el-button>
            <el-button v-permission="[59]" size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--新增通告-->
    <el-dialog :title="addform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" center width="950px" :close-on-click-modal="false" destroy-on-close top="50px">
      <el-form ref="addform" :model="addform" label-position="top" :rules="rules">
        <el-form-item :label="$t('sanctions.category')" prop="category">
          <el-radio-group v-model="addform.category">
            <el-radio v-for="item in typelist" :key="item.value" :label="item.value">{{ item.label }} </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('sanctions.commodityzh')" prop="commodityCn">
          <el-input v-model="addform.commodityCn" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.commodityCn = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.commodityen')" prop="commodityEn">
          <el-input v-model="addform.commodityEn" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.commodityEn = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.referencenumber')" prop="referenceNo">
          <el-input v-model="addform.referenceNo" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.referenceNo = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.type')" prop="type">
          <el-input v-model="addform.type" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.type = $event.target.value.trim()" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarkszh')" prop="remarkCn">
          <tinymce ref="editor1" v-model="addform.remarkCn" :height="250" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarksen')" prop="remarkEn">
          <tinymce ref="editor2" v-model="addform.remarkEn" :height="250" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="savesanctions('addform')">{{ $t('message.save') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--详情-->
    <el-dialog :title="$t('message.detail')" :visible.sync="detaildialog" center width="800px" :close-on-click-modal="false" destroy-on-close top="50px">
      <el-form ref="detailform" label-position="top" :model="detailform">
        <el-form-item :label="$t('sanctions.category')" prop="category">
          <el-radio-group v-model="detailform.category" disabled>
            <el-radio v-for="item in typelist" :key="item.value" :label="item.value">{{ item.label }} </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('sanctions.commodityzh')" prop="commodityCn">
          <el-input v-model="detailform.commodityCn" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('sanctions.commodityen')" prop="commodityEn">
          <el-input v-model="detailform.commodityEn" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('sanctions.referencenumber')" prop="referenceNo">
          <el-input v-model="detailform.referenceNo" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('sanctions.type')" prop="type">
          <el-input v-model="detailform.type" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarkszh')" prop="remarkCn">
          <div v-if="detailform.remarkCn" class="detailContent" v-html="detailform.remarkCn" />
        </el-form-item>
        <el-form-item :label="$t('sanctions.remarksen')" prop="remarkEn">
          <div v-if="detailform.remarkEn" class="detailContent" v-html="detailform.remarkEn" />
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--导入模板-->
    <CustomerImport ref="customerImport" download-url="import/Import Sanction List导入管制品.xlsx" import-url="/api/admin/sanctionCommodityImport" :table-colum="tableColum" @success="search" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import CustomerImport from '@/components/Import/import'
import { dictItem } from '@/api/system/dict/dict'
import Tinymce from '@/components/Tinymce'
import { categoryList } from '@/api/article'
import { sanctionAdd, sanctionEdit, sanctionDel, sanctionActive, sanctionExport } from '@/api/sanction'
import { transList } from '@/utils'
export default {
  name: 'Senctions',
  components: {
    Pagination,
    Tinymce,
    CustomerImport
  },
  data() {
    return {
      queryParams: {
        referenceNo: '',
        active: '',
        keyword: ''
      },
      activeList: [],
      categoryList: [],
      adddialog: false,
      isAdd: false,
      isEdit: false,
      importdialog: false,
      addform: {
        id: '',
        commodityCn: '',
        commodityEn: '',
        category: 'Commodity',
        referenceNo: '',
        type: '',
        remarkCn: '',
        remarkEn: ''
      },
      loading: false,
      rules: {},
      detailform: {},
      detaildialog: false,
      tableColum: [{
        prop: 'commodityCn',
        label: 'commodityCn',
        width: '200px'
      }, {
        prop: 'commodityEn',
        label: 'commodityEn',
        width: '200px'
      }, {
        prop: 'remarkCn',
        label: 'remarkCn',
        width: '200px'
      }, {
        prop: 'remarkEn',
        label: 'remarkEn',
        width: '200px'
      }],
      typelist: [{
        label: 'Commodity',
        value: 'Commodity'
      }, {
        label: 'Country/Region',
        value: 'Country/Region'
      }]
    }
  },
  watch: {
    adddialog(val) {
      if (!val) {
        this.addform = {
          id: '',
          commodityCn: '',
          commodityEn: '',
          category: 'Commodity',
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
    },
    '$store.getters.language'() {
      this.setRules()
    }
  },
  created() {
    this.getcategoryList()
    this.getActivedList()
  },
  mounted() {
    this.setRules()
  },
  methods: {
    getActivedList() {
      dictItem('dict_active').then(res => {
        console.log(res)
        this.activeList = res.data
      })
    },
    setRules() {
      this.rules = {
        commodityCn: { required: true, message: this.$t('sanctions.commodityzhtips'), trigger: 'blur' },
        commodityEn: { required: true, message: this.$t('sanctions.commodityentips'), trigger: 'blur' },
        remarkCn: { required: true, message: this.$t('sanctions.remarkszhtips'), trigger: 'blur' },
        remarkEn: { required: true, message: this.$t('sanctions.remarksentips'), trigger: 'blur' }
      }
      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.addform ? this.$refs.addform.clearValidate() : null
        })
      }, 1)
    },
    //  启用状态
    transactive(data) {
      if (data.active === 1) {
        return 'Active'
      } else {
        return 'Deactive'
      }
    },
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD')
    },
    // 处理详情
    handleDetail(row) {
      this.detailform = JSON.parse(JSON.stringify(row))
      this.detaildialog = true
    },
    // 导出
    async download() {
      const res = await sanctionExport(this.queryParams)
      window.open(res.data)
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
            category: this.addform.category,
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
      }).then(async() => {
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
    importFile() {
      this.$refs.customerImport.importFile()
    }
  }
}
</script>
<style scoped>
</style>
