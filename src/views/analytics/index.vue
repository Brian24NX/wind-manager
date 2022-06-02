<template>
  <div>
    <!--搜索部分-->
    <div class="searchContainer">
      <el-row style="width: 100%" type="flex" justify="space-between">
        <el-col :span="6">
          <el-select v-model="queryParams.usertpye" placeholder="请选择" :clearable="false" filterable style="width: 100%">
            <el-option v-for="item in userTypeList" :key="item.value" :label="item.label" :value="item.value" @change="changeType" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="queryParams.timeList"
            style="width: 100%"
            :clearable="false"
            type="daterange"
            align="right"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="pickerOptions"
            @change="search"
          />
        </el-col>
      </el-row>
    </div>
    <!--内容部分-->
    <div class="tableContainer">
      <div v-if="queryParams.usertpye!=5" class="operations">
        <el-button type="danger" size="small" @click="downloaddialog=true">{{ $t('label.download') }}</el-button>
      </div>
      <!--Frequently searched routes-->
      <div v-if="queryParams.usertpye == 1">
        <div id="mychart" class="echart" :style="myChartStyle" />
      </div>
      <!--Business & Operational Updates-->
      <div v-if="queryParams.usertpye == 2">
        <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="requestParams" show-index>
          <el-table-column :label="$t('buiness.title')" prop="title" />
          <el-table-column align="center" :label="$t('buiness.publishdate')" prop="publishdate" />
          <el-table-column :label="$t('buiness.numberofviews')" prop="numberofviews" align="center" />
          <el-table-column align="center" :label="$t('buiness.numberofsendtoemail')" prop="numberofsendtoemail" />
        </Pagination>
      </div>
      <!--Useful Template & Link-->
      <div v-if="queryParams.usertpye == 3">
        <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="requestParams" show-index>
          <el-table-column :label="$t('useful.title')" prop="title" />
          <el-table-column align="center" :label="$t('useful.numberofviews')" prop="publishdate" />
          <el-table-column :label="$t('useful.numberofsendtoemail')" prop="numberofsendtoemail" align="center" />
        </Pagination>
      </div>
      <!--News Center-->
      <div v-if="queryParams.usertpye == 4">
        <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="requestParams" show-index>
          <el-table-column :label="$t('news.title')" prop="title" />
          <el-table-column align="center" :label="$t('news.publishdate')" prop="publishdate" />
          <el-table-column :label="$t('news.numberofviews')" prop="numberofviews" align="center" />
          <el-table-column align="center" :label="$t('news.numberoflinkes')" prop="numberoflikes" />
        </Pagination>
      </div>
      <!--CMA CGM+-->
      <div v-if="queryParams.usertpye == 5">
        <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="requestParams" show-index>
          <el-table-column :label="$t('cma.title')" prop="title" />
          <el-table-column align="center" :label="$t('cma.publishdate')" prop="publishdate" />
          <el-table-column :label="$t('cma.numberofviews')" prop="numberofviews" align="center" />
          <el-table-column align="center" :label="$t('cma.numberoflinkes')" prop="numberoflikes" />
        </Pagination>
      </div>
      <!--转化分析-->
      <div v-if="queryParams.usertpye == 6">
        功能升级中，敬请期待
      </div>
      <!--更多模版点击次数-->
      <div v-if="queryParams.usertpye==7">
        <el-row :gutter="20">
          <el-col :span="12">
            <span><img src="../../assets/most/cma.png"></span><span class="center">{{ this.$t('most.cma') }}</span><span class="center">{{ frenquenylylist.cma }}views</span>
          </el-col>
          <el-col :span="12">
            <span><img src="../../assets/most/about.png"></span><span class="center">{{ this.$t('most.about') }}</span><span class="center">{{ frenquenylylist.abountus }}views</span>
          </el-col>
        </el-row>
      <!--  <el-row :gutter="20">
          <el-col :span="12">
            <span><img src="../../assets/most/news.png"></span><span class="center">{{ this.$t('most.news') }}</span><span class="center">{{ frenquenylylist.newscenter }}views</span>
          </el-col>
          <el-col :span="12">
            <span><img src="../../assets/most/online.png"></span><span class="center">{{ this.$t('most.online') }}</span><span class="center">{{ frenquenylylist.onlineService }}views</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <span><img src="../../assets/most/custom.png"></span><span class="center">{{ this.$t('most.customer') }}</span><span class="center">{{ frenquenylylist.customerad }}views</span>
          </el-col>
          <el-col :span="12">
            <span><img src="../../assets/most/useful.png"></span><span class="center">{{ this.$t('most.useful') }}</span><span class="center">{{ frenquenylylist.userfultemplate }}views</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <span><img src="../../assets/most/sanction.png"></span><span class="center">{{ this.$t('most.sanction') }}</span><span class="center">{{ frenquenylylist.sanctioncheck }}views</span>
          </el-col>
          <el-col :span="12">
            <span><img src="../../assets/most/contact.png"></span><span class="center">{{ this.$t('most.contant') }}</span><span class="center">{{ frenquenylylist.contantus }}views</span>
          </el-col>
        </el-row>-->
      </div>
    </div>
    <!--下载弹窗-->
    <el-dialog :title="$t('label.download')" :visible.sync="downloaddialog" center destroy-on-close :close-on-click-modal="false" width="550px">
      <el-form ref="downloadform" :model="downloadform" :rules="rules">
        <el-form-item :label="$t('download.downloadtime')" :label-width="formLabelWidth1" prop="timeList">
          <el-date-picker
            v-model="downloadform.timeList"
            style="width: 100%"
            :clearable="false"
            type="daterange"
            align="right"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="downloadPickerOptions"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('downloadform')">{{ $t('label.download') }}</el-button>
        <el-button @click="Cancle">{{ $t('forgetForm.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import * as echarts from 'echarts'
export default {
  name: 'Index',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  data() {
    return {
      // 后续用字典查询
      userTypeList: [
        { value: 1, label: 'Frequently searched routes' },
        { value: 2, label: 'Business & Operational Updates' },
        { value: 3, label: 'Useful Template & Link' },
        { value: 4, label: 'News Center' },
        { value: 5, label: 'CMA CGM+' },
        { value: 6, label: 'Instant Quotation & Booking' },
        { value: 7, label: 'Most Frenquently Used Functions' }
      ],
      frenquenylylist: {
        cma: 1000,
        abountus: 3000,
        newcenter: 2000,
        onlineService: 1100,
        customerad: 1500,
        userfultemplate: 1500,
        sanctioncheck: 500,
        contantus: 300
      },
      queryParams: {
        usertpye: 1,
        timeList: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 15).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')]
      },
      requestParams: {},
      timeOptionRange: '',
      pickerOptions: {
        onPick: (time) => {
          // 当第一时间选中才设置禁用
          if (time.minDate && !time.maxDate) {
            this.timeOptionRange = time.minDate
          }
          if (time.maxDate) {
            this.timeOptionRange = null
          }
        },
        disabledDate: (time) => {
          const timeOptionRange = this.timeOptionRange
          const secondNum = 1000 * 60 * 60 * 24 * 30
          const times = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
          if (!timeOptionRange) {
            return time.getTime() > times
          }
          if (timeOptionRange.getTime() + secondNum > times) {
            return time.getTime() > times || time.getTime() <= timeOptionRange.getTime() - secondNum
          }
          return time.getTime() < timeOptionRange.getTime() || time.getTime() >= timeOptionRange.getTime() + secondNum
        }
      },
      formLabelWidth1: '100px',
      downloaddialog: false,
      downloadform: {
        timeList: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 365).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')]
      },
      rules: {
        timeList: [{ required: true, message: this.$t('download.required'), trigger: 'change' }]
      },
      downloadTimeOptionRange: '',
      downloadPickerOptions: {
        onPick: (time) => {
          // 当第一时间选中才设置禁用
          if (time.minDate && !time.maxDate) {
            this.downloadTimeOptionRange = time.minDate
          }
          if (time.maxDate) {
            this.downloadTimeOptionRange = null
          }
        },
        disabledDate: (time) => {
          const timeOptionRange = this.downloadTimeOptionRange
          const secondNum = 1000 * 60 * 60 * 24 * 30
          const times = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
          if (!timeOptionRange) {
            return time.getTime() > times
          }
          if (timeOptionRange.getTime() + secondNum > times) {
            return time.getTime() > times || time.getTime() <= timeOptionRange.getTime() - secondNum
          }
          return time.getTime() < timeOptionRange.getTime() || time.getTime() >= timeOptionRange.getTime() + secondNum
        }
      },
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // 横坐标
      yData: [23, 24, 18, 25, 27, 28, 25], // 数据
      myChartStyle: { float: 'left', width: '100%', height: '400px' } // 图表样式
    }
  },
  watch: {
    'queryParams': {
      handler: function(val) {
        this.requestParams = {
          starttime: val.timeList[0],
          endtime: val.timeList[1]
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    // 初始化柱状图
    initEcharts() {
      // 基本柱状图
      const option = {
        title: {
          text: 'Most Frequently Searched Routes'
        },
        xAxis: {
          data: this.xData
        },
        yAxis: {},
        series: [
          {
            type: 'bar', // 形状为柱状图
            data: this.yData
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('mychart'))
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    changeType() {
      this.search()
      this.downloadform = {
        timeList: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 365).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')]
      }
    },
    search() {
      console.log('请求接口')
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交下载
        }
      })
    },
    // 重置
    Cancle() {
      this.downloadform.timeList = [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 365).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')]
      this.downloaddialog = false
    }
  }
}
</script>

<style scoped>
.tableContainer{
  height:500px;
}
</style>
