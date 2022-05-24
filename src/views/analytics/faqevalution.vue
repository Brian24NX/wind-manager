<template>
  <div>
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
    <div class="tableContainer">
      <div class="operations">
        <el-button type="danger" size="small" @click="downloaddialog=true">{{ $t('label.download') }}</el-button>
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
import * as echarts from 'echarts'
export default {
  name: 'Faqevalution',
  components: { },
  data() {
    return {
      id: 'chart1',
      class: 'chart1',
      queryParams: { usertpye: 2, StartTime: this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 15).format('YYYY-MM-DD'), EndTime: new Date() },
      userTypeList: [
        { value: 1, label: 'Last Edit Time' },
        { value: 2, label: 'Choose a FAQ' },
        { value: 3, label: 'Published Time' }
      ],
      formLabelWidth1: '100px',
      downloadform: {
        starttime: '',
        endtime: new Date()
      },
      downloaddialog: false,
      LineList: [
        { UserScore: 1500, Name: '2022-04-08' },
        { UserScore: 1300, Name: '2022-04-09' },
        { UserScore: 1500, Name: '2022-04-10' },
        { UserScore: 1800, Name: '2022-04-11' },
        { UserScore: 2000, Name: '2022-04-12' }
      ],
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
    // 查询
    search() {},
    // 置空
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

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
}
.flex-card {
  margin-top: 20px;
  margin-bottom:20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  width:100%;
  padding-bottom:20px;
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
