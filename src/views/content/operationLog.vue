<template>
  <div>
    <!--查询模块-->
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-select v-model="queryParams.stype" size="small" :placeholder="$t('operationLog.operationType')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in notifyTypeList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-col>
            <el-col :span="7">
              <el-input v-model="queryParams.username" size="small" style="width: 100%" :placeholder="$t('operationLog.lastUpdateTime')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="7">
              <el-input v-model="queryParams.searchStr" size="small" style="width: 100%" :placeholder="$t('operationLog.userName')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-input v-model="queryParams.searchStr" size="small" style="width: 100%" :placeholder="$t('operationLog.company')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="7">
              <el-input v-model="queryParams.shipmentRef" size="small" style="width: 100%" :placeholder="$t('operationLog.searchLabel')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="7">
              <el-input v-model="queryParams.shipmentRef" size="small" style="width: 100%" :placeholder="$t('operationLog.quotationRef')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="end">
            <div class="buttonBox">
              <el-button type="danger" size="small" @click="search">{{ $t('operationLog.search') }}</el-button>
              <el-button type="danger" size="small" plain @click="reset">{{ $t('operationLog.reset') }}</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--内容模块-->
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/api/admin/notify/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('operationLog.account')" prop="stype" min-width="200px" />
        <el-table-column align="center" :label="$t('operationLog.phone')" prop="account" min-width="200px" />
        <el-table-column align="center" :label="$t('operationLog.userName')" prop="username" width="180px" />
        <el-table-column :label="$t('operationLog.company')" prop="shipmentRef" align="center" min-width="200px" />
        <el-table-column align="center" :label="$t('operationLog.lastUpdateTime')" prop="status" :formatter="transactive" />
        <el-table-column align="center" :label="$t('operationLog.quotationRef')" prop="sendTime" :formatter="formatDate" min-width="120px" />
        <el-table-column :label="$t('operationLog.bookRef')" align="center" fixed="right" width="180px">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row)">{{ $t('operationLog.detail') }}</el-button>
          </template>
        </el-table-column>
      </Pagination>
    </div>
    <!--详情-->
    <el-dialog :title="$t('notification.content')" :visible.sync="detaildialog" center width="800px" :close-on-click-modal="false" destroy-on-close top="50px">
      <el-form ref="detailform" label-position="top" :model="detailform">
        <div class="detailContent boxStyle">
          <div class="mainTitle">{{ this.detailTitle }}</div>
          <div class="contentText">{{ this.detailContent }}</div>
          <div v-for="(item, index) in this.otherKey" :key="index" class="otherText">
            {{ item }}
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { notifyTypeList, notifyStatusList, notifyDetail } from '@/api/operationLog'
// import { categoryList, categoryAdd, categoryDel, categoryEdit } from '@/api/article'
// import { transList } from '@/utils'
// import Cookies from 'js-cookie'
export default {
  name: 'Notification',
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
        stype: '',
        username: '',
        shipmentRef: ''
      },
      statusList: [],
      notifyTypeList: [],
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
    this.getnotifyTypeList()
    this.getStatusList()
  },
  mounted() {},
  methods: {
    getStatusList() {
      notifyStatusList().then((res) => {
        this.statusList = res.data
      })
    },
    //  状态
    transactive(data) {
      if (data.status === 1) {
        return 'Succeed / 成功'
      } else {
        return 'Failed / 失败'
      }
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
        stype: '',
        username: '',
        shipmentRef: '',
        timeList: []
      }
      this.changeDate([])
      setTimeout(() => {
        this.$refs.pagination.refreshRequest()
      }, 100)
    },
    // 获取种类列表
    async getnotifyTypeList() {
      const res = await notifyTypeList()
      this.notifyTypeList = res.data
    }
  }
}
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.buttonBox {
  margin-top: 50px;
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
