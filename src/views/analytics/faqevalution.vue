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
        <chart height="200px" width="100%" />
      </div>
      <div class="flex-card">
        <div class="grey">
          <el-card shadow="hover">
            <chart id="id" height="200px" width="100%" class="class" />
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
import Chart from '@/components/Charts/LineMarker'
export default {
  name: 'Faqevalution',
  components: { Chart },
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
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
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
  margin: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
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
