<template>
  <div>
    <!--查询模块-->
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="20">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.operationType" size="small" :placeholder="$t('operationLog.operationType')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in operationTypeList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.nickname" size="small" style="width: 100%" :placeholder="$t('operationLog.userName')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-date-picker
                v-model="timeList"
                type="daterange"
                range-separator="~"
                :start-placeholder="$t('operationLog.startDate')"
                :end-placeholder="$t('operationLog.endDate')"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                :clearable="true"
                @change="changeDate"
              />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="queryParams.company" size="small" style="width: 100%" :placeholder="$t('operationLog.company')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.account" size="small" style="width: 100%" :placeholder="$t('operationLog.searchLabel')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.shipmentRef" size="small" style="width: 100%" :placeholder="$t('operationLog.quotationRef')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="search">{{ $t('operationLog.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('operationLog.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--内容模块-->
    <div class="tableContainer">
      <!-- <div class="operations">
        <el-button v-permission="[55]" type="danger" size="small" @click="download">{{ $t('operationLog.export') }}</el-button>
      </div> -->
      <Pagination ref="pagination" uri="/api/admin/operation/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('operationLog.account')" prop="account" min-width="200px" />
        <el-table-column align="center" :label="$t('operationLog.userName')" prop="nickname" width="180px" />
        <el-table-column align="center" :label="$t('operationLog.company')" prop="company" min-width="300px" />
        <el-table-column align="center" :label="$t('operationLog.operationType')" prop="operationType" width="180px" />
        <el-table-column align="center" :label="$t('operationLog.lastUpdateTime')" prop="operationTime" :formatter="formatDate" min-width="155px" />
        <el-table-column align="center" :label="$t('operationLog.quotationRef')" prop="shipmentRef" fixed="right" width="180px">
          <template slot-scope="{row}">
            <!-- {{ scope.raw.shipmentRef ? scope.raw.shipmentRef : '-' }}  -->
            {{ row.shipmentRef||'-' }}
          </template>
        </el-table-column>
      </Pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { operationTypeList, operationLogExport } from '@/api/operationLog'

export default {
  name: 'OperationLog',
  components: {
    Pagination
  },
  data() {
    return {
      queryParams: {
        searchStr: '',
        startDate: '',
        endDate: '',
        status: null,
        nickname: '',
        shipmentRef: '',
        operationType: '',
        operationTime: '',
        company: '',
        account: ''
      },
      statusList: [],
      operationTypeList: [],
      timeList: [],
      loading: false,
      rules: {},
      detailform: {},
      detaildialog: false,
      detailTitle: '',
      detailContent: '',
      otherKey: []
    }
  },
  watch: {},
  created() {
    this.getoperationTypeList()
    this.getStatusList()
  },
  mounted() {},
  methods: {
    getStatusList() {
      notifyStatusList().then((res) => {
        this.statusList = res.data
      })
    },
    formatDate(row, column, cellValue, index) {
      return this.$moment(cellValue).format('yyyy-MM-DD HH:mm:ss')
    },
    changeDate(val) {
      this.queryParams.startDate = val ? val[0] : undefined
      this.queryParams.endDate = val ? val[1] : undefined
      this.timeList = val
      this.search()
    },
    // 处理详情
    handleDetail(row) {
      notifyDetail({
        id: parseInt(row.id)
      }).then((res) => {
        this.detailform = res.data
        const { title, content, ...rest } = res.data
        this.detailTitle = title
        this.detailContent = content
        const keyList = Object.values(rest)
        this.otherKey = keyList.filter((i) => !i.includes('null'))
      })
      this.detaildialog = true
    },
    // 查询
    search() {
      this.$refs.pagination.refreshRequest()
    },
    // 重置
    reset() {
      this.queryParams = {
        searchStr: '',
        startDate: '',
        endDate: '',
        status: null,
        nickname: '',
        shipmentRef: '',
        operationType: '',
        operationTime: '',
        company: '',
        account: '',
        timeList: []
      }
      this.changeDate([])
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 获取种类列表
    async getoperationTypeList() {
      const res = await operationTypeList()
      this.operationTypeList = res.data
    },
    // 导出
    async download() {
      const res = await operationLogExport()(this.queryParams)
      window.open(res.data)
    }
  }
}
</script>
<style scoped>
.el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.el-range-editor--medium {
  width: 100%;
}
.el-row {
  margin-bottom: 20px;
}
.buttonBox {
  margin-top: 55px;
}
.boxStyle {
  margin: 20px;
}
.mainTitle {
  font-size: 24px;
  font-weight: 700;
  color: black;
  padding: 20px 0;
}
.contentText {
  font-size: 18px;
  font-weight: 400;
  color: black;
  padding-bottom: 20px;
}
.otherText {
  font-size: 16px;
  font-weight: 400;
  color: black;
}
</style>
