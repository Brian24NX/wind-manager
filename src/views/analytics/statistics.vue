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
        <chart height="400px" width="100%" />
      </div>
      <div class="total"><span class="total">Total followers:</span><span class="total">12,000</span></div>
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
  name: 'Statistics',
  components: { Chart },
  data() {
    return {
      queryParams: { usertpye: 8, StartTime: this.$moment(new Date().getTime() - 3600 * 1000 * 24 * 15).format('YYYY-MM-DD'), EndTime: new Date() },
      userTypeList: [
        { value: 8, label: 'Mini-Program Users' },
        { value: 9, label: 'WeChat Official Account Followers' },
        { value: 10, label: 'Mini-Program Number of Visits' }
      ],
      downloaddialog: false,
      formLabelWidth1: '100px',
      downloadform: {
        starttime: '',
        endtime: new Date()
      },
      rules: {
        starttime: { required: true, message: this.$t('download.starttimetips'), trigger: 'change' },
        endtime: { required: true, message: this.$t('download.endtimetips'), trigger: 'change' }
      },
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
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    search() {

    },
    reset() {

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
.total {
  font-size: 18px;
  font-weight: 600;
}
</style>
