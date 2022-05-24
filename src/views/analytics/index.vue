<template>
  <div>
    <!--搜索部分-->
    <div class="searchContainer">
      <el-row style="width: 100%">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-select v-model="queryParams.usertpye" placeholder="请选择" clearable filterable style="width: 100%">
                <el-option v-for="item in userTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-date-picker v-model="queryParams.StartTime" type="date" placeholder="StartTime" value-format="yyyy-MM-dd" :picker-options="StartDatetions" />
            </el-col>
            <el-col :span="4" style="margin-left:20px">
              <el-date-picker v-model="queryParams.EndTime" type="date" placeholder="EndTime" value-format="yyyy-MM-dd" :picker-options="EndDatetions" />
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
    <!--内容部分-->
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="downloaddialog=true">{{ $t('label.download') }}</el-button>
      </div>
      <!--echart图表-->
      <div v-if="queryParams.usertpye == 1">
        <!--图表1-->
        <div id="mychart" class="echart" :style="myChartStyle" />
      </div>
      <div v-if="queryParams.usertpye == 2">
        <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
          <el-table-column :label="$t('buiness.title')" prop="title" />
          <el-table-column align="center" :label="$t('buiness.publishdate')" prop="publishdate" />
          <el-table-column :label="$t('buiness.numberofviews')" prop="numberofviews" align="center" />
          <el-table-column align="center" :label="$t('buiness.numberofsendtoemail')" prop="numberofsendtoemail" />
        </Pagination>
      </div>
      <div v-if="queryParams.usertpye == 3">
        <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
          <el-table-column :label="$t('useful.title')" prop="title" />
          <el-table-column align="center" :label="$t('useful.numberofviews')" prop="publishdate" />
          <el-table-column :label="$t('useful.numberofsendtoemail')" prop="numberofsendtoemail" align="center" />
        </Pagination>
      </div>
      <div v-if="queryParams.usertpye == 4">
        <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
          <el-table-column :label="$t('news.title')" prop="title" />
          <el-table-column align="center" :label="$t('news.publishdate')" prop="publishdate" />
          <el-table-column :label="$t('news.numberofviews')" prop="numberofviews" align="center" />
          <el-table-column align="center" :label="$t('news.numberoflinkes')" prop="numberoflikes" />
        </Pagination>
      </div>
      <div v-if="queryParams.usertpye == 5">
        <Pagination ref="pagination" uri="/api/admin/labelList" :request-params="queryParams" show-index>
          <el-table-column :label="$t('cma.title')" prop="title" />
          <el-table-column align="center" :label="$t('cma.publishdate')" prop="publishdate" />
          <el-table-column :label="$t('cma.numberofviews')" prop="numberofviews" align="center" />
          <el-table-column align="center" :label="$t('cma.numberoflinkes')" prop="numberoflikes" />
        </Pagination>
      </div>
      <div v-if="queryParams.usertpye == 6">
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="center">{{ this.$t('most.cma') }}/span><span class="center">{{ frenquenylylist.cma }}views</span>
            </span></el-col>
          <el-col :span="12">
            <span class="center">{{ this.$t('most.about') }}</span><span class="center">{{ frenquenylylist.abountus }}views</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="center">{{ this.$t('most.news') }}</span><span class="center">{{ frenquenylylist.newscenter }}views</span>
          </el-col>
          <el-col :span="12">
            <span class="center">{{ this.$t('most.online') }}</span><span class="center">{{ frenquenylylist.onlineService }}views</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="center">{{ this.$t('most.customer') }}</span><span class="center">{{ frenquenylylist.customerad }}views</span>
          </el-col>
          <el-col :span="12">
            <span class="center">{{ this.$t('most.useful') }}</span><span class="center">{{ frenquenylylist.userfultemplate }}views</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <span class="center">{{ this.$t('most.sanction') }}</span><span class="center">{{ frenquenylylist.sanctioncheck }}views</span>
          </el-col>
          <el-col :span="12">
            <span class="center">{{ this.$t('most.contant') }}</span><span class="center">{{ frenquenylylist.contantus }}views</span>
          </el-col>
        </el-row>
      </div>
      <div v-if="queryParams.usertpye==7">
        功能升级中，敬请期待
      </div>
    </div>
    <!--下载弹窗-->
    <el-dialog :title="$t('label.download')" :visible.sync="downloaddialog" center destroy-on-close :close-on-click-modal="false" width="550px">
      <el-form ref="downloadform" :model="downloadform" :rules="rules">
        <el-form-item :label="$t('download.starttime')" :label-width="formLabelWidth1" prop="starttime">
          <el-date-picker v-model="downloadform.starttime" type="date" placeholder="StartTime" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item :label="$t('download.endtime')" :label-width="formLabelWidth1" prop="endtime">
          <el-date-picker v-model="downloadform.endtime" type="date" placeholder="EndTime" value-format="yyyy-MM-dd" />
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
import frenquentlyroutes from './components/frequentlyroutes'
import * as echarts from 'echarts'
export default {
  name: 'Index',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination, frenquentlyroutes },
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
        StartTime: this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 15).format('YYYY-MM-DD'),
        EndTime: new Date()
      },
      downloaddialog: false,
      downloadform: {
        starttime: '',
        endtime: new Date()
      },
      formLabelWidth1: '100px',
      StartDatetions: () => {
        const one = 30 * 24 * 3600 * 1000
        const minTime = this.queryParams.StartTime.getTime() - one
        console.log(minTime)
        return this.queryParams.StartTime.getTime() < minTime
      },
      EndDatetions: () => {
        const one = 30 * 24 * 3600 * 1000
        const minTime = this.queryParams.EndTime.getTime() - one
        console.log(minTime)
        return this.queryParams.EndTime.getTime() < minTime
      },
      rules: {
        starttime: { required: true, message: this.$t('download.starttimetips'), trigger: 'change' },
        endtime: { required: true, message: this.$t('download.endtimetips'), trigger: 'change' }
      },
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // 横坐标
      yData: [23, 24, 18, 25, 27, 28, 25], // 数据
      myChartStyle: { float: 'left', width: '100%', height: '400px' } // 图表样式
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
    // 查询
    search() {},
    // 重置
    reset() {},
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交下载
        }
      })
    },
    // 重置
    Cancle() {
      this.downloadform.starttime = ''
      this.downloadform.endtime = this.$moment(new Date()).format('YYYY-MM-DD')
      this.downloaddialog = false
    }
  }
}
</script>

<style scoped></style>
