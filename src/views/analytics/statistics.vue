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
              <el-date-picker v-model="queryParams.StartTime" type="date" placeholder="StartTime" value-format="yyyy-MM-dd" />
            </el-col>
            <el-col :span="4" style="margin-left:20px">
              <el-date-picker v-model="queryParams.EndTime" type="date" placeholder="EndTime" value-format="yyyy-MM-dd" />
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
        <el-button type="danger" size="small" @click="download">Download</el-button>
      </div>
      <!--echart图表-->
      <div class="chart-container">
        <chart height="400px" width="100%" />
      </div>
      <div class="total"><span class="total">Total followers:</span><span class="total">12,000</span></div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineMarker'
export default {
  name: 'Statistics',
  components: { Chart },
  data() {
    return {
      queryParams: { usertpye: 8, StartTime: '', EndTime: new Date() },
      userTypeList: [
        { value: 8, label: 'Mini-Program Users' },
        { value: 9, label: 'WeChat Official Account Followers' },
        { value: 10, label: 'Mini-Program Number of Visits' }
      ]
    }
  },
  created() {},
  mounted() {},
  methods: {}
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
