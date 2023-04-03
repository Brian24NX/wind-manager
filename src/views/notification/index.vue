<template>
  <div>
    <!--查询模块-->
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="20">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.stype" size="small" :placeholder="$t('notification.typeLabel')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="item in notifyTypeList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.username" size="small" style="width: 100%" :placeholder="$t('notification.userName')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-date-picker
                v-model="timeList"
                type="daterange"
                range-separator="~"
                :start-placeholder="$t('notification.startDate')"
                :end-placeholder="$t('notification.endDate')"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                @change="changeDate"
              />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.status" size="small" :placeholder="$t('notification.status')" clearable filterable style="width: 100%" @change="search">
                <el-option v-for="(item, index) in statusList" :key="index" :label="item" :value="index" />
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.searchStr" size="small" style="width: 100%" :placeholder="$t('notification.searchLabel')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
            <el-col :span="8">
              <el-input v-model="queryParams.shipmentRef" size="small" style="width: 100%" :placeholder="$t('notification.shipRef')" clearable @clear="search" @keyup.enter.native="search" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row :gutter="20" type="flex" justify="end">
            <el-button type="danger" size="small" @click="search">{{ $t('notification.search') }}</el-button>
            <el-button type="danger" size="small" plain @click="reset">{{ $t('notification.reset') }}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--内容模块-->
    <div class="tableContainer">
      <Pagination ref="pagination" uri="/api/admin/notify/list" :request-params="queryParams" :show-index="false">
        <el-table-column align="center" :label="$t('notification.type')" prop="stype" min-width="200px" />
        <el-table-column align="center" :label="$t('notification.account')" prop="account" min-width="200px" />
        <el-table-column align="center" :label="$t('notification.userName')" prop="username" width="180px" />
        <el-table-column :label="$t('notification.shipRef')" prop="shipmentRef" align="center" min-width="200px" />
        <el-table-column align="center" :label="$t('notification.status')" prop="status" :formatter="transactive" min-width="120px" />
        <el-table-column align="center" :label="$t('notification.time')" prop="sendTime" :formatter="formatDate" min-width="155px" />
        <el-table-column :label="$t('notification.content')" align="center" fixed="right" width="180px">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row)">{{ $t('notification.detail') }}</el-button>
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
import { notifyTypeList, notifyStatusList, notifyDetail } from '@/api/notification'

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
        const dataSet = res.data
        this.detailform = dataSet
        this.detailTitle = dataSet.title
        this.detailContent = dataSet.content

        delete dataSet.title
        delete dataSet.content
        const keySet = Object.keys(dataSet).sort()
        const valueSet = []
        keySet.forEach((item) => {
          if (!dataSet[item].includes('null')) {
            valueSet.push(dataSet[item])
          }
        })
        this.otherKey = valueSet
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
.el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.el-range-editor--medium {
  width: 100%;
}
.el-row {
  margin-bottom: 20px;
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
