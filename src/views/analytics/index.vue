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
        <frenquentlyroutes />
      </div>
      <div v-if="queryParams.usertpye == 2">
        <buiness />
        <!--图表2-->
      </div>
      <div v-if="queryParams.usertpye == 3">
        <!--图表3-->
        <useful />
      </div>
      <div v-if="queryParams.usertpye == 4">
        <!--图表4-->
        <newscenter />
      </div>
      <div v-if="queryParams.usertpye == 5">
        <!--图表5-->
        <cmacgm />
      </div>
      <div v-if="queryParams.usertpye == 6">
        <!--图表6-->
        <mostfrenquently />
      </div>
      <div v-if="queryParams.usertpye==7">
        <!--图表7-->
        <instantquotation />
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
import mostfrenquently from './components/mostfrenquently'
import cmacgm from './components/cmacgm'
import buiness from './components/buiness'
import useful from './components/usefultemplate'
import frenquentlyroutes from './components/frequentlyroutes'
import newscenter from './components/newscenter'
import instantquotation from './components/instantquotation'
export default {
  name: 'Index',
  // eslint-disable-next-line vue/no-unused-components
  components: { mostfrenquently, cmacgm, buiness, useful, frenquentlyroutes, instantquotation, newscenter },
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
      }
    }
  },
  created() {
  },
  mounted() {},
  methods: {
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
