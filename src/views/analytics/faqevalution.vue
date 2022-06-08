<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%" type="flex" justify="space-between">
        <el-col :span="6">
          <el-select v-model="queryParams.usertpye" placeholder="请选择" :clearable="false" filterable style="width: 100%">
            <el-option v-for="item in userTypeList" :key="item.value" :label="item.label" :value="item.value" @change="changeType" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="20">
              <el-date-picker
                v-model="queryParams.timeList"
                size="small"
                style="width: 100%"
                :clearable="false"
                type="daterange"
                align="right"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :default-time="['00:00:00', '23:59:59']"
                :picker-options="pickerOptions"
                @change="search"
              />
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-button type="danger" :disabled="queryParams.analysisType === 6" size="small" @click="downloaddialog = true">{{ $t('label.download') }}</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--echart图表-->
    <el-card>
      <div class="title">
        <div class="dto" />
        <div>Number of FAQs</div>
      </div>
      <div id="mychart" class="echart" :style="myChartStyle" />
    </el-card>
    <el-row :gutter="20" style="margin-top: 24px">
      <el-col :span="8">
        <el-card style="height: 340px">
          <div class="title">
            <div class="dto" />
            <div>FAQ Evaluation</div>
          </div>
          <div id="mypiechart" class="echartpie" :style="myPieChartStyle" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="height: 340px; position: relative">
          <div class="title">
            <div class="dto" />
            <div>Total FAQS</div>
          </div>
          <img class="icon" src="@/assets/most/online2.png" />
          <div class="count">{{ total.total }}</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="height: 158px; margin-bottom: 24px; position: relative">
          <div class="title">
            <div class="dto" />
            <div>FAQs with positive evaluation</div>
          </div>
          <div class="count">{{ total.likes }}</div>
        </el-card>
        <el-card style="height: 158px; position: relative">
          <div class="title">
            <div class="dto" />
            <div>FAQs with negative evaluation</div>
          </div>
          <div class="count">{{ total.dislikes }}</div>
        </el-card>
      </el-col>
    </el-row>
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
            value-format="yyyy-MM-dd"
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
import * as echarts from 'echarts'
import { faqEvaList, faqEvaTotal, faqEvaExport } from '@/api/faqeva.js'
export default {
  name: 'Faqevalution',
  components: {},
  data() {
    return {
      id: 'chart1',
      class: 'chart1',
      queryParams: { usertpye: 2, timeList: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 15).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')] },
      userTypeList: [
        { value: 1, label: 'Last Edit Time' },
        { value: 2, label: 'Choose a FAQ' },
        { value: 3, label: 'Published Time' }
      ],
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
          const secondNum = 1000 * 60 * 60 * 24 * 365
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
      LineList: [
        { UserScore: 1500, Name: '2022-04-08' },
        { UserScore: 1300, Name: '2022-04-09' },
        { UserScore: 1500, Name: '2022-04-10' },
        { UserScore: 1800, Name: '2022-04-11' },
        { UserScore: 2000, Name: '2022-04-12' }
      ],
      downloadform: {
        timeList: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 364).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')]
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
      total: '',
      likes: 0,
      dislikes: 0,
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // 横坐标
      yData: [23, 24, 18, 25, 27, 28, 25], // 点赞数据
      taskDate: [10, 11, 9, 17, 14, 13, 14],
      myChartStyle: { width: '100%', height: '300px' }, // 图表样式
      pieData: [
        {
          value: 0,
          name: '赞'
        },
        {
          value: 0,
          name: '踩'
        }
      ],
      pieName: [],
      totalList: [],
      myPieChartStyle: { width: '100%', height: '280px' } // 图表样式
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const data = {
        startDate: this.queryParams.timeList[0],
        endDate: this.queryParams.timeList[1]
      }
      faqEvaList(data).then((res) => {
        this.totalList = res.data
      })
      setTimeout(() => {
        this.initEcharts()
        this.initDate() // 数据初始化
        this.initPieEcharts()
      }, 1000)
    },
    initTotal() {
      const data = {
        startDate: this.queryParams.timeList[0],
        endDate: this.queryParams.timeList[1]
      }
      faqEvaTotal(data).then((res) => {
        this.total = res.data
      })
    },
    // 初始化多列柱状图
    initEcharts() {
      var _res = this.totalList
      this.yData = _res.map((item) => {
        return item.likes
      })
      this.taskDate = _res.map((item) => {
        return item.dislikes
      })
      this.xData = _res.map((item) => {
        return item.analyDate
      })
      // 多列柱状图
      const mulColumnZZTData = {
        xAxis: {
          data: this.xData
        },
        color: ['#E20101', '#071E5D'],
        // 图例
        legend: {
          orient: 'vertical',
          data: ['赞', '踩'],
          x: 'right',
          y: 'center'
        },
        yAxis: {},
        series: [
          {
            type: 'bar', // 形状为柱状图
            data: this.yData,
            barWidth: '20%',
            name: '赞', // legend属性
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: 'top'
            }
          },
          {
            type: 'bar', // 形状为柱状图
            data: this.taskDate,
            barWidth: '20%',
            name: '踩', // legend属性
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: 'top'
            }
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('mychart'))
      myChart.setOption(mulColumnZZTData)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    // 初始化饼图数据
    initDate() {
      for (let i = 0; i < this.pieData.length; i++) {
        this.pieName[i] = this.pieData[i].name
      }
    },
    initPieEcharts() {
      var _res = this.totalList
      this.yData = _res.map((item) => {
        return item.likes
      })
      this.taskDate = _res.map((item) => {
        return item.dislikes
      })
      // 求和
      this.pieData[0].value = this.pieData[1].value = 0
      var sum0 = 0
      for (let i = 0; i < this.yData.length; i++) {
        const b = this.yData[i]
        this.pieData[0].value += sum0 + b
      }
      var sum = 0
      for (let i = 0; i < this.taskDate.length; i++) {
        const b = this.taskDate[i]
        this.pieData[1].value += sum + b
      }
      // 饼图
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        color: ['#E20101', '#071E5D'],
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          data: ['赞', '踩']
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.pieData
          }
        ]
      }
      const myChart2 = echarts.init(document.getElementById('mypiechart'))
      myChart2.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart2.resize()
      })
    },
    changeType() {
      this.search()
      this.downloadform = {
        timeList: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 365).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')]
      }
    },
    search() {
      this.init()
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交下载
          console.log(this.downloadform.timeList, 5464)
          const data = {
            startDate: this.downloadform.timeList[0],
            endDate: this.downloadform.timeList[1]
          }
          faqEvaExport(data).then((res) => {
            window.location.href = res.data
          })
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

<style scoped lang="scss">
.searchContainer {
  padding-right: 24px;
}
.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: Antonio-Bold, Antonio;
  font-weight: bold;
  color: #04246a;
  .dto {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #e20101;
    margin-right: 10px;
  }
}
.icon {
  width: 120px;
  height: 120px;
  margin-top: 17px;
  margin-left: 30px;
}
.count {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 40px;
  font-family: Antonio-Regular, Antonio;
  font-weight: 400;
  color: #071e5d;
}
</style>
