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
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="downloaddialog = true">{{ $t('label.download') }}</el-button>
      </div>
      <!--echart图表-->
      <div class="chart-container">
        <div id="mychart" class="echart" :style="myChartStyle" />
      </div>
      <div class="flex-card">
        <div class="grey">
          <el-card shadow="hover">
            <div id="mypiechart" class="echartpie" :style="myPieChartStyle" />
          </el-card>
        </div>
        <div class="grey">
          <el-card shadow="hover" body-style="height:240px">
            <p>Total Questions Asked</p>
            <p>10000</p>
          </el-card>
        </div>
        <div class="grey">
          <el-card shadow="hover" body-style="height:240px">
            <p>FAQS with positive evaluation</p>
            <p>9000</p>
          </el-card>
        </div>
        <div class="grey">
          <el-card shadow="hover" body-style="height:240px">
            <p>FAQS with negative evaluation</p>
            <p>1000</p>
          </el-card>
        </div>
      </div>
    </div>
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
import * as echarts from 'echarts'
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
      xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // 横坐标
      yData: [23, 24, 18, 25, 27, 28, 25], // 人数数据
      taskDate: [10, 11, 9, 17, 14, 13, 14],
      myChartStyle: { float: 'left', width: '100%', height: '300px' }, // 图表样式
      myChart: {},
      pieData: [
        {
          value: 463,
          name: '江苏'
        },
        {
          value: 395,
          name: '浙江'
        }
      ],
      pieName: [],
      myPieChartStyle: { float: 'left', width: '100%', height: '200px' } // 图表样式
    }
  },
  created() {},
  mounted() {
    this.initEcharts()
    this.initDate() // 数据初始化
    this.initPieEcharts()
  },
  methods: {
    // 初始化饼图数据
    initDate() {
      for (let i = 0; i < this.pieData.length; i++) {
        this.pieName[i] = this.pieData[i].name
      }
    },
    initPieEcharts() {
      // 饼图
      const option = {
        legend: {
          // 图例
          data: this.pieName,
          top: '80%'
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: '',
          top: '0%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              formatter: '{b} : {c} ({d}%)' // b代表名称，c代表对应值，d代表百分比
            },
            radius: '30%', // 饼图半径
            data: this.pieData
          }
        ]
      }
      console.log(this.seriesData)
      // eslint-disable-next-line no-unused-vars
      const optionFree = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            data: this.seriesData,
            type: 'line',
            smooth: true
          }
        ]
      }
      this.myChart = echarts.init(document.getElementById('mypiechart'))
      this.myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        this.myChart.resize()
      })
    },
    // 初始化多列柱状图
    initEcharts() {
      // 多列柱状图
      const mulColumnZZTData = {
        xAxis: {
          data: this.xData
        },
        // 图例
        legend: {
          data: ['人数', '任务数'],
          top: '0%'
        },
        yAxis: {},
        series: [
          {
            type: 'bar', // 形状为柱状图
            data: this.yData,
            name: '人数', // legend属性
            label: {
              // 柱状图上方文本标签，默认展示数值信息
              show: true,
              position: 'top'
            }
          },
          {
            type: 'bar', // 形状为柱状图
            data: this.taskDate,
            name: '任务数', // legend属性
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
      this.downloadform.starttime = ''
      this.downloadform.endtime = this.$moment(new Date()).format('YYYY-MM-DD')
      this.downloaddialog = false
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
}
.flex-card {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  width: 100%;
  padding-bottom: 20px;
}
.grey {
  background-color: #f0f0f0;
  font-size: 18px;
  font-weight: 600;
  height: 200px;
  width: 23%;
  text-align: center;
}
</style>
