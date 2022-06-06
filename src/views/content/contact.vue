<template>
  <div>
    <!--搜索功能-->
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.office" :placeholder="$t('contact.region')" clearable filterable style="width: 100%">
                <el-option v-for="item in officeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="queryParams.trade" :placeholder="$t('contact.trade')" clearable filterable style="width: 100%">
                <el-option v-for="item in tradeList" :key="item.value" :label="item.label" :value="item.value" />
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
    <!--table内容-->
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
        <el-button type="danger" size="small" @click="importdialog = true">{{ $t('contact.import') }}</el-button>
        <el-button v-permission="[38]" type="danger" size="small" @click="handleAdd">{{ $t('contact.createinfo') }}</el-button>
      </div>
      <Pagination ref="pagination" uri="/api/admin/contactInfoList" :request-params="queryParams">
        <el-table-column align="center" :label="$t('contact.region')" prop="regionName" width="120px" />
        <el-table-column :label="$t('contact.office')" prop="officeName" align="center" width="160px" />
        <el-table-column :label="$t('contact.dept')" prop="deptName" align="center" width="150px" />
        <el-table-column align="center" :label="$t('contact.buinessscope')" prop="businessName" width="120px" />
        <el-table-column align="center" :label="$t('contact.trade')" prop="tradeName" width="180px" />
        <el-table-column align="center" :label="$t('contact.accountname')" prop="accountName" />
        <el-table-column align="center" :label="$t('contact.contactperson')" prop="contactPerson" width="160px" />
        <el-table-column align="center" :label="$t('contact.dutydate')" prop="dutyDate" width="160px" />
        <el-table-column align="center" :label="$t('contact.dutytime')" prop="dutyTime" width="160px" />
        <el-table-column align="center" :label="$t('contact.phone')" prop="phone" width="160px" />
        <el-table-column align="center" :label="$t('contact.email')" prop="email" width="180px" />
        <el-table-column align="center" :label="$t('message.createTime')" prop="createTime" :formatter="formatDate" width="120px" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right" width="120px">
          <template scope="scope">
            <el-button v-if="scope.row.active === 0" v-permission="[39]" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('contact.active') }}</el-button>
            <el-button v-if="scope.row.active === 1" v-permission="[40]" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('contact.deactive') }}</el-button>
            <el-button v-if="scope.row.active === 0" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button v-permission="[41]" size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--导入模版-->
    <el-dialog :title="$t('newscenter.import')" :visible.sync="importdialog" center destroy-on-close :close-on-click-modal="false" width="410px">
      <el-upload class="upload-demo" drag action="/api/admin/contactInfoImport" :limit="1" :on-success="handleSuccess" :headers="uploadHeaders" accept=".xlsx, .xls">
        <i class="el-icon-upload" />
        <div class="el-upload__text">{{ $t('general.upload') }}<em>{{ $t('general.uploadTips') }}</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitimport">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="importdialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
    <!--新增联系方式-->
    <el-dialog :title="addform.id ? $t('general.edit') : $t('general.add')" :visible.sync="adddialog" width="700px" center destroy-on-close :close-on-click-modal="false">
      <el-row>
        <el-form ref="addform" :model="addform" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.region')" :label-width="formLabelWidth" prop="region">
                <el-select v-model="addform.region" style="width: 100%" :placeholder="$t('general.choose')">
                  <el-option v-for="item in regionList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.office')" :label-width="formLabelWidth" prop="office">
                <el-select v-model="addform.office" style="width: 100%" :placeholder="$t('general.choose')">
                  <el-option v-for="item in officeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.buinessscope')" :label-width="formLabelWidth" prop="buinessscope">
                <el-select v-model="addform.buinessscope" style="width: 100%" :placeholder="$t('general.choose')">
                  <el-option v-for="item in buinessscopeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.dept')" :label-width="formLabelWidth" prop="dept">
                <el-select v-model="addform.dept" style="width: 100%" :placeholder="$t('general.choose')">
                  <el-option v-for="item in deptList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.trade')" :label-width="formLabelWidth" prop="trade">
                <el-select v-model="addform.trade" style="width: 100%" :placeholder="$t('general.choose')">
                  <el-option v-for="item in tradeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.accountname')" :label-width="formLabelWidth" prop="accountname">
                <el-input v-model="addform.accountname" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.accountname = $event.target.value.trim()" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.contactperson')" :label-width="formLabelWidth" prop="contactperson">
                <el-input v-model="addform.contactperson" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.contactperson = $event.target.value.trim()" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.phone')" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="addform.phone" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.phone = $event.target.value.trim()" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.email')" :label-width="formLabelWidth" prop="email">
                <el-input v-model="addform.email" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.email = $event.target.value.trim()" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('contact.dutydate')" :label-width="formLabelWidth" prop="dutydate">
                <el-input v-model="addform.dutydate" autocomplete="off" clearable :placeholder="$t('general.input')" @blur="addform.dutydate = $event.target.value.trim()" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="11">
              <el-form-item :label="$t('contact.dutytime')" :label-width="formLabelWidth" prop="startTime">
                <el-time-select
                  v-model="addform.startTime"
                  style="width: 100%"
                  :placeholder="$t('general.startTime')"
                  :picker-options="{
                    start: '09:00',
                    step: '00:15',
                    end: '12:00',
                  }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <div style="display: flex; width: 100%; justify-content: center; height: 36px; align-items: center">~</div>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="endTime">
                <el-time-select
                  v-model="addform.endTime"
                  style="width: 100%"
                  :placeholder="$t('general.endTime')"
                  :picker-options="{
                    start: '12:00',
                    step: '00:15',
                    end: '20:00',
                  }"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="submitadd('addform')">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
// eslint-disable-next-line no-unused-vars
import { dictItem, contactDel, contactActive, BusinessList, contactAdd, contactEdit, contactTemplateDownload, BusinessTypeList } from '@/api/contact.js'
// eslint-disable-next-line no-unused-vars
import { transdict, transoffice, transbuiness } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  name: 'Contact',
  components: {
    Pagination
  },
  data() {
    return {
      uploadHeaders: { Authorization: getToken(), userId: JSON.parse(localStorage.getItem('userInfo')).id },
      queryParams: {
        office: '',
        trade: ''
      },
      categoryList: [],
      importdialog: false,
      adddialog: false,
      loading: false,
      isAdd: false,
      isEdit: false,
      formLabelWidth: '90px',
      officeList: [],
      tradeList: [],
      newofficeList: [],
      regionList: [],
      deptList: [],
      buinessscopeList: [],
      addform: {
        id: '',
        region: '',
        office: '',
        dept: '',
        buinessscope: '',
        trade: '',
        accountname: '',
        contactperson: '',
        dutydate: '',
        startTime: '',
        endTime: '',
        phone: '',
        email: '',
        active: 1
      },
      rules: {
        region: { required: true, message: this.$t('contact.regiontips'), trigger: 'change' },
        office: { required: true, message: this.$t('contact.officetips'), trigger: 'change' },
        dept: { required: true, message: this.$t('contact.depttips'), trigger: 'change' },
        buinessscope: { required: true, message: this.$t('contact.buinessscopetips'), trigger: 'change' },
        trade: { required: true, message: this.$t('contact.tradetips'), trigger: 'change' },
        contactperson: { required: true, message: this.$t('contact.contactpersontips'), trigger: 'blur' },
        phone: { required: true, message: this.$t('contact.phonetips'), trigger: 'blur' },
        dutydate: { required: true, message: this.$t('contact.dutydatetips'), trigger: 'change' },
        startTime: { required: true, message: this.$t('contact.startTimetips'), trigger: 'change' },
        endTime: { required: true, message: this.$t('contact.endTimetips'), trigger: 'change' },
        email: { required: true, message: this.$t('contact.emailtips'), trigger: 'blur' }
      }
    }
  },
  watch: {
    adddialog(val) {
      if (!val) {
        this.addform = {
          id: '',
          region: '',
          office: '',
          dept: '',
          buinessscope: '',
          trade: '',
          accountname: '',
          contactperson: '',
          dutydate: '',
          startTime: '',
          endTime: '',
          phone: '',
          email: '',
          active: 1
        }
        this.loading = false
      }
    }
  },
  created() {
    this.officeLists()
    this.regionLists()
    this.contradeList()
    this.deparementList()
    this.buinesssList()
  },
  methods: {
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('YYYY-MM-DD')
    },
    // 取消
    Cancle() {
      this.adddialog = false
      this.isEdit = false
      this.isAdd = false
    },
    // 提交下import
    submitimport() {
      this.importdialog = false
      this.search()
    },
    // 搜索
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams = {
        office: '',
        trade: ''
      }
      setTimeout(() => {
        this.search()
      }, 100)
    },
    async officeLists() {
      const res = await dictItem('dict_office')
      this.officeList = transdict(res.data)
    },
    async regionLists() {
      const res = await dictItem('dict_region')
      this.regionList = transdict(res.data)
    },
    async contradeList() {
      const dictName = 'dict_trade'
      const res = await dictItem(dictName)
      this.tradeList = transdict(res.data)
    },
    async deparementList() {
      const dictName = 'dict_department'
      const res = await dictItem(dictName)
      this.deptList = transdict(res.data)
    },
    async  buinesssList() {
      const res = await dictItem('dict_business_scope')
      this.buinessscopeList = transdict(res.data)
    },
    // 新增
    handleAdd() {
      this.isAdd = true
      this.adddialog = true
      this.isEdit = false
    },
    // 编辑
    handleEdit(row) {
      const startTime = row.dutyTime.split('-')[0]
      const endTime = row.dutyTime.split('-')[1]
      this.isEdit = true
      this.isAdd = false
      this.adddialog = true
      this.addform.id = row.id
      this.addform.email = row.email
      this.addform.accountname = row.accountName
      this.addform.contactperson = row.contactPerson
      this.addform.region = row.region
      this.addform.office = row.office
      this.addform.trade = row.trade
      this.addform.buinessscope = row.businessType
      this.addform.phone = row.phone
      this.addform.dept = row.department
      this.addform.dutydate = row.dutyDate
      this.addform.startTime = startTime
      this.addform.endTime = endTime
      this.addform.active = row.active
    },
    // 状态改变
    async handleUpdateStatus(row, active) {
      const data = {
        active: active,
        id: row.id,
        userId: JSON.parse(localStorage.getItem('userInfo')).id
      }
      await contactActive(data)
      this.$refs.pagination.pageRequest()
    },
    // 删除操作
    handleDelete(id) {
      this.$confirm(this.$t('contact.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      }).then(async() => {
        await contactDel(id)
        this.$refs.pagination.pageRequest()
      })
    },
    // 新增提交
    async submitadd(formName) {
      const data = {
        id: this.addform.id,
        active: this.addform.active,
        email: this.addform.email,
        accountName: this.addform.accountname,
        contactPerson: this.addform.contactperson,
        region: this.addform.region,
        trade: this.addform.trade,
        office: this.addform.office,
        businessType: this.addform.buinessscope,
        phone: this.addform.phone,
        department: this.addform.dept,
        dutyDate: this.addform.dutydate,
        dutyTime: this.addform.startTime + '-' + this.addform.endTime
      }
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            data.createUser = JSON.parse(localStorage.getItem('userInfo')).id
            await contactAdd(data)
            this.isAdd = false
            this.isEdit = false
            this.adddialog = false
            this.$refs.pagination.pageRequest()
          } else if (this.isEdit) {
            data.updateUser = JSON.parse(localStorage.getItem('userInfo')).id
            await contactEdit(data)
            this.isEdit = false
            this.isAdd = false
            this.adddialog = false
            this.$refs.pagination.pageRequest()
          }
        } else {
          return false
        }
      })
    },
    // 下载文件
    downloadfile() {
      // const res = await contactTemplateDownload()
      window.open(process.env.VUE_APP_FILE_BASE_API + 'import/Import Contact Info Matrix导入联系人信息.xlsx')
    },
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
