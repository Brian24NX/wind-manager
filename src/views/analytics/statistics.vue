<template>
  <div>
    <div class="searchContainer">
      <el-row style="width: 100%" type="flex" justify="space-between">
        <el-col :span="6">
          <el-select v-model="queryParams.usertpye" placeholder="请选择" :clearable="false" filterable style="width: 100%" @change="changeType">
            <el-option v-for="item in userTypeList" :key="item.value" :label="item.value" :value="item.key" />
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
                <el-button v-permission="[72]" type="danger" :disabled="queryParams.analysisType === 6" size="small" @click="downloaddialog = true">{{ $t('label.download') }}</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableContainer">
      <!--echart图表-->
      <div class="chart-container">
        <div id="mychart" class="echart" :style="myChartStyle" />
        <div v-show="isshow" class="nodata"><span>暂无数据</span></div>
      </div>
      <div class="total">
        <span class="total">Total followers:</span><span class="total">{{ total }}</span>
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
import { analysisList, dictItem, analysisExport } from '@/api/analysis'
import * as echarts from 'echarts'
export default {
  name: 'Statistics',
  components: {},
  data() {
    return {
      queryParams: { usertpye: 8, timeList: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 15).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')] },
      userTypeList: [
        // { value: 8, label: 'Mini-Program Users' },
        // { value: 9, label: 'WeChat Official Account Followers' },
        // { value: 10, label: 'Mini-Program Number of Visits' }
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
      downloaddialog: false,
      formLabelWidth1: '100px',
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
      isshow: false,
      total: '',
      myChart: {},
      analysisType: 8,
      xData: [], // 横坐标
      yData: [], // 人数数据
      myChartStyle: { float: 'left', width: '100%', height: '400px' } // 图表样式
    }
  },
  created() {},
  mounted() {
    this.initdictItem()
    this.initEcharts()
  },
  methods: {
    // 查字典
    initdictItem() {
      const data = { dictName: 'dict_analysis_type' }
      dictItem(data).then((res) => {
        this.userTypeList = res.data.slice(7)
      })
    },
    // 初始化折线图
    initEcharts() {
      const data = {
        analysisType: this.analysisType,
        startDate: this.queryParams.timeList[0],
        endDate: this.queryParams.timeList[1]
      }
      analysisList(data).then((res) => {
        if (!res.data.length) {
          this.isshow = true
        } else {
          this.isshow = false
        }
        this.yData = res.data.map((item) => {
          return item.num
        })
        this.xData = res.data.map((item) => {
          return item.analyDate
        })
        if (!res.data.length) {
          this.total = 0
        } else {
          var sum = 0
          for (let i = 0; i < this.yData.length; i++) {
            const b = this.yData[i]
            this.total = sum + b
          }
        }
        const option = {
          xAxis: {
            data: this.xData
          },
          yAxis: {},
          series: [
            {
              data: this.yData,
              type: 'line' // 类型设置为折线图
            }
          ]
        }
        this.myChart = echarts.init(document.getElementById('mychart'))
        this.myChart.setOption(option)
        // 随着屏幕大小调节图表
        window.addEventListener('resize', () => {
          this.myChart.resize()
        })
      })
    },
    changeType(value) {
      this.analysisType = value
      this.initEcharts()
      this.downloadform = {
        timeList: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 365).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')]
      }
    },
    search() {
      this.initEcharts()
    },
    // 重置
    Cancle() {
      this.downloadform.timeList = [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 365).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')]
      this.downloaddialog = false
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交下载
          const dataes = {
            analysisType: this.analysisType,
            startDate: this.downloadform.timeList[0],
            endDate: this.downloadform.timeList[1]
          }
          analysisExport(dataes).then((res) => {
            window.open(res.data)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.searchContainer {
  padding-right: 24px;
}
.chart-container {
  position: relative;
  width: 100%;
}
.total {
  font-size: 18px;
  font-weight: 600;
}
.nodata {
  position: absolute;
  right: 50%;
  top: 50%;
}
</style>
