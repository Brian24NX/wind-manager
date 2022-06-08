<template>
  <div>
    <!--搜索部分-->
    <div class="searchContainer">
      <el-row style="width: 100%" type="flex" justify="space-between">
        <el-col :span="6">
          <el-select v-model="queryParams.analysisType" placeholder="请选择" :clearable="false" filterable style="width: 100%" @change="changeType">
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
                <el-button type="danger" :disabled="queryParams.analysisType === 7" size="small" @click="downloaddialog = true">{{ $t('label.download') }}</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--内容部分-->
    <div v-if="queryParams.analysisType !== 6" class="tableContainer">
      <!--Frequently searched routes-->
      <div v-if="queryParams.analysisType == 1">
        <div id="mychart" class="echart" :style="myChartStyle" />
        <div v-show="isshow" class="nodata"><span>暂无数据</span></div>
      </div>
      <!--Business & Operational Updates-->
      <div v-if="queryParams.analysisType == 2">
        <Pagination ref="pagination" uri="/api/admin/analysisPageList" :request-params="requestParams" show-index>
          <el-table-column :label="$t('buiness.title')" prop="title" />
          <!-- <el-table-column align="center" :label="$t('buiness.publishdate')" prop="publishdate" /> -->
          <el-table-column :label="$t('buiness.numberofviews')" prop="views" align="center" />
          <el-table-column align="center" :label="$t('buiness.numberofsendtoemail')" prop="email" />
        </Pagination>
      </div>
      <!--Useful Template & Link-->
      <div v-if="queryParams.analysisType == 3">
        <Pagination ref="pagination" uri="/api/admin/analysisPageList" :request-params="requestParams" show-index>
          <el-table-column :label="$t('useful.title')" prop="title" />
          <el-table-column align="center" :label="$t('useful.numberofviews')" prop="views" />
          <el-table-column :label="$t('useful.numberofsendtoemail')" prop="email" align="center" />
        </Pagination>
      </div>
      <!--News Center-->
      <div v-if="queryParams.analysisType == 4">
        <Pagination ref="pagination" uri="/api/admin/analysisPageList" :request-params="requestParams" show-index>
          <el-table-column :label="$t('news.title')" prop="title" />
          <!-- <el-table-column align="center" :label="$t('news.publishdate')" prop="publishdate" /> -->
          <el-table-column :label="$t('news.numberofviews')" prop="views" align="center" />
          <el-table-column align="center" :label="$t('news.numberoflinkes')" prop="likes" />
        </Pagination>
      </div>
      <!--CMA CGM+-->
      <div v-if="queryParams.analysisType == 5">
        <Pagination ref="pagination" uri="/api/admin/analysisPageList" :request-params="requestParams" show-index>
          <el-table-column :label="$t('cma.title')" prop="title" />
          <!-- <el-table-column align="center" :label="$t('cma.publishdate')" prop="publishdate" /> -->
          <el-table-column :label="$t('cma.numberofviews')" prop="views" align="center" />
          <el-table-column align="center" :label="$t('cma.numberoflinkes')" prop="likes" />
        </Pagination>
      </div>
      <!--转化分析-->
      <div v-if="queryParams.analysisType == 7">功能升级中，敬请期待</div>
    </div>
    <!--更多模版点击次数-->
    <div v-if="queryParams.analysisType == 6">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <div class="oneContainer">
              <div class="containerTitle">
                <div class="dto" />
                <div>{{ this.$t('most.cma') }}</div>
              </div>
              <div class="bottoms">
                <img src="@/assets/most/cma.png">
                <div class="right">
                  <div class="count">{{ frenquenylylist.cma }}</div>
                  <div>Views</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="oneContainer">
              <div class="containerTitle">
                <div class="dto" />
                <div>{{ this.$t('most.about') }}</div>
              </div>
              <div class="bottoms">
                <img src="@/assets/most/about.png">
                <div class="right">
                  <div class="count">{{ frenquenylylist.abountus }}</div>
                  <div>Views</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="oneContainer">
              <div class="containerTitle">
                <div class="dto" />
                <div>{{ this.$t('most.news') }}</div>
              </div>
              <div class="bottoms">
                <img src="@/assets/most/news.png">
                <div class="right">
                  <div class="count">{{ frenquenylylist.newscenter }}</div>
                  <div>Views</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 24px">
        <el-col :span="8">
          <el-card>
            <div class="oneContainer">
              <div class="containerTitle">
                <div class="dto" />
                <div>{{ this.$t('most.online') }}</div>
              </div>
              <div class="bottoms">
                <img src="@/assets/most/online.png">
                <div class="right">
                  <div class="count">{{ frenquenylylist.onlineService }}</div>
                  <div>Views</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="oneContainer">
              <div class="containerTitle">
                <div class="dto" />
                <div>{{ this.$t('most.customer') }}</div>
              </div>
              <div class="bottoms">
                <img src="@/assets/most/customer.png">
                <div class="right">
                  <div class="count">{{ frenquenylylist.customerad }}</div>
                  <div>Views</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="oneContainer">
              <div class="containerTitle">
                <div class="dto" />
                <div>{{ this.$t('most.useful') }}</div>
              </div>
              <div class="bottoms">
                <img src="@/assets/most/useful.png">
                <div class="right">
                  <div class="count">{{ frenquenylylist.userfultemplate }}</div>
                  <div>Views</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 24px">
        <el-col :span="8">
          <el-card>
            <div class="oneContainer">
              <div class="containerTitle">
                <div class="dto" />
                <div>{{ this.$t('most.sanction') }}</div>
              </div>
              <div class="bottoms">
                <img src="@/assets/most/sanction.png">
                <div class="right">
                  <div class="count">{{ frenquenylylist.sanctioncheck }}</div>
                  <div>Views</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="oneContainer">
              <div class="containerTitle">
                <div class="dto" />
                <div>{{ this.$t('most.contact') }}</div>
              </div>
              <div class="bottoms">
                <img src="@/assets/most/contact.png">
                <div class="right">
                  <div class="count">{{ frenquenylylist.contantus }}</div>
                  <div>Views</div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
import Pagination from '@/components/Pagination'
import { analysisList, dictItem, analysisExport } from '@/api/analysis'
import * as echarts from 'echarts'
export default {
  name: 'Index',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  data() {
    return {
      // 后续用字典查询
      userTypeList: [],
      frenquenylylist: {
        cma: '1,000',
        abountus: '3,000',
        newscenter: '2,000',
        onlineService: '1,100',
        customerad: '1,500',
        userfultemplate: '1,500',
        sanctioncheck: '500',
        contantus: '300'
      },
      queryParams: {
        analysisType: 6,
        timeList: [this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 15).format('YYYY-MM-DD 00:00:00'), this.$moment(new Date()).format('YYYY-MM-DD 23:59:59')],
        endDate: '',
        startDate: ''
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
      isshow: false,
      xData: [], // 横坐标
      yData: [], // 数据
      myChartStyle: { width: '100%', height: '400px' } // 图表样式
    }
  },
  watch: {
    queryParams: {
      handler: function(val) {
        this.requestParams = {
          analysisType: val.analysisType,
          startDate: val.timeList[0],
          endDate: val.timeList[1]
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initdictItem()
    this.initEcharts()
  },
  methods: {
    // 查字典
    initdictItem() {
      const data = { dictName: 'dict_analysis_type' }
      dictItem(data).then((res) => {
        this.userTypeList = res.data.slice(0, 7)
      })
    },
    // 初始化柱状图
    initEcharts() {
      // 获取柱状图列表数据
      const data = {
        analysisType: this.queryParams.analysisType,
        startDate: this.queryParams.timeList[0],
        endDate: this.queryParams.timeList[1]
      }
      analysisList(data).then((res) => {
        if (res.data.length === 0) {
          this.isshow = true
        } else {
          this.isshow = false
        }
        this.yData = res.data.map((item) => {
          return item.num
        })
        this.xData = res.data.map((item) => {
          return item.loading
        })
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
              data: this.yData,
              barWidth: '20%',
              itemStyle: {
                color: '#04246A'
              }
            }
          ]
        }
        const myChart = echarts.init(document.getElementById('mychart'))
        myChart.setOption(option)
        // 随着屏幕大小调节图表
        window.addEventListener('resize', () => {
          myChart.resize()
        })
      })
    },
    changeType(value) {
      this.queryParams.analysisType = value
      if (value === 1) {
        this.initEcharts()
      } else {
        this.$nextTick(() => {
          this.$refs.pagination.refreshRequest()
        })
      }
    },
    search() {
      if (this.queryParams.analysisType === 1) {
        this.initEcharts()
      } else {
        this.$nextTick(() => {
          this.$refs.pagination.refreshRequest()
        })
      }
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交下载
          const dataes = {
            analysisType: this.queryParams.analysisType,
            startDate: this.downloadform.timeList[0],
            endDate: this.downloadform.timeList[1]
          }
          analysisExport(dataes).then((res) => {
            window.open(res.data)
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

<style lang="scss" scoped>
.searchContainer {
  padding-right: 24px;
}
.nodata {
  position: absolute;
  right: 50%;
  top: 50%;
}

.oneContainer {
  .containerTitle {
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
  .bottoms {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;

    img {
      width: 80px;
      height: 80px;
    }

    .right {
      text-align: right;
      font-size: 14px;
      font-family: Antonio-Bold, Antonio;
      font-weight: bold;
      color: #6b7790;
      .count {
        font-size: 30px;
        font-family: Antonio-Regular, Antonio;
        font-weight: 400;
        color: #071e5d;
      }
    }
  }
}
</style>
