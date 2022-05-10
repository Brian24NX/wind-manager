<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.office" placeholder="请选择">
                <el-option v-for="item in officeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="queryParams.trade" placeholder="请选择">
                <el-option v-for="item in tradeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" plain>{{ $t('faq.export') }}</el-button>
            <el-button type="danger" size="small" @click="downloadfile">{{ $t('message.download') }}</el-button>
            <el-button type="danger" size="small" plain @click="importdialog = true">{{ $t('contact.import') }}</el-button>
            <el-button type="danger" size="small" @click="handleAdd">{{ $t('contact.createinfo') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/api/admin/contactInfoList" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('contact.id')" prop="id" />
        <el-table-column align="center" :label="$t('contact.region')" prop="regionName" />
        <el-table-column :label="$t('contact.office')" prop="officeName" />
        <el-table-column :label="$t('contact.dept')" prop="deptName" align="center" />
        <el-table-column align="center" :label="$t('contact.buinessscope')" prop="businessName" />
        <el-table-column align="center" :label="$t('contact.trade')" prop="tradeName" />
        <el-table-column align="center" :label="$t('contact.accountname')" prop="accountName" />
        <el-table-column align="center" :label="$t('contact.contactperson')" prop="contactPerson" />
        <el-table-column align="center" :label="$t('contact.dutydate')" prop="dutyDate" />
        <el-table-column align="center" :label="$t('contact.dutytime')" prop="dutyTime" />
        <el-table-column align="center" :label="$t('contact.phone')" prop="phone" />
        <el-table-column align="center" :label="$t('contact.email')" prop="email" />
        <el-table-column :label="$t('article.actions')" align="center" fixed="right">
          <template scope="scope">
            <el-button v-if="scope.row.active === 0" size="small" type="text" @click="handleUpdateStatus(scope.row, 1)">{{ $t('contact.active') }}</el-button>
            <el-button v-if="scope.row.active === 1" size="small" type="text" @click="handleUpdateStatus(scope.row, 0)">{{ $t('contact.deactive') }}</el-button>
            <el-button v-if="scope.row.active === 0" size="small" type="text" @click="handleEdit(scope.row)">{{ $t('message.edit') }}</el-button>
            <el-button size="small" type="text" class="danger" @click="handleDelete(scope.row.id)">{{ $t('message.delete') }}</el-button>
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
    <!--新增联系方式-->
    <el-dialog :title="$t('contact.createinfo')" :visible.sync="adddialog" center>
      <el-row>
        <el-form ref="addform" :model="addform" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.region')" :label-width="formLabelWidth" prop="region">
                <el-select v-model="addform.region" placeholder="请选择" @change="changeoffice">
                  <el-option v-for="item in regionList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.office')" :label-width="formLabelWidth" prop="office">
                <el-select v-model="addform.office" placeholder="请选择">
                  <el-option v-for="item in newofficeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.dept')" :label-width="formLabelWidth" prop="dept">
                <el-select v-model="addform.dept" placeholder="请选择">
                  <el-option v-for="item in deptList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.buinessscope')" :label-width="formLabelWidth" prop="buinessscope">
                <el-select v-model="addform.buinessscope" placeholder="请选择">
                  <el-option v-for="item in buinessscopeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.trade')" :label-width="formLabelWidth" prop="trade">
                <el-select v-model="addform.trade" placeholder="请选择">
                  <el-option v-for="item in tradeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.accountname')" :label-width="formLabelWidth" prop="accountname">
                <el-input v-model="addform.accountname" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.contactperson')" :label-width="formLabelWidth" prop="contactperson">
                <el-input v-model="addform.contactperson" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.dutydate')" :label-width="formLabelWidth" prop="dutydate">
                <el-select v-model="addform.dutydate" multiple collapse-tags style="margin-left: 20px" placeholder="请选择">
                  <el-option v-for="item in dutylist" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.dutytime')" :label-width="formLabelWidth" prop="dutytime">
                <el-time-select
                  v-model="addform.startTime"
                  placeholder="起始时间"
                  :picker-options="{
                    start: '09:00',
                    step: '00:15',
                    end: '12:00',
                  }"
                />
                <el-time-select
                  v-model="addform.endTime"
                  placeholder="结束时间"
                  :picker-options="{
                    start: '12:00',
                    step: '00:15',
                    end: '20:00',
                    minTime: startTime,
                  }"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('contact.phone')" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="addform.phone" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('contact.email')" :label-width="formLabelWidth" prop="email">
                <el-input v-model="addform.email" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitadd">{{ $t('forgetForm.yes') }}</el-button>
        <el-button @click="adddialog = false">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
// eslint-disable-next-line no-unused-vars
import { dictItem, contactDel, contactActive, BusinessList, contactAdd, contactEdit } from '@/api/contact.js'
// eslint-disable-next-line no-unused-vars
import { transdict } from '@/utils'
export default {
  name: 'Contact',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {},
      categoryList: [],
      importdialog: false,
      adddialog: false,
      isAdd: false,
      isEdit: false,
      formLabelWidth: '130px',
      officeList: [],
      tradeList: [],
      newofficeList: [],
      regionList: [
        { value: 1, label: 'Central China' },
        { value: 2, label: 'North China' },
        { value: 3, label: 'South China' }
      ],
      deptList: [{ value: 1, label: 'Customer Service' }],
      buinessscopeList: [
        { value: 1, label: '进口/Import' },
        { value: 2, label: '出口/Export' },
        { value: 3, label: '柜台业务/OBL & Telex Release' }
      ],
      dutylist: [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' }
      ],
      addform: {
        id: '',
        region: '',
        office: '',
        dept: '',
        buinessscope: '',
        trade: '',
        accountname: '',
        contactperson: '',
        dutydate: [],
        startTime: '',
        endTime: '',
        // dutytime: [new Date(2022, 4, 24, 9), new Date(2022, 4, 24, 18)],
        phone: '',
        email: ''
      },
      rules: {
        region: { required: true, message: '请选择', trigger: 'change' },
        office: { required: true, message: '请选择', trigger: 'change' },
        dept: { required: true, message: '请选择', trigger: 'change' },
        buinessscope: { required: true, message: '请选择', trigger: 'change' },
        trade: { required: true, message: '请选择', trigger: 'change' },
        contactperson: { required: true, message: '请输入', trigger: 'blur' },
        dutydate: { required: true, message: '请选择', trigger: 'change' },
        startTime: { required: true, message: '请选择', trigger: 'change' },
        endTime: { required: true, message: '请选择', trigger: 'change' },
        email: { required: true, message: '请输入', trigger: 'blur' }
      }
    }
  },
  created() {
    this.contradeList()
    this.conofficeList()
  },
  methods: {
    async contradeList() {
      const dictName = 'dict_trade'
      const res = await dictItem(dictName)
      this.tradeList = transdict(res.data)
    },
    async conofficeList() {
      const dictName = 'dict_office'
      const res = await dictItem(dictName)
      this.officeList = transdict(res.data)
    },
    handleAdd() {
      this.isAdd = true
      this.adddialog = true
    },
    handleEdit(row) {
      const data = row.dutyDate.split(',')
      const startTime = row.dutyTime.split('-')[0]
      const endTime = row.dutyTime.split('-')[1]
      this.isEdit = true
      this.adddialog = true
      this.addform.id = row.id
      this.addform.email = row.email
      this.addform.accountname = row.accountName
      this.addform.contactperson = row.contactPerson
      this.addform.region = row.region
      this.changeoffice()
      this.addform.trade = row.trade
      this.addform.office = row.office
      this.addform.buinessscope = row.businessType
      this.addform.phone = row.phone
      this.addform.dept = row.department
      this.addform.dutydate = data
      this.addform.startTime = startTime
      this.addform.endTime = endTime
    },
    // region值改变
    async changeoffice() {
      const res = await BusinessList(this.addform.region)
      this.newofficeList = transdict(res.data.office)
    },
    // 状态改变
    async handleUpdateStatus(row, active) {
      const data = {
        active: active,
        id: row.id
      }
      const res = await contactActive(data)
      this.$message.info(res.message)
      this.$refs.pagination.refreshRequest()
    },
    // 删除操作
    handleDelete(id) {
      this.$confirm(this.$t('contact.deltitle'), this.$t('message.delete'), {
        confirmButtonText: this.$t('forgetForm.yes'),
        cancelButtonText: this.$t('forgetForm.cancel'),
        type: 'warning'
      })
        .then(async() => {
          await contactDel(id)
          this.$refs.pagination.refreshRequest()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 新增提交
    async submitadd() {
      const data = {
        id: this.addform.id,
        active: 1,
        email: this.addform.email,
        accountName: this.addform.accountname,
        contactPerson: this.addform.contactperson,
        region: this.addform.region,
        trade: this.addform.trade,
        office: this.addform.office,
        businessType: this.addform.buinessscope,
        phone: this.addform.phone,
        department: this.addform.dept,
        dutyDate: this.addform.dutydate.join(','),
        dutyTime: this.addform.startTime + '-' + this.addform.endTime
      }
      if (this.isAdd) {
        const res = await contactAdd(data)
        this.$message.info(res.message)
        this.addform = {}
        this.isAdd = false
        this.adddialog = false
        this.$refs.pagination.refreshRequest()
      } else {
        const res = await contactEdit(data)
        this.$message.info(res.message)
        this.addform = {}
        this.isEdit = false
        this.adddialog = false
        this.$refs.pagination.refreshRequest()
      }
    },
    downloadfile() {
      window.location.href = 'https://uat.wind-admin.cma-cgm.com/api/admin/import/user_tm.xlsx'
    }
  }
}
</script>
<style lang="scss" scoped></style>
